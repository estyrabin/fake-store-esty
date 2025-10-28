"use client";
import ProductCard from "@/components/ProductCard";
import { useShopStore } from "@/hooks/useShopStore";


export default function WishlistPage() {
  const wishlist = useShopStore((s) => s.wishlist);
  const items = Object.values(wishlist);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium">Wishlist</h1>

      {items.length === 0 ? (
        <p className="text-sm text-gray-600">No saved items yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}