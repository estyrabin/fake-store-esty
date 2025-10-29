import Image from "next/image";
import Link from "next/link";
import { fetchProductById } from "@/services/fetch";
import type { Product } from "@/models/models";
import AddToCartButton from "../../../components/AddToCartButton";

const CATEGORY_MAP: Record<string, string> = {
    "men's clothing": "mens-clothing",
    "women's clothing": "womens-clothing",
    "jewelery": "jewelry",
    "electronics": "electronics",
};


export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product: Product = await fetchProductById(id);
  const category  = CATEGORY_MAP[product.category] ?? product.category;
  console.log("Product Details - Product:", product);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

      <Link
        href={`/category/${category}`}
        className="inline-flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4"
      >
        ← Back to {product.category}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        <div className="relative w-full h-[350px] md:h-[420px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            priority
          />
        </div>

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

          <AddToCartButton product={product} />
        </div>

      </div>
    </div>
  );
}
