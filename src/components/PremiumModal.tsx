import { X, Zap, Clock, CalendarDays, Sparkles, Check, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PremiumModalProps {
    isVisible: boolean;
    onClose: () => void;
    onInitiatePayment: () => void;
    isProcessingPayment: boolean;
    selectedPlanId: "plan_10min" | "plan_48hr";
    setSelectedPlanId: (val: "plan_10min" | "plan_48hr") => void;
}

export function PremiumModal({
    isVisible,
    onClose,
    onInitiatePayment,
    isProcessingPayment,
    selectedPlanId,
    setSelectedPlanId
}: PremiumModalProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">

            {/* Modal Container */}
            <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 md:rounded-3xl rounded-[2.5rem] p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto transform animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-4">

                {/* Close */}
                <button
                    onClick={onClose}
                    disabled={isProcessingPayment}
                    className="absolute right-5 top-5 bg-zinc-800/50 p-2 rounded-full text-zinc-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-6 md:mb-8 mt-2 md:mt-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/5 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-amber-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Unlock Premium</h2>
                    <p className="text-zinc-400 text-sm mt-1">
                        Choose a pass to calculate without limits
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">

                    {/* 10 MIN PLAN */}
                    <Card
                        onClick={() => setSelectedPlanId("plan_10min")}
                        className={`p-5 md:p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${selectedPlanId === 'plan_10min' ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500/50 scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-600'}`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Clock className={`w-4 h-4 ${selectedPlanId === 'plan_10min' ? 'text-amber-500' : 'text-zinc-500'}`} />
                                <h3 className={`font-bold ${selectedPlanId === 'plan_10min' ? 'text-white' : 'text-zinc-300'}`}>10-Min Sprint</h3>
                            </div>
                            {/* Check Circle */}
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlanId === 'plan_10min' ? 'border-amber-500' : 'border-zinc-700'}`}>
                                {selectedPlanId === 'plan_10min' && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                            </div>
                        </div>

                        <p className={`text-3xl font-black mb-1 ${selectedPlanId === 'plan_10min' ? 'text-white' : 'text-zinc-400'}`}>₹1</p>
                        <p className="text-[11px] md:text-xs text-zinc-500 mb-4 h-4">Unlimited usage for 10 minutes</p>

                        <ul className="space-y-2.5 text-xs md:text-sm text-zinc-400">
                            <li className="flex items-center gap-2">
                                <Check className={`w-4 h-4 ${selectedPlanId === 'plan_10min' ? 'text-amber-500' : 'text-zinc-600'}`} />
                                Unlimited calculations
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className={`w-4 h-4 ${selectedPlanId === 'plan_10min' ? 'text-amber-500' : 'text-zinc-600'}`} />
                                No cooldown delays
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className={`w-4 h-4 ${selectedPlanId === 'plan_10min' ? 'text-amber-500' : 'text-zinc-600'}`} />
                                Instant access
                            </li>
                        </ul>
                    </Card>

                    {/* 48 HOUR PLAN */}
                    <Card
                        onClick={() => setSelectedPlanId("plan_48hr")}
                        className={`relative p-5 md:p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${selectedPlanId === 'plan_48hr' ? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/50 scale-[1.02] shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-600'}`}
                    >
                        {/* Selected Badge */}
                        <div className={`absolute -top-1 right-0 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${selectedPlanId === 'plan_48hr' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' : 'bg-zinc-800 text-zinc-400'}`}>
                            {selectedPlanId === 'plan_48hr' && <Sparkles className="w-3 h-3" />}
                            Best Value
                        </div>

                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <CalendarDays className={`w-4 h-4 ${selectedPlanId === 'plan_48hr' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                                <h3 className={`font-bold ${selectedPlanId === 'plan_48hr' ? 'text-white' : 'text-zinc-300'}`}>48-Hour Pro</h3>
                            </div>
                            {/* Check Circle */}
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlanId === 'plan_48hr' ? 'border-emerald-500' : 'border-zinc-700'}`}>
                                {selectedPlanId === 'plan_48hr' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                            </div>
                        </div>

                        <p className={`text-3xl font-black mb-1 ${selectedPlanId === 'plan_48hr' ? 'text-emerald-400' : 'text-zinc-400'}`}>₹2</p>
                        <p className="text-[11px] md:text-xs text-zinc-500 mb-4 h-4">Full access for 2 straight days</p>

                        <ul className="space-y-2.5 text-xs md:text-sm text-zinc-400">
                            <li className="flex items-center gap-2">
                                <Check className={`w-4 h-4 ${selectedPlanId === 'plan_48hr' ? 'text-emerald-400' : 'text-zinc-600'}`} />
                                Everything in Sprint
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className={`w-4 h-4 ${selectedPlanId === 'plan_48hr' ? 'text-emerald-400' : 'text-zinc-600'}`} />
                                Longer uninterrupted usage
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className={`w-4 h-4 ${selectedPlanId === 'plan_48hr' ? 'text-emerald-400' : 'text-zinc-600'}`} />
                                Secure multi-session saving
                            </li>
                        </ul>
                    </Card>
                </div>

                {/* Unified CTA Button Mobile Friendly */}
                <button
                    onClick={onInitiatePayment}
                    disabled={isProcessingPayment}
                    className={`w-full py-4 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl ${selectedPlanId === 'plan_48hr'
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-black shadow-emerald-500/20 hover:shadow-emerald-500/30'
                        : 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-amber-500/20 hover:shadow-amber-500/30'
                        }`}
                >
                    {isProcessingPayment ? (
                        <>
                            <Lock className="w-5 h-5 animate-spin" />
                            Processing Secure Payment...
                        </>
                    ) : (
                        <>
                            <Lock className="w-4 h-4 opacity-70 mb-0.5" />
                            {selectedPlanId === 'plan_48hr' ? 'Secure 48 Hours for ₹2.00' : 'Secure 10 Mins for ₹1.00'}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}