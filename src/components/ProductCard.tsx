"use client";
import Image from "next/image";
import Link from "next/link";
import { useShopStore } from "@/hooks/useShopStore";
import type { Product } from "@/models/models";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useShopStore((s) => s.addToCart);
  const addToWishlist = useShopStore((s) => s.addToWishlist);
  const removeFromWishlist = useShopStore((s) => s.removeFromWishlist);
  const isSaved = useShopStore((s) => Boolean(s.wishlist[product.id]));

  return (
    <div className="rounded-lg border bg-white text-center hover:shadow-lg transition overflow-hidden">

      <Link href={`/products/${product.id}`} className="block">
        <div className="w-full aspect-square relative bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6"
          />
        </div>

        <div className="px-3 pt-2 pb-3">
          <h3 className="font-semibold text-[14px] leading-tight mb-1 min-h-[2.5rem]">
            {product.title}
          </h3>

          <p className="text-[12px] text-neutral-500 capitalize">
            {product.category}
          </p>

          <p className="text-[14px] font-bold mt-1">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>

      {/* ✅ Bottom Buttons */}
      <div className="flex items-center gap-2 px-3 pb-4">

        <button
          className="flex-1 bg-[#FFC300] hover:bg-[#e5ac00] text-[12px] font-semibold text-black py-2 rounded-sm transition"
          onClick={() => addToCart(product, 1)}
        >
          🛒 ADD TO CART
        </button>

        {/* שומרים את הלוגיקה שלך */}
        <button
          className="border rounded-sm px-2 py-2 text-[11px] hover:bg-neutral-100"
          onClick={() =>
            isSaved
              ? removeFromWishlist(product.id)
              : addToWishlist(product)
          }
        >
          {isSaved ? "♥" : "♡"}
        </button>

      </div>
    </div>
  );
}
