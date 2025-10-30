import ProductList from "@/components/ProductList/ProductList";
import { fetchProducts } from "@/services/fetch";

export default async function Home() {
  const products = await fetchProducts(8);

  return (
    <div className="page-container">
      <section className="hero">
        <h1 className="hero-title">Milk & Honey Store</h1>
      </section>

      <section className="products-section">
        <ProductList products={products} />
      </section>
    </div>
  );
}
