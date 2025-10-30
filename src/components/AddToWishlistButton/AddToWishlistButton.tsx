"use client";
import { useShopStore } from "@/hooks/useShopStore";
import type { Product } from "@/models/models";
import { useShallow } from "zustand/react/shallow";
import styles from './AddToWishlistButton.module.css';

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
      className={styles.addToWishlistButton}
      onClick={() =>
        isSaved ? removeFromWishlist(product.id) : addToWishlist(product)
      }
    >
      {isSaved ? "♥" : "♡"}
    </button>
  );
}
