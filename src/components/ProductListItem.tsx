import { StyleSheet, Image, Pressable } from 'react-native';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import Colors from '@/src/constants/Colors';
// Import the instructors own assets
import products from '@/assets/data/products';
// Import the type of the product
import { Product } from '../types';
// Router import
import { Link, useSegments } from 'expo-router';


// Url if there's no image
export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

// Props of the product
type ProductListItemProps = {
  product: Product;
}


const ProductListItem = ({ product }: ProductListItemProps) => {
  // Helps to know if we are in a user or admin side (segment show the different screens that has been navigatet)
  const segments = useSegments();

  return (
    /* Navigate to product-component */
    <Link 
      href={`./menu/${product.id}` // Define the dynamic route
      } asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};


export default ProductListItem;

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
