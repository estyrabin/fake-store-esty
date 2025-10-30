"use client";
import { useShopStore } from "@/hooks/useShopStore";
import type { Product } from "@/models/models";
import styles from './AddToCartButton.module.css';

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useShopStore((s) => s.addToCart);
  const removeFromWishlist = useShopStore((s) => s.removeFromWishlist);

  return (
    <button
      className={styles.addToCartButton}
      onClick={() => {
        addToCart(product, 1);
        removeFromWishlist(product.id);
      }}
    >
      Add To Cart
    </button>
  );
}
