import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "@/models/models";
import styles from './ProductList.module.css';

export default function ProductList({ products }: { products: Product[] }) {
	return (
        <div className={styles.grid}>
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
	);
}


