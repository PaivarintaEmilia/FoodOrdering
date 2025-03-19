import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
// Import the instructors own assets
import products from '@/assets/data/products';
// Import created child component 
import ProductListItem from '@/src/components/ProductListItem';



/*THIS IS THE HOME SCREEN*/
export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[0]}/>
      <ProductListItem product={products[1]}/>
    </View>
  );
};
