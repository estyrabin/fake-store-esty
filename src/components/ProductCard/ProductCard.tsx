"use client";
import Image from "next/image";
import Link from "next/link";
import { useShopStore } from "@/hooks/useShopStore";
import type { Product } from "@/models/models";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton/AddToWishlistButton";
import styles from './ProductCard.module.css';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.card}>
      <Link href={`/products/${product.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={styles.productImage}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>
            {product.title}
          </h3>
          <p className={styles.category}>
            {product.category}
          </p>
          <p className={styles.price}>
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className={styles.actions}>
        <AddToCartButton product={product} />
        <AddToWishlistButton product={product} />
      </div>
    </div>
  );
}
