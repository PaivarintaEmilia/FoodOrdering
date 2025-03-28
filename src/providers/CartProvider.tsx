import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        // If item is already in cart, only increment quantity
        const existingItem = items.find(
            (item) => item.product === product && item.size === size
        );

        if (existingItem) {
            updateQuantity(existingItem.id, 1);
        }

        // Create a new object
        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };

        // Add the nwe object to the items-array
        setItems([newCartItem, ...items]);
    };

    // Update quantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        const updateItems = items.map((item) => 
            item.id !== itemId ? item : {...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0) // Prevents cart item quantity to go under 0
        setItems(updateItems);
    };

    return (
        <CartContext.Provider value={{ items: items, addItem, updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

// Custom build hook to put two imports together
export const useCart = () => useContext(CartContext);