import ProductList from "@/components/ProductList";
import { fetchProductsByCategory } from "@/services/fetch";

export default async function ElectronicsPage() {
  const products = await fetchProductsByCategory("electronics");
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium">Electronics</h1>
      <ProductList products={products} />
    </div>
  );
}


