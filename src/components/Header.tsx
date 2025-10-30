"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useShopStore } from "@/hooks/useShopStore";
import Checkout from "@/components/Checkout";
import Wishlist from "@/components/Wishlist";

export default function Header() {
  const pathname = usePathname();
  const cartCount = useShopStore((s) => s.getCartCount());
  const wishlistCount = useShopStore((s) => s.getWishlistCount());

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);

  const isActive = (href: string, exact = true) =>
    exact ? pathname === href : pathname.startsWith(href);

  const linkBase =
    "px-2 py-1 text-[13px] tracking-wide text-neutral-900 hover:text-[#FFC300] transition-colors";
  const active =
    "text-[#FFC300] font-semibold border-b-2 border-[#FFC300]";

  const safeCartCount = mounted ? cartCount : 0;
  const safeWishlistCount = mounted ? wishlistCount : 0;

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

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setWishlistOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isWishlistOpen}
                className="relative border rounded-sm px-3 py-2 text-[12px] hover:bg-neutral-100"
              >
                <span className="sr-only">Open wishlist</span>
                <span className="inline-flex items-center gap-2">
                  {/* Heart icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s-6.716-4.293-9.193-7.14C.49 11.317 1.165 7.9 3.69 6.37A5.01 5.01 0 0 1 12 7.248 5.01 5.01 0 0 1 20.31 6.37c2.525 1.53 3.2 4.947.883 7.49C18.716 16.707 12 21 12 21z" />
                  </svg>
                  Wishlist
                </span>
                {safeWishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-[#FFC300] text-[10px] font-bold text-black px-1">
                    {safeWishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isCartOpen}
                className="relative text-xs font-bold uppercase tracking-wide bg-[#FFC300] hover:bg-[#E5AC00] text-black px-4 py-2 rounded-sm transition"
              >
                <span className="inline-flex items-center gap-2">
                  {/* Cart icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 4h-2l-1 2H1v2h2l3.6 7.59L5.25 18A2 2 0 0 0 7 21h12v-2H7.42a.25.25 0 0 1-.22-.13L8.1 16h7.55a2 2 0 0 0 1.79-1.11l3.58-6.49A1 1 0 0 0 20.1 7H6.21l-.94-2z" />
                  </svg>
                  Cart
                </span>
                {safeCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-black text-white text-[10px] font-bold px-1">
                    {safeCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isWishlistOpen && <Wishlist onClose={() => setWishlistOpen(false)} />}
      {isCartOpen && <Checkout onClose={() => setCartOpen(false)} />}
    </header>
  );
}
