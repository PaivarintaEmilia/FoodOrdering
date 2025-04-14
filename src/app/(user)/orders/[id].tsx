import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { useOrderById } from '@/src/api/orders';


/* SINGLE ORDER LIST ITEM PAGE */

const OrderDetailScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const { data: order, isLoading, error } = useOrderById(id);

    // Check if the order exists 
    if (!order) {
        return <Text>Order not found</Text>
    };

    if (isLoading) {
        return <ActivityIndicator />;
    };

    if (error) {
        return <Text>Failed to fetch products</Text>
    }


    return (
        <View style={styles.container}>
            {/** Change the navigation menu name  */}
            <Stack.Screen options={{ title: `Order #${id}` }} />

            <OrderListItem order={order} />

            <FlatList
                data={order}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
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
