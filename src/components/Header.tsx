"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useShopStore } from "@/hooks/useShopStore";


export default function Header() {
    const cardCount = useShopStore((s) => s.getCartCount());
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4 gap-6">
                <Link href="/" className="text-xl font-semibold whitespace-nowrap">Milk & Honey Store</Link>
                <nav className="hidden md:flex items-center gap-6 text-sm flex-1 justify-center">
                    <Link href="/">Home</Link>
                    <Link href="/category/mens-clothing">Men</Link>
                    <Link href="/category/womens-clothing">Women</Link>
                    <Link href="/category/jewelry">Jewelry</Link>
                    <Link href="/category/electronics">Electronics</Link>
                    <Link href="/connect">Connect Us</Link>
                </nav>
                <div className="flex items-center gap-4 text-sm">
                    <Link href="/wishlist">Wishlist</Link>
                    <Link href="/checkout" className="relative inline-flex items-center gap-2">
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
    