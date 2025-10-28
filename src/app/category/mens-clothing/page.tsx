import ProductList from "@/components/ProductList";
import { fetchProductsByCategory } from "@/services/fetch";

export default async function MensClothingPage() {
  const products = await fetchProductsByCategory("men's clothing");
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium">Men's Clothing</h1>
      <ProductList products={products} />
    </div>
  );
}


