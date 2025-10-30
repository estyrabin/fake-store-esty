"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useShopStore } from "@/hooks/useShopStore";
import Checkout from "@/components/Checkout/Checkout";
import Wishlist from "@/components/Wishlist/Wishlist";
import styles from './Header.module.css';

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
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.borderBox}>
          <div className={styles.flexBox}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/logo.png"
                alt="Shop Logo"
                width={55}
                height={55}
                className={styles.logoImg}
                priority
              />
              <span className={styles.logoText}>SHOP</span>
            </Link>
            <nav className={styles.nav}>
              <Link href="/" className={`${styles.linkBase} ${isActive("/") ? styles.active : ""}`}>Home</Link>
              <Link href="/category/mens-clothing" className={`${styles.linkBase} ${isActive("/category/mens-clothing", false) ? styles.active : ""}`}>Mens</Link>
              <Link href="/category/womens-clothing" className={`${styles.linkBase} ${isActive("/category/womens-clothing", false) ? styles.active : ""}`}>Womens</Link>
              <Link href="/category/jewelry" className={`${styles.linkBase} ${isActive("/category/jewelry", false) ? styles.active : ""}`}>Jewelry</Link>
              <Link href="/category/electronics" className={`${styles.linkBase} ${isActive("/category/electronics", false) ? styles.active : ""}`}>Electronics</Link>
              <Link href="/connect" className={`${styles.linkBase} ${isActive("/connect") ? styles.active : ""}`}>Contact Us</Link>
            </nav>
            <div className={styles.actionBtns}>
              <button
                type="button"
                onClick={() => setWishlistOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isWishlistOpen}
                className={styles.wishlistBtn}
              >
                <span className="sr-only">Open wishlist</span>
                <span className={styles.wishlistInner}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s-6.716-4.293-9.193-7.14C.49 11.317 1.165 7.9 3.69 6.37A5.01 5.01 0 0 1 12 7.248 5.01 5.01 0 0 1 20.31 6.37c2.525 1.53 3.2 4.947.883 7.49C18.716 16.707 12 21 12 21z" />
                  </svg>
                  Wishlist
                </span>
                {safeWishlistCount > 0 && (
                  <span className={styles.wishlistBadge}>
                    {safeWishlistCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isCartOpen}
                className={styles.cartBtn}
              >
                <span className={styles.cartInner}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 4h-2l-1 2H1v2h2l3.6 7.59L5.25 18A2 2 0 0 0 7 21h12v-2H7.42a.25.25 0 0 1-.22-.13L8.1 16h7.55a2 2 0 0 0 1.79-1.11l3.58-6.49A1 1 0 0 0 20.1 7H6.21l-.94-2z" />
                  </svg>
                  Cart
                </span>
                {safeCartCount > 0 && (
                  <span className={styles.cartBadge}>
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
