import ProductList from "@/components/ProductList";
import { fetchProductsByCategory } from "@/services/fetch";

export default async function JewelryPage() {
  const products = await fetchProductsByCategory("jewelery");
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium">Jewelry</h1>
      <ProductList products={products} />
    </div>
  );
}


