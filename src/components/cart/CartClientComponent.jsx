"use client";

import { useCartStore } from "@/app/store/CartStore";
import Image from "next/image";
import Link from "next/link";
import CheckOutButton from "./CheckOutButton";
import { create } from 'zustand';


export default function CartClientComponent({createOrder}) {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>
        <p className="mt-1 text-sm text-gray-400">
          Cart is stored in memory for this visit — refreshing the page clears it.
        </p>

        <p className="mt-6 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{totalQuantity}</span>{" "}
          {totalQuantity === 1 ? "product" : "products"} in cart
        </p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <p className="text-gray-400">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-full bg-lime-400 px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-lime-300 transition"
            >
              Shop now
            </Link>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {/* Cart Items */}
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                {/* Image */}
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-gray-300">◇</div>
                  )}
                </div>

                {/* Name, price */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="mt-1 text-sm text-gray-400">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                {/* Quantity controls + total */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-3 rounded-full border border-gray-200 px-3 py-1.5">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="text-lg font-light text-gray-500 hover:text-gray-900 transition w-5 text-center"
                    >
                      −
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-semibold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="text-lg font-light text-gray-500 hover:text-gray-900 transition w-5 text-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-xs font-medium text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Subtotal */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-500">Subtotal</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Tax and shipping calculated at checkout (demo).
              </p>

              <CheckOutButton createOrder={createOrder} />
              <button
                onClick={clearCart}
                className="mt-2 w-full rounded-2xl bg-gray-100 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
              >
                Clear cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}