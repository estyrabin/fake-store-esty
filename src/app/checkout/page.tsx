"use client";
import Image from "next/image";
import { useShopStore } from "@/hooks/useShopStore";

export default function CheckoutPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    clearCart,
  } = useShopStore();

  const items = Object.values(cartItems);
  const total = getCartTotal();

  return (
    <div className="max-w-4xl mx-auto pt-6 space-y-8">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        <span className="text-neutral-900">Order </span>
        <span className="text-[#FFC300]">Summary</span>
      </h1>

      {items.length === 0 ? (
        <p className="text-sm text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {/* Items list */}
          <div className="divide-y">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="py-5 flex items-center gap-4">
                {/* image */}
                <div className="relative h-24 w-24 shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* title + controls */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg leading-snug line-clamp-2">
                    {product.title}
                  </p>

                  {/* quantity row styled like “- 1 +” */}
                  <div className="mt-2 flex items-center gap-3 text-lg">
                    <button
                      className="px-2 leading-none hover:opacity-80"
                      onClick={() =>
                        updateQuantity(product.id, Math.max(0, quantity - 1))
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-base">{quantity}</span>
                    <button
                      className="px-2 leading-none hover:opacity-80"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                    {/* keep logic; style as subtle link */}
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

          {/* total + CTA */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between py-4 border-b">
              <span className="text-2xl md:text-3xl font-extrabold">
                <span className="text-[#FFC300]">TOTAL:</span>{" "}
                <span className="text-neutral-900">
                  {total.toFixed(2)} $
                </span>
              </span>

              <button
                className="whitespace-nowrap px-5 py-2 text-xs font-extrabold uppercase tracking-wide bg-[#FFC300] hover:bg-[#e5ac00] text-black rounded-sm transition"
                onClick={() => {/* keep behavior if you add later */}}
              >
                Complete Order
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                className="px-4 py-2 text-xs font-medium border rounded-sm hover:bg-neutral-50"
                onClick={() => clearCart()}
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
