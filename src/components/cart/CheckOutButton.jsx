'use client';
import { useCartStore } from '@/app/store/CartStore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



export default function CheckOutButton({createOrder}) {
    const router = useRouter()
    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);
    const [loading, setLoading] = useState(false);
    async function handleCheckout(){
        if(items.length === 0) return;
        setLoading(true);
        try {
             const order = await createOrder(items);
            if (order){
                router.push(`/orders`);
                clearCart();
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
        }
    }
  return (
    <button onClick={handleCheckout}
    disabled={loading} className='mt-5  w-full rounded-2xl bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed'>
        {loading ? 'Placing Order...' : 'Checkout'}
    </button>
  )
}
