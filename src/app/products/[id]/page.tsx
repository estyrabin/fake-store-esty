// app/products/[id]/page.tsx  (Server Component)

import Image from "next/image";
import Link from "next/link";
import { fetchProductById } from "@/services/fetch";
import type { Product } from "@/models/models";
import AddToCartButton from "./AddToCartButton";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product: Product = await fetchProductById(id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

      {/* Back link */}
      <Link
        href={`/category/${product.category}`}
        className="inline-flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4"
      >
        ← Back to {product.category}
      </Link>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Product Image */}
        <div className="relative w-full h-[350px] md:h-[420px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold leading-snug">
            {product.title}
          </h1>

          <p className="text-xs font-bold text-neutral-500 tracking-widest uppercase">
            {product.category}
          </p>

          <p className="text-lg font-extrabold mt-4">
            PRICE: <span className="text-[#FFC300]">{product.price.toFixed(2)}$</span>
          </p>

          <p className="text-[14px] leading-relaxed text-neutral-700">
            {product.description}
          </p>

          {/* ✅ Add to Cart Button */}
          <AddToCartButton product={product} />
        </div>

      </div>
    </div>
  );
}
