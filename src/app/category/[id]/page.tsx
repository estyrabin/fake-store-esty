import ProductList from "@/components/ProductList";
import { fetchProductsByCategory } from "@/services/fetch";

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
    <div className="space-y-6">
      <h1 className="text-xl font-medium capitalize">{id.replace("-", " ")}</h1>
      <ProductList products={products} />
    </div>
  );
}
