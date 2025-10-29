"use client";
import { useShopStore } from "@/hooks/useShopStore";
import type { Product } from "@/models/models";
import { useShallow } from "zustand/react/shallow";

export default function AddToWishlistButton({ product }: { product: Product }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useShopStore(
    useShallow((s) => ({
      wishlist: s.wishlist,
      addToWishlist: s.addToWishlist,
      removeFromWishlist: s.removeFromWishlist,
    }))
  );

  const isSaved = Boolean(wishlist[product.id]);

  return (
    <button
      className="mt-6 text-xs font-bold uppercase tracking-wide border border-neutral-300 hover:bg-neutral-100 text-black px-4 py-3 rounded-sm transition"
      onClick={() =>
        isSaved ? removeFromWishlist(product.id) : addToWishlist(product)
      }
    >
      {isSaved ? "♥" : "♡"}
    </button>
  );
}
