import Image from "next/image";
import Link from "next/link";
import { fetchProductById } from "@/services/fetch";
import type { Product } from "@/models/models";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import styles from './ProductDetails.module.css';

const CATEGORY_MAP: Record<string, string> = {
    "men's clothing": "mens-clothing",
    "women's clothing": "womens-clothing",
    "jewelery": "jewelry",
    "electronics": "electronics",
};


export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product: Product = await fetchProductById(id);
  const category  = CATEGORY_MAP[product.category] ?? product.category;
  console.log("Product Details - Product:", product);

  return (
    <div className={styles.wrap}>
      <Link
        href={`/category/${category}`}
        className={styles.backBtn}
      >
        ← Back to {product.category}
      </Link>
      <div className={styles.upper}>
        <div className={styles.imageWrap}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={styles.productImage}
            priority
          />
        </div>
        <div className={styles.details}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.category}>{product.category}</p>
          <p className={styles.price}>PRICE: <span className={styles.priceAccent}>{product.price.toFixed(2)}$</span></p>
          <p className={styles.desc}>{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
