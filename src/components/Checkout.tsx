"use client";
import Image from "next/image";
import { useShopStore } from "@/hooks/useShopStore";
import { useState } from "react";
import Link from "next/link";


export default function Checkout({ onClose }: { onClose: () => void }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
  } = useShopStore();

  const items = Object.values(cartItems);
  const total = getCartTotal();
  const [full, setFull] = useState(false);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        className="fixed inset-0 z-50 flex"
        role="dialog"
        aria-modal="true"
        data-full={full}
      >
        <div
          className="
            ml-auto h-full bg-white shadow-2xl border-l
            w-[92vw] sm:w-[420px]
            transition-[width] duration-500
            data-[full=true]:w-full
            flex flex-col
          "
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h1 className="text-base font-semibold">
              Order <span className="text-[#FFC300]">Summary</span>
            </h1>
            <button
              className="rounded px-2 py-1 text-sm hover:bg-neutral-100"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-4">
              {items.length === 0 ? (
                <p className="text-sm text-gray-600">Your cart is empty.</p>
              ) : (
                <div className="space-y-6">
                  <div className="divide-y">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="py-5 flex items-center gap-4">
                        <div className="relative h-24 w-24 shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-lg leading-snug line-clamp-2">
                            {product.title}
                          </p>

                          <div className="mt-2 flex items-center gap-3 text-lg">
                            <button
                              className="px-2 leading-none hover:opacity-80"
                              onClick={() =>
                                updateQuantity(product.id, Math.max(0, quantity - 1))
                              }
                              aria-label="Decrease quantity"
                            >
                              –
                            </button>

                            <span className="w-6 text-center text-base">{quantity}</span>

                            <button
                              className="px-2 leading-none hover:opacity-80"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>

                            <button
                              className="ml-4 text-xs text-neutral-500 hover:text-neutral-800 underline underline-offset-4"
                              onClick={() => removeFromCart(product.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between py-4 border-b">
                      <span className="text-2xl md:text-3xl font-extrabold">
                        <span className="text-[#FFC300]">TOTAL:</span>{" "}
                        <span className="text-neutral-900">
                          {total.toFixed(2)} $
                        </span>
                      </span>

                      <Link
                      onClick={onClose}

                        href="/checkout"
                        className="whitespace-nowrap px-5 py-2 text-xs font-extrabold uppercase tracking-wide bg-[#FFC300] hover:bg-[#e5ac00] text-black rounded-sm transition"
                      >

                        Complete Order
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
