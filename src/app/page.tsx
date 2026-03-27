"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useCalculator } from "@/hooks/useCalculator";
import { usePremiumSession } from "@/hooks/usePremiumSession";
import { CalculatorDisplay } from "@/components/CalculatorDisplay";
import { Keypad } from "@/components/Keypad";
import { PremiumModal } from "@/components/PremiumModal";

// Setup global for Razorpay SDK
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {
  const calc = useCalculator();
  const session = usePremiumSession();

  const handleEquals = () => {
    // If no active session, pop the premium upgrade modal
    if (!session.isSessionActive()) {
       session.setShowPremiumModal(true);
       return;
    }

    // Unlocked!
    calc.performCalculation();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't steal focus if modal is active
      if (session.showPremiumModal) return;

      const key = e.key;
      
      if (/[0-9.]/.test(key)) {
        calc.handleNumClick(key);
      } else if (key === "+" || key === "-") {
        calc.handleOpClick(key);
      } else if (key === "*" || key === "x" || key === "X") {
        calc.handleOpClick("×");
      } else if (key === "/") {
        e.preventDefault(); // Prevent Firefox "Quick Find" slash
        calc.handleOpClick("÷");
      } else if (key === "Enter" || key === "=") {
        e.preventDefault(); 
        handleEquals();
      } else if (key === "Escape") {
        calc.handleClear();
      } else if (key === "Backspace" || key === "Delete") {
        calc.handleBackspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [calc.display, calc.previousVal, calc.operator, session.showPremiumModal, session.isSessionActive]);

  const handleInitiatePayment = () => {
    session.initiatePayment(() => {
        // On success callback, calculate the result
        calc.performCalculation();
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-sans tracking-tight relative overflow-hidden">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      {/* Background ambient glow based on session */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${session.sessionExpiry ? 'bg-emerald-500/15' : 'bg-amber-500/10'}`}
      />

      <div className="w-[340px] bg-zinc-950 p-6 rounded-[2.5rem] shadow-2xl relative border-t border-l border-white/10 border-r border-b border-black/80">
        
        <CalculatorDisplay 
            sessionExpiry={session.sessionExpiry}
            timeLeft={session.timeLeft}
            previousVal={calc.previousVal}
            operator={calc.operator}
            display={calc.display}
        />

        <Keypad 
            onNumClick={calc.handleNumClick}
            onOpClick={calc.handleOpClick}
            onClear={calc.handleClear}
            onEquals={handleEquals}
            setDisplay={calc.setDisplay}
            isSessionActive={session.isSessionActive()}
        />

        <PremiumModal 
            isVisible={session.showPremiumModal}
            onClose={() => session.setShowPremiumModal(false)}
            onInitiatePayment={handleInitiatePayment}
            isProcessingPayment={session.isProcessingPayment}
            selectedPlanId={session.selectedPlanId as any}
            setSelectedPlanId={session.setSelectedPlanId as any}
        />

      </div>
      
      <p className="mt-8 text-zinc-600 text-[11px] font-medium tracking-wide">
         Calculations Protected by Razorpay
      </p>
    </div>
  );
}
