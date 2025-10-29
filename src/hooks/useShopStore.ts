"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/models/models";

type ShopState = {
	cartItems: Record<number, CartItem>;
	wishlist: Record<number, Product>;
	addToCart: (product: Product, quantity?: number) => void;
	removeFromCart: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	clearCart: () => void;
	addToWishlist: (product: Product) => void;
	removeFromWishlist: (productId: number) => void;
	getCartCount: () => number;
	getCartTotal: () => number;
	getWishlistCount: () => number;

};

export const useShopStore = create<ShopState>()(
	persist(
		(set, get) => ({
			cartItems: {},
			wishlist: {},
			addToCart: (product, quantity = 1) => {
				set((state) => {
					const existing = state.cartItems[product.id];
					const nextQty = (existing?.quantity ?? 0) + quantity;
					return {
						cartItems: {
							...state.cartItems,
							[product.id]: { product, quantity: nextQty },
						},
					};
				});
			},
			removeFromCart: (productId) =>
				set((state) => {
					const { [productId]: _removed, ...rest } = state.cartItems;
					return { cartItems: rest };
				}),
			updateQuantity: (productId, quantity) =>
				set((state) => {
					if (quantity <= 0) {
						const { [productId]: _removed, ...rest } = state.cartItems;
						return { cartItems: rest };
					}
					const item = state.cartItems[productId];
					if (!item) return { cartItems: state.cartItems };
					return {
						cartItems: {
							...state.cartItems,
							[productId]: { ...item, quantity },
						},
					};
				}),
			clearCart: () => set({ cartItems: {} }),
			addToWishlist: (product) =>
				set((state) => ({
					wishlist: { ...state.wishlist, [product.id]: product },
				})),
			removeFromWishlist: (productId) =>
				set((state) => {
					const { [productId]: _removed, ...rest } = state.wishlist;
					return { wishlist: rest };
				}),
			getCartCount: () =>
				Object.values(get().cartItems).reduce((sum, item) => sum + item.quantity, 0
		),
			getCartTotal: () =>
				Object.values(get().cartItems).reduce(
					(sum, item) => sum + item.product.price * item.quantity,
					0
				),
			getWishlistCount: () => Object.keys(get().wishlist).length,
		}),
		{ name: "shop-storage" }
	)
);


