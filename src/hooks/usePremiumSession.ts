"use client";

import { useState, useEffect } from "react";

const SESSION_DURATION_MS = 10 * 60 * 1000; // 10 minutes

export function usePremiumSession() {
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Initial Check on Mount
  useEffect(() => {
    const storedExpiry = localStorage.getItem("calc_session_expiry");
    if (storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      if (expiryTime > Date.now()) {
        setSessionExpiry(expiryTime);
      } else {
        localStorage.removeItem("calc_session_expiry");
      }
    }
  }, []);

  // Timer Tick
  useEffect(() => {
    if (!sessionExpiry) {
      setTimeLeft(null);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      if (now > sessionExpiry) {
        setSessionExpiry(null);
        setTimeLeft(null);
        localStorage.removeItem("calc_session_expiry");
        clearInterval(interval);
      } else {
        const remainingStr = formatTimeLeft(sessionExpiry - now);
        setTimeLeft(remainingStr);
      }
    }, 1000);

    setTimeLeft(formatTimeLeft(sessionExpiry - Date.now()));
    return () => clearInterval(interval);
  }, [sessionExpiry]);

  const formatTimeLeft = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isSessionActive = (): boolean => {
    return sessionExpiry !== null && Date.now() < sessionExpiry;
  };

  const initiatePayment = async (onSuccessCallback: () => void) => {
    if (isSessionActive()) {
      setShowPremiumModal(false);
      onSuccessCallback();
      return;
    }

    try {
      setIsProcessingPayment(true);
      
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // We revert back to passing 1 here
        body: JSON.stringify({ amount: 1 }), 
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: order.amount,
        currency: order.currency,
        name: "Premium Session",
        description: "10-Minute Unlimited Calculator Access",
        order_id: order.id,
        handler: function (response: any) {
             console.log("Payment successful", response);
             
             // Activate Session
             const newExpiry = Date.now() + SESSION_DURATION_MS;
             setSessionExpiry(newExpiry);
             localStorage.setItem("calc_session_expiry", newExpiry.toString());
             
             setShowPremiumModal(false);
             setIsProcessingPayment(false);
             onSuccessCallback();
        },
        prefill: {
            name: "Premium User",
            email: "user@example.com",
            contact: "9000090000"
        },
        readonly: {
            contact: true,
            email: true
        },
        theme: {
            color: "#f59e0b" // Amber
        },
        modal: {
            ondismiss: function() {
                setIsProcessingPayment(false);
            }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Error creating payment:", error);
      setIsProcessingPayment(false);
      alert("Payment initialization failed. Please try again.");
    }
  };

  return {
    sessionExpiry,
    timeLeft,
    isProcessingPayment,
    showPremiumModal,
    setShowPremiumModal,
    isSessionActive,
    initiatePayment,
  };
}
