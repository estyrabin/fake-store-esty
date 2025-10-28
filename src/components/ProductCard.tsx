"use client";
import Image from "next/image";
import Link from "next/link";
import { useShopStore } from "@/hooks/useShopStore";
import type { Product } from "@/models/models";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useShopStore((s) => s.addToCart);
  const addToWishlist = useShopStore((s) => s.addToWishlist);

  return (
    <div className="group rounded-lg border bg-white hover:shadow-md transition overflow-hidden">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square w-full relative bg-gray-50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
          />
        </div>
        <div className="p-4 space-y-1">
          <h3 className="text-sm line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
          <p className="text-xs text-gray-500 capitalize">{product.category}</p>
          <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
        </div>
      </Link>

      <div className="p-4 pt-0 flex items-center gap-2">
        <button className="flex-1 rounded-md border px-3 py-2 text-sm" onClick={() => addToCart(product, 1)}>
          Add to cart
        </button>
        <button className="rounded-md border px-3 py-2 text-sm" onClick={() => addToWishlist(product)}>
          Save
        </button>
      </div>
    </div>
  );
}
