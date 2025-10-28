"use client";
import Image from "next/image";
import { useShopStore } from "@/hooks/useShopStore";

export default function CheckoutPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useShopStore((s) => ({
      cartItems: s.cartItems,
      updateQuantity: s.updateQuantity,
      removeFromCart: s.removeFromCart,
      getCartTotal: s.getCartTotal,
      clearCart: s.clearCart,
    }));

  const items = Object.values(cartItems);
  const total = getCartTotal();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium">Checkout</h1>

      {items.length === 0 ? (
        <p className="text-sm text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 rounded-md border p-4">
                <div className="relative h-20 w-20 bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-1">{product.title}</p>
                  <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-md border px-2 py-1" onClick={() => updateQuantity(product.id, quantity - 1)}>
                    -
                  </button>
                  <span className="w-6 text-center text-sm">{quantity}</span>
                  <button className="rounded-md border px-2 py-1" onClick={() => updateQuantity(product.id, quantity + 1)}>
                    +
                  </button>
                  <button className="rounded-md border px-3 py-1 text-sm" onClick={() => removeFromCart(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md border p-4 space-y-4 h-fit">
            <h2 className="text-lg font-medium">Order Summary</h2>
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <button className="w-full rounded-md bg-black text-white px-4 py-2">Pay now</button>
            <button className="w-full rounded-md border px-4 py-2" onClick={() => clearCart()}>Clear cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
