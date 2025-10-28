"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useShopStore } from "@/hooks/useShopStore";
import { usePathname } from "next/navigation";

export default function Header() {
  const cardCount = useShopStore((s) => s.getCartCount());
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const linkBase =
    "px-1 py-0.5 text-gray-700 transition-colors duration-200 hover:text-blue-600";
  const isActive = (href: string, exact = true) =>
    exact ? pathname === href : pathname.startsWith(href);
  const active =
    "text-blue-600 font-semibold border-b-2 border-blue-600";

  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4 gap-6">
        <Link href="/" className="text-xl font-semibold whitespace-nowrap">
          Milk & Honey Store
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm flex-1 justify-center">
          <Link href="/" className={`${linkBase} ${isActive("/") ? active : ""}`}>Home</Link>
          <Link href="/category/mens-clothing" className={`${linkBase} ${isActive("/category/mens-clothing", false) ? active : ""}`}>Men</Link>
          <Link href="/category/womens-clothing" className={`${linkBase} ${isActive("/category/womens-clothing", false) ? active : ""}`}>Women</Link>
          <Link href="/category/jewelry" className={`${linkBase} ${isActive("/category/jewelry", false) ? active : ""}`}>Jewelry</Link>
          <Link href="/category/electronics" className={`${linkBase} ${isActive("/category/electronics", false) ? active : ""}`}>Electronics</Link>
          <Link href="/connect" className={`${linkBase} ${isActive("/connect") ? active : ""}`}>Connect Us</Link>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/wishlist" className={`${linkBase} ${isActive("/wishlist") ? active : ""}`}>Wishlist</Link>
          <Link href="/checkout" className={`relative inline-flex items-center gap-2 ${linkBase} ${isActive("/checkout") ? active : ""}`}>
            <span>Cart</span>
            {mounted && cardCount > 0 ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black text-white text-xs px-1">
                {cardCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
