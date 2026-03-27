# Premium Next.js Calculator

A sleek, modern, glassmorphic calculator application built with **Next.js 16**, **Tailwind CSS v4**, and **Razorpay**. 

This application demonstrates a unique "Time-Based Premium Session" monetization strategy. The user gets a beautiful calculator interface, but mathematically resolving an operation requires an active session. A user can purchase a **10-minute premium session** for exactly **₹1.00** via Razorpay.

## 🚀 Features

- **Gorgeous UI/UX**: Dark mode, ambient glowing backgrounds, and modern Lucide icons.
- **Component Architecture**: Fully modular design separating UI (`CalculatorDisplay`, `Keypad`, `PremiumModal`) from business logic.
- **Custom Hooks**: Mathematical logic is isolated in `useCalculator`, while session/payment logic lives in `usePremiumSession`.
- **Razorpay Integration**: A secure Next.js Server App Route computes and creates the order ID. The client smoothly manages the checkout process without leaving the page.
- **Session Continuity**: 10-minute sessions survive page reloads utilizing browser `localStorage`.
- **Live Timer**: Shows exactly how much premium time is left.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS via `@tailwindcss/postcss`
- **Icons**: `lucide-react`
- **Payments**: `razorpay` (Server SDK) & Razorpay Checkout JS Library

## ⚙️ Getting Started

### 1. Configure Environment Variables
Create a `.env.local` file at the root of the project to hold your Razorpay Test Keys:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxxx"
RAZORPAY_KEY_ID="rzp_test_xxxxxx"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
src/
├── app/
│   ├── api/create-order/route.ts  # Secure backend order creation
│   ├── globals.css                # Tailwind imports
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main controller container
├── components/
│   ├── CalculatorDisplay.tsx      # Timer and mathematical display
│   ├── Keypad.tsx                 # Buttons grid logic
│   └── PremiumModal.tsx           # Purchase overlay
└── hooks/
    ├── useCalculator.ts           # Math execution state
    └── usePremiumSession.ts       # Razorpay tracking & localstorage
```

## 🔒 Security Notes
The actual payment amount (`100` paise / ₹1) is strictly enforced and verified over server-side Node execution inside `/api/create-order`, making it tamper-proof against frontend modifications.
# Calculator
