"use client";

import { useState } from "react";

export function useCalculator() {
  const [display, setDisplay] = useState("0");
  const [previousVal, setPreviousVal] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumClick = (num: string) => {
    setDisplay((prev) => {
      if (prev === "0" && num !== ".") return num;
      if (num === "." && prev.includes(".")) return prev;
      return prev + num;
    });
  };

  const handleOpClick = (op: string) => {
    setPreviousVal(display);
    setOperator(op);
    setDisplay("0");
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousVal(null);
    setOperator(null);
  };

  const handleBackspace = () => {
    setDisplay((prev) => {
      if (prev.length === 1 || (prev.length === 2 && prev.startsWith("-"))) {
        return "0";
      }
      return prev.slice(0, -1);
    });
  };

  const calculateResult = () => {
    if (!previousVal || !operator) return null;
    const prev = parseFloat(previousVal);
    const curr = parseFloat(display);
    
    // Easter Egg: 2 + 2 = 5
    if (prev === 2 && curr === 2 && operator === "+") {
        return "5";
    }

    let result = 0;

    switch (operator) {
      case "+": result = prev + curr; break;
      case "-": result = prev - curr; break;
      case "×": result = prev * curr; break;
      case "÷": result = curr !== 0 ? prev / curr : NaN; break;
      default: return null;
    }
    return result.toString();
  };

  const performCalculation = () => {
    const result = calculateResult();
    if (!result) return false;
    setDisplay(result);
    setPreviousVal(null);
    setOperator(null);
    return true;
  };

  return {
    display,
    previousVal,
    operator,
    setDisplay,
    handleNumClick,
    handleOpClick,
    handleClear,
    handleBackspace,
    performCalculation,
  };
}
