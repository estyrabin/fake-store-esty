"use client";
import Image from "next/image";
import { useShopStore } from "@/hooks/useShopStore";
import styles from './CheckoutPage.module.css';

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
    <div className={styles.wrap}>
      <h1 className={styles.heading}>
        <span className={styles.headingMain}>Order </span>
        <span className={styles.headingAccent}>Summary</span>
      </h1>

      {items.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <div className={styles.listWrap}>
          <div className={styles.divider}>
            {items.map(({ product, quantity }) => (
              <div key={product.id} className={styles.productRow}>
                <div className={styles.imageWrap}>
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
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))} aria-label="Decrease quantity">−</button>
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
              <button className={styles.orderBtn}>Complete Order</button>
            </div>
            <div className={styles.clearBtns}>
              <button className={styles.clearBtn} onClick={() => clearCart()}>
                Clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
