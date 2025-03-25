import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Platform, FlatList } from "react-native";
// Context imports for passing data
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";

const CartScreen = () => {
    const { items } = useCart();

    return (
        <View>
            <Text>cart imtes length: {items.length}</Text>
            <FlatList 
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item}/>} 
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

export default CartScreen;