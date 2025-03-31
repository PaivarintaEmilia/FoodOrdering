import { FlatList, StyleSheet } from 'react-native';
import { View } from '../../../components/Themed';
// Import the instructors own assets
import orders from '@assets/data/orders';
// Import created child component 
import OrderListItem from '@/src/components/OrderListItem';
import ProductListItem from '@components/ProductListItem';



/*THIS IS THE HOME SCREEN*/
export default function OrdersScreen() {
  return (
    <View>
      {/*Flatlist for scrollable list*/}
      <FlatList
        data={orders} renderItem={({ item }) => <OrderListItem order={
                  item
              }/>}
        numColumns={2}
        contentContainerStyle={{gap: 10, padding: 15}}
        columnWrapperStyle={{gap: 10}}
      />
    </View>
  );
};
