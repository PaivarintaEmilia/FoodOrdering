import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';


/* SINGLE ORDER LIST ITEM PAGE */

const OrderDetailScreen = () => {
    // With this we get the id from previous screen
    const { id } = useLocalSearchParams();

    // Get the correct data of an order
    const order = orders.find((o) => o.id.toString() == id);

    // Check if the order exists 
    if (!order) {
        return <Text>Order not found</Text>
    };


    return (
        <View style={styles.container}>
            {/** Change the navigation menu name  */}
            <Stack.Screen options={{ title: `Order #${id}` }} />

            <OrderListItem order={order} />

            <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={ item } />}
                contentContainerStyle={{ gap: 10 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        gap: 20,
    },
})

export default OrderDetailScreen;
