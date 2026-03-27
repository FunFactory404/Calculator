# Payment Flow & App Architecture Diagram

This document illustrates exactly how our Premium Calculator handles session management, order generation, and payment authorization seamlessly without redirecting the user.

## Architecture Flowchart

```mermaid
sequenceDiagram
    participant User
    participant Frontend as Calculator UI (React Hook)
    participant Backend as Backend API Route Server
    participant Razorpay

    Note over User, Frontend: User turns on the Calculator
    User->>Frontend: Enters calculation (e.g. 5 × 5) & clicks "="
    Frontend->>Frontend: Checks `localStorage` for Active Session Expiry
    
    alt Session Active
        Frontend-->>User: Calculation immediately successful; Display shows "25"
    else Session Expired / Null
        Frontend-->>User: Triggers Slide-up Premium Modal ("Pay to Unlock")
        User->>Frontend: Clicks "Pay ₹1.00"
        
        Note over Frontend, Backend: 1. Server-Side Order Generation
        Frontend->>Backend: POST /api/create-order { amount: 1 }
        Backend->>Razorpay: Authenticate with Secret Keys & Generate Order
        Razorpay-->>Backend: Return Secure Order Instance (ID, Currency, Amount)
        Backend-->>Frontend: Return Order Object Response
        
        Note over Frontend, Razorpay: 2. Client-Side Payment Flow
        Frontend->>Razorpay: Inject checkout.js and open initialized Popup
        Razorpay-->>User: Razorpay UI Prompts for Payment Methods
        User->>Razorpay: Submits dummy payment (Test Mode)
        Razorpay-->>Frontend: Success callback `handler(response)` fired
        
        Note over Frontend, Frontend: 3. Session Activation
        Frontend->>Frontend: Calculate new Expiry (Current Time + 10 mins)
        Frontend->>Frontend: Write timestamp to local `calc_session_expiry`
        Frontend-->>User: Close Modal, update Timer, & instantly show result ("25")
    end
```

### Highlights of this Flow:
- **Server Verification**: The amount is securely finalized on the Node.js backend. A malicious user cannot tweak the payload amount locally!
- **Zero Redirects**: The user never fully leaves the calculator interface. A smooth JS overlay is used via Razorpay's `checkout.js`.
- **Continuity**: Because the timestamp is written to browser storage, accidental refreshes will not terminate a `Session Active` loop until precisely 10 minutes pass!
