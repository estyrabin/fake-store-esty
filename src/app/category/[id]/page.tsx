import ProductList from "@/components/ProductList/ProductList";
import { fetchProductsByCategory } from "@/services/fetch";
import styles from './CategoryPage.module.css';

export default async function ProductCategory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 

  const CATEGORY_MAP: Record<string, string> = {
  "mens-clothing": "men's clothing",
  "womens-clothing": "women's clothing",
  "jewelry": "jewelery",
  "electronics": "electronics",
};

const categoryName = CATEGORY_MAP[id] || id;



  const products = await fetchProductsByCategory(categoryName);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.heading}>{id.replace("-", " ")}</h1>
      <ProductList products={products} />
    </div>
  );
}
