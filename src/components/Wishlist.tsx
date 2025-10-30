"use client";
import Image from "next/image";
import { useShopStore } from "@/hooks/useShopStore";
import { useState } from "react";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import AddToCartButton from "@/components/AddToCartButton";

export default function Wishlist({ onClose }: { onClose: () => void }) {
  const { wishlist, addToCart } = useShopStore();
  const items = Object.values(wishlist);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" aria-hidden="true" onClick={onClose} />

      <aside  className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
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
              Wishlist <span className="text-[#FFC300]">Items</span>
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
                <p className="text-sm text-gray-600">No saved items yet.</p>
              ) : (
                <div className="divide-y">
                  {items.map((product) => (
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

                        <div className="mt-2 flex items-center gap-3">
                          {typeof product.price === "number" && (
                            <span className="text-sm text-neutral-700">
                              ${product.price.toFixed(2)}
                            </span>
                          )}

                          <div className="ml-auto flex items-center gap-2 [&>button]:mt-0">
                            <AddToCartButton product={product} />
                            <AddToWishlistButton product={product} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
