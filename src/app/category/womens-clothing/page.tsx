import ProductList from "@/components/ProductList";
import { fetchProductsByCategory } from "@/services/fetch";

export default async function WomensClothingPage() {
  const products = await fetchProductsByCategory("women's clothing");
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium">Women's Clothing</h1>
      <ProductList products={products} />
    </div>
  );
}


