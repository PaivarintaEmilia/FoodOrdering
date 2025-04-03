import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { OrderStatusList } from '@/src/types';
import Colors from '@/src/constants/Colors';


/* SINGLE ORDER LIST ITEM PAGE (order details) */

const OrderDetailScreen = () => {
    // With this we get the id from previous screen
    const { id } = useLocalSearchParams();

    console.warn(id);

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
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                /** Order status changer */
                ListFooterComponent={() => (
                        <>
                            <Text style={{ fontWeight: 'bold' }}>Status</Text>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                {OrderStatusList.map((status) => (
                                    <Pressable
                                        key={status}
                                        onPress={() => console.warn('Update status')}
                                        style={{
                                            borderColor: Colors.light.tint,
                                            borderWidth: 1,
                                            padding: 10,
                                            borderRadius: 5,
                                            marginVertical: 10,
                                            backgroundColor:
                                                order.status === status
                                                    ? Colors.light.tint
                                                    : 'transparent',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    order.status === status ? 'white' : Colors.light.tint,
                                            }}
                                        >
                                            {status}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </>
                    )
                }
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
