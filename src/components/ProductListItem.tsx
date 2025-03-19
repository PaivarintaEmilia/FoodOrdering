import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import Colors from '@/src/constants/Colors';
// Import the instructors own assets
import products from '@/assets/data/products';



const ProductListItem = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};


export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
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
