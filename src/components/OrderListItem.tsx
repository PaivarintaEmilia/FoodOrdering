import { StyleSheet, Image, Pressable } from 'react-native';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import Colors from '@/src/constants/Colors';
// Import the instructors own assets
import products from '@/assets/data/products';
// Import the type of the product
import { Order } from '../types';
// Router import
import { Link, useSegments } from 'expo-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';



dayjs.extend(relativeTime);

// Props of the order
type OrderListItemProps = {
  order: Order;
}


const OrderListItem = ({ order }: OrderListItemProps) => {
  // Helps to know if we are in a user or admin side (segment show the different screens that has been navigated)
  const segments = useSegments(); 

  return (
    /* Navigate to single order page */
    <Link 
      href={`./menu/${order.id}` // Define the dynamic route
      } asChild>
      <Pressable style={styles.container}>
        <View>
        <Text style={styles.title}>Order #{order.id}</Text>
        <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>

        <Text style={styles.status}>{order.status}</Text>

      </Pressable>
    </Link>
  );
};


export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});
