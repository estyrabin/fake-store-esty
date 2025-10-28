import Link from "next/link";

export default function CategoriesIndexPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link href="/categories/mens-clothing" className="rounded-md border px-4 py-8 text-center">Men's Clothing</Link>
        <Link href="/categories/womens-clothing" className="rounded-md border px-4 py-8 text-center">Women's Clothing</Link>
        <Link href="/categories/jewelry" className="rounded-md border px-4 py-8 text-center">Jewelry</Link>
        <Link href="/categories/electronics" className="rounded-md border px-4 py-8 text-center">Electronics</Link>
      </div>
    </div>
  );
}


