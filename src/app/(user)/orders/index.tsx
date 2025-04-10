import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '../../../components/Themed';
// Import created child component 
import OrderListItem from '@/src/components/OrderListItem';
import { useMyOrdertList } from '@/src/api/orders';



/*THIS IS THE HOME SCREEN*/
export default function OrdersScreen() {

  const { data: orders, isLoading, error } = useMyOrdertList();

  if (isLoading) {
    return <ActivityIndicator />;
  };

  if (error) {
    return <Text>Failed to fetch products</Text>
  }

  return (
    <View>
      {/*Flatlist for scrollable list*/}
      <FlatList
        data={orders} renderItem={({ item }) => <OrderListItem order={
          item
        } />}
        numColumns={1}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};
