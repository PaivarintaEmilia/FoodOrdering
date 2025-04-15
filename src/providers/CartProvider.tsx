import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product, Tables } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";

type product = Tables<'products'>;

type CartType = {
    items: CartItem[];
    addItem: (product: product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    // Variable to show total amount of the cart
    total: number;
    checkout: () => void;
};

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0,
    checkout: () => { },
});

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const { mutate: insertOrder } = useInsertOrder();
    const { mutate: insertOrderItems } = useInsertOrderItems();

    const router = useRouter();

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
            item.id !== itemId ? item : { ...item, quantity: item.quantity + amount }
        )
            .filter((item) => item.quantity > 0) // Prevents cart item quantity to go under 0
        setItems(updateItems);
    };

    // Calculate the cart total 
    const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0);

    const clearCart = () => {
        setItems([]);
    };

    const checkout = () => {
        insertOrder({
            total,
            user_id: ""
        },
            {
                onSuccess: saveOrderItems,
            }
        );
    };

    const saveOrderItems = (order: Tables<'orders'>) => {

        const orderItems = items.map((cartItem) => ({
            order_id: order.id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            size: cartItem.size,
        }));

        insertOrderItems(orderItems, {
            onSuccess() {
                clearCart();
                router.push(`/(user)/orders/${order.id}`);
            }
        },
        );


    };

    return (
        <CartContext.Provider value={{ items: items, addItem, updateQuantity, total, checkout }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

// Custom build hook to put two imports together
export const useCart = () => useContext(CartContext);