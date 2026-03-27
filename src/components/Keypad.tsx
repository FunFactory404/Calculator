interface KeypadProps {
  onNumClick: (num: string) => void;
  onOpClick: (op: string) => void;
  onClear: () => void;
  onEquals: () => void;
  setDisplay: (val: string | ((prev: string) => string)) => void;
  isSessionActive: boolean;
}

export function Keypad({ onNumClick, onOpClick, onClear, onEquals, setDisplay, isSessionActive }: KeypadProps) {
  
  const renderActionBtn = (text: string, onClick: () => void) => (
      <button onClick={onClick} className="flex items-center justify-center text-2xl font-medium transition-all active:scale-95 duration-100 bg-zinc-300 text-zinc-900 hover:bg-zinc-200 rounded-full h-16 w-16">
          {text}
      </button>
  );

  const renderOpBtn = (text: string, onClick: () => void) => (
      <button onClick={onClick} className="flex items-center justify-center text-3xl font-medium transition-all active:scale-95 duration-100 bg-amber-500 text-white hover:bg-amber-400 rounded-full h-16 w-16 shadow-lg shadow-amber-500/20">
          {text}
      </button>
  );

  const renderNumBtn = (text: string, onClick: () => void, isZero = false) => (
      <button onClick={onClick} className={`flex text-3xl font-medium transition-all active:scale-95 duration-100 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 rounded-full h-16 ${isZero ? 'w-full col-span-2 pl-6 items-center justify-start' : 'w-16 items-center justify-center border border-white/5'}`}>
          {text}
      </button>
  );

  return (
    <div className="grid grid-cols-4 gap-3.5 place-items-center">
      {renderActionBtn("AC", onClear)}
      {renderActionBtn("+/-", () => setDisplay((prev: string) => prev.startsWith("-") ? prev.slice(1) : "-" + prev))}
      {renderActionBtn("%", () => setDisplay((prev: string) => (parseFloat(prev) / 100).toString()))}
      {renderOpBtn("÷", () => onOpClick("÷"))}

      {renderNumBtn("7", () => onNumClick("7"))}
      {renderNumBtn("8", () => onNumClick("8"))}
      {renderNumBtn("9", () => onNumClick("9"))}
      {renderOpBtn("×", () => onOpClick("×"))}

      {renderNumBtn("4", () => onNumClick("4"))}
      {renderNumBtn("5", () => onNumClick("5"))}
      {renderNumBtn("6", () => onNumClick("6"))}
      {renderOpBtn("-", () => onOpClick("-"))}

      {renderNumBtn("1", () => onNumClick("1"))}
      {renderNumBtn("2", () => onNumClick("2"))}
      {renderNumBtn("3", () => onNumClick("3"))}
      {renderOpBtn("+", () => onOpClick("+"))}

      {renderNumBtn("0", () => onNumClick("0"), true)}
      {renderNumBtn(".", () => onNumClick("."))}
      
      {/* EQUALS BUTTON */}
      <button 
         onClick={onEquals}
         className={`flex items-center justify-center text-4xl pb-1 font-light transition-all active:scale-95 duration-100 shadow-lg border border-white/10 bg-gradient-to-br text-white rounded-full h-16 w-16 z-10 relative group overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${isSessionActive ? 'from-emerald-500 to-emerald-600 shadow-emerald-500/30 focus:ring-emerald-500' : 'from-amber-400 to-amber-600 shadow-amber-500/30 focus:ring-amber-500'}`}
      >
        <div className="absolute inset-0 bg-white/20 blur group-active:opacity-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        =
      </button>
    </div>
  );
}
