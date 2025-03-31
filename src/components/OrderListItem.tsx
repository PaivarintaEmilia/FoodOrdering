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



// Props of the order
type OrderListItemProps = {
  order: Order;
}


const OrderListItem = ({ order }: OrderListItemProps) => {
  // Helps to know if we are in a user or admin side (segment show the different screens that has been navigatet)
  const segments = useSegments();

  return (
    /* Navigate to single order page */
    <Link 
      href={`./menu/${order.id}` // Define the dynamic route
      } asChild>
      <Pressable style={styles.container}>

        <Text style={styles.title}>{order.status}</Text>
        <Text style={styles.price}>${order.status}</Text>
      </Pressable>
    </Link>
  );
};


export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: Colors.light.tint
  }
});
