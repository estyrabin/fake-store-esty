"use client";
import Image from "next/image";
import { useShopStore } from "@/hooks/useShopStore";
import { useState } from "react";
import AddToWishlistButton from "@/components/AddToWishlistButton/AddToWishlistButton";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import styles from './Wishlist.module.css';

export default function Wishlist({ onClose }: { onClose: () => void }) {
  const { wishlist, addToCart } = useShopStore();
  const items = Object.values(wishlist);

  return (
    <>
      <div className={styles.overlay} aria-hidden="true" onClick={onClose} />

      <aside className={styles.aside} role="dialog" aria-modal="true">
        <div className={styles.panel}>
          <div className={styles.header}>
            <h1 className={styles.heading}>
              Wishlist <span className={styles.headingAccent}>Items</span>
            </h1>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.content}>
              {items.length === 0 ? (
                <p className={styles.emptyWishlist}>No saved items yet.</p>
              ) : (
                <div className={styles.listWrap}>
                  {items.map((product) => (
                    <div key={product.id} className={styles.productRow}>
                      <div className={styles.productImageWrap}>
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className={styles.productImage}
                        />
                      </div>
                      <div className={styles.productInfo}>
                        <p className={styles.productTitle}>{product.title}</p>
                        <div className={styles.qtyRow}>
                          {typeof product.price === "number" && (
                            <span className={styles.price}>${product.price.toFixed(2)}</span>
                          )}
                          <div className={styles.actionBtns}>
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
