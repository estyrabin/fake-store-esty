import ProductCard from "./ProductCard";
import type { Product } from "@/models/models";

export default function ProductList({ products }: { products: Product[] }) {
	return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
	);
}


