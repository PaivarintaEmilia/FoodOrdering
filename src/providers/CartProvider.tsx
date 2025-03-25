import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";

type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
};

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        // Create a new object
        const newCartItem: CartItem = {
            id: '1',
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };

        // Add the nwe object to the items-array
        setItems([newCartItem, ...items]);
    };

    return (
        <CartContext.Provider value={{ items: items, addItem}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

// Custom build hook to put two imports together
export const useCart = () => useContext(CartContext);