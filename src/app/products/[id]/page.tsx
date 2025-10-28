// app/products/[id]/page.tsx  (Server Component)
import Image from "next/image";
import { fetchProductById } from "@/services/fetch";
import type { Product } from "@/models/models";
import ClientButtons from "./ClientButtons";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>; // 👈 שימי לב: Promise
}) {
  const { id } = await params;     // 👈 חובה await
  const product: Product = await fetchProductById(id);

  return (
    <div>
      <div>
        <Image src={product.image} alt={product.title} width={300} height={300} />
      </div>
      <div>
        <h1>{product.title}</h1>
        <p>{product.category}</p>
        <p>${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
