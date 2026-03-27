import { X, Zap, Lock } from "lucide-react";

interface PremiumModalProps {
  isVisible: boolean;
  onClose: () => void;
  onInitiatePayment: () => void;
  isProcessingPayment: boolean;
}

export function PremiumModal({ isVisible, onClose, onInitiatePayment, isProcessingPayment }: PremiumModalProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center rounded-[2.5rem] overflow-hidden">
        {/* Backdrop Blur */}
        <div 
           className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer animate-in fade-in"
           onClick={() => !isProcessingPayment && onClose()}
        ></div>

        {/* Modal Content */}
        <div className="bg-zinc-900 border-t border-zinc-700/50 w-full p-6 pb-8 relative shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transform animate-in slide-in-from-bottom-6 fade-in duration-300">
            <button 
                onClick={onClose}
                disabled={isProcessingPayment}
                className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 text-amber-500 mb-2 mt-4">
                <Zap className="w-5 h-5 fill-amber-500/20" />
                <h3 className="font-semibold tracking-wide text-[16px]">Premium Session</h3>
            </div>
            
            <p className="text-zinc-300 text-[13px] leading-relaxed mb-6">
                Unlock <span className="text-white font-semibold">10 minutes</span> of unlimited operations for just ₹1.
            </p>

            <button 
               onClick={onInitiatePayment}
               disabled={isProcessingPayment}
               className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-semibold py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
                {isProcessingPayment ? (
                    <span className="animate-pulse flex items-center gap-2">
                        <Lock className="w-4 h-4 animate-spin" />
                        Processing...
                    </span>
                ) : (
                    <>Pay ₹1.00</>
                )}
            </button>
        </div>
    </div>
  );
}
