import { Lock, Unlock, Clock } from "lucide-react";

interface CalculatorDisplayProps {
  sessionExpiry: number | null;
  timeLeft: string | null;
  previousVal: string | null;
  operator: string | null;
  display: string;
}

export function CalculatorDisplay({ sessionExpiry, timeLeft, previousVal, operator, display }: CalculatorDisplayProps) {
  return (
    <>
        {/* Header / Brand & Timer */}
        <div className="flex justify-between items-center px-1 py-1 z-10 mb-4 h-6">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-bold tracking-widest">
            {sessionExpiry ? (
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
                <Lock className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span>{sessionExpiry ? "UNLOCKED" : "LOCKED"}</span>
          </div>
          
          {sessionExpiry && timeLeft ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-wider animate-pulse">
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}</span>
            </div>
          ) : (
            <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 shadow-inner"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 shadow-inner"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 shadow-inner"></div>
            </div>
          )}
        </div>

        {/* Display Area */}
        <div className="w-full bg-zinc-900 border-t border-black border-b border-white/5 rounded-3xl p-5 mb-5 relative z-10 shadow-inner overflow-hidden flex flex-col justify-end min-h-[110px]">
             <div className="text-zinc-500 text-right text-sm font-medium h-5 mb-2 tracking-wider flex justify-end truncate">
                {previousVal && operator ? `${previousVal} ${operator}` : ""}
             </div>
             
             <span className="text-5xl font-mono font-light text-white text-right tracking-tighter truncate max-w-full transition-all">
                  {display || "0"}
             </span>
        </div>
    </>
  );
}
