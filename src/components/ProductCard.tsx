"use client";
import Image from "next/image";
import Link from "next/link";
import { useShopStore } from "@/hooks/useShopStore";
import type { Product } from "@/models/models";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";

export default function ProductCard({ product }: { product: Product }) {
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
      <div className="flex gap-2 justify-center items-center">
        <AddToCartButton product={product} />
        <AddToWishlistButton product={product} />
      </div>

    </div>
  );
}
