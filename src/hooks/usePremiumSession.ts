"use client";

import { useState, useEffect } from "react";

const PLAN_DURATIONS: Record<string, number> = {
  plan_10min: 10 * 60 * 1000,
  plan_48hr: 48 * 60 * 60 * 1000,
};

export function usePremiumSession() {
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Track the currently selected plan
  const [selectedPlanId, setSelectedPlanId] = useState<"plan_10min" | "plan_48hr">("plan_10min");

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
    
    // For 48 hours, it's better to format as HH:MM:SS if over an hour, but MM:SS is a placeholder. 
    // Let's elegantly handle hours if needed:
    const hours = Math.floor(minutes / 60);
    const minsLeft = minutes % 60;
    
    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minsLeft.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
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
        body: JSON.stringify({ planId: selectedPlanId }), 
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: order.amount,
        currency: order.currency,
        name: "calcypay",
        description: selectedPlanId === "plan_48hr" ? "48-Hour Pro Pass Calculator Access" : "10-Minute Sprint Calculator Access",
        order_id: order.id,
        handler: function (response: any) {
             console.log("Payment successful", response);
             
             // Activate Session dynamically based on selected plan
             const duration = PLAN_DURATIONS[selectedPlanId] || PLAN_DURATIONS["plan_10min"];
             const newExpiry = Date.now() + duration;
             
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
    selectedPlanId,
    setSelectedPlanId
  };
}
