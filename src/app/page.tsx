import ProductList from "@/components/ProductList";
import { fetchProducts } from "@/services/fetch";

export default async function Home() {
  const products = await fetchProducts(8);

  return (
    <div className="space-y-10">
      <section className="text-center py-10 rounded-lg bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <h1 className="text-3xl font-semibold">Milk & Honey Store</h1>
      </section>

      <section>
        <ProductList products={products} />
      </section>
    </div>
  );
}
