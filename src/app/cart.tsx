import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Platform, FlatList } from "react-native";
// Context imports for passing data
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";

const CartScreen = () => {

    // These variables come from the provider
    const { items, total } = useCart();

    return (
        <View style={{ padding: 10 }}>
            <Text>cart imtes length: {items.length}</Text>
            <FlatList 
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item}/>} 
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />

            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500'}}>Total: ${total}</Text>
            <Button text="Checkout" />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />


        </View>
    );
};

export default CartScreen;