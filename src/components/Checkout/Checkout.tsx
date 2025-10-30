"use client";
import Image from "next/image";
import { useShopStore } from "@/hooks/useShopStore";
import { useState } from "react";
import Link from "next/link";
import styles from './Checkout.module.css';


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
      <div className={styles.overlay} aria-hidden="true" onClick={onClose} />
      <aside className={styles.aside} role="dialog" aria-modal="true" data-full={full}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h1 className={styles.heading}>
              Order <span className={styles.headingAccent}>Summary</span>
            </h1>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.content}>
              {items.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty.</p>
              ) : (
                <div className={styles.listWrap}>
                  <div className={styles.divider}>
                    {items.map(({ product, quantity }) => (
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
                            <button className={styles.qtyBtn} onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))} aria-label="Decrease quantity">–</button>
                            <span className={styles.qtyVal}>{quantity}</span>
                            <button className={styles.qtyBtn} onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase quantity">+</button>
                            <button className={styles.removeBtn} onClick={() => removeFromCart(product.id)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.totalRow}>
                    <div className={styles.totalContent}>
                      <span className={styles.totalTitle}><span className={styles.totalAccent}>TOTAL:</span> <span className={styles.totalVal}>{total.toFixed(2)} $</span></span>
                      <Link onClick={onClose} href="/checkout" className={styles.orderBtn}>Complete Order</Link>
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
