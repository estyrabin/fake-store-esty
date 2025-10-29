"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useShopStore } from "@/hooks/useShopStore";

export default function Header() {
  const pathname = usePathname();
  const cartCount = useShopStore((s) => s.getCartCount());
  const wishlistCount = useShopStore((s) => s.getWishlistCount());

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isActive = (href: string, exact = true) =>
    exact ? pathname === href : pathname.startsWith(href);

  const linkBase =
    "px-2 py-1 text-[13px] tracking-wide text-neutral-900 hover:text-[#FFC300] transition-colors";
  const active =
    "text-[#FFC300] font-semibold border-b-2 border-[#FFC300]";

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-6xl px-3">
        <div className="my-2 rounded-sm border border-neutral-300">
          <div className="flex items-center justify-between px-3 py-2">

            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Shop Logo"
                width={55}
                height={55}
                className="object-contain"
                priority
              />
              <span className="text-xl font-bold tracking-widest text-neutral-900">
                SHOP
              </span>
            </Link>

            <nav className="hidden md:flex flex-1 justify-center items-center gap-6">
              <Link href="/" className={`${linkBase} ${isActive("/") ? active : ""}`}>Home</Link>
              <Link href="/category/mens-clothing" className={`${linkBase} ${isActive("/category/mens-clothing", false) ? active : ""}`}>Mens</Link>
              <Link href="/category/womens-clothing" className={`${linkBase} ${isActive("/category/womens-clothing", false) ? active : ""}`}>Womens</Link>
              <Link href="/category/jewelry" className={`${linkBase} ${isActive("/category/jewelry", false) ? active : ""}`}>Jewelry</Link>
              <Link href="/category/electronics" className={`${linkBase} ${isActive("/category/electronics", false) ? active : ""}`}>Electronics</Link>
              <Link href="/connect" className={`${linkBase} ${isActive("/connect") ? active : ""}`}>Contact Us</Link>
            </nav>

            <div className="flex items-center gap-4 text-[13px] tracking-wide">
              <Link
                href="/wishlist"
                className="hover:text-[#FFC300] transition-colors"
              >
                Wishlist ({mounted ? wishlistCount : 0})
              </Link>

              <Link
                href="/checkout"
                className="hover:text-[#FFC300] transition-colors"
              >
                Cart ({mounted ? cartCount : 0})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
