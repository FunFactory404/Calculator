import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const PLANS = {
  plan_10min: { amount: 100, currency: 'INR' }, // ₹1
  plan_48hr: { amount: 200, currency: 'INR' },  // ₹2
};

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return NextResponse.json({ error: 'Razorpay keys missing' }, { status: 500 });
    }

    // Server-side validation 
    const plan = PLANS[planId as keyof typeof PLANS];
    if (!plan) {
        return NextResponse.json({ error: 'Invalid Plan Selected' }, { status: 400 });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: plan.amount,
      currency: plan.currency,
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
