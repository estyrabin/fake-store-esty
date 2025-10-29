"use client";
import { useShopStore } from "@/hooks/useShopStore";
import type { Product } from "@/models/models";

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useShopStore((s) => s.addToCart);

  return (
    <button
      className="mt-6 text-xs font-bold uppercase tracking-wide bg-[#FFC300] hover:bg-[#E5AC00] text-black px-4 py-3 rounded-sm transition"
      onClick={() => addToCart(product, 1)}
    >
      Add To Cart
    </button>
  );
}
