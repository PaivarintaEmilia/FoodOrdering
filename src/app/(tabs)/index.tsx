import { FlatList, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
// Import the instructors own assets
import products from '@assets/data/products';
// Import created child component 
import ProductListItem from '@components/ProductListItem';



/*THIS IS THE HOME SCREEN*/
export default function MenuScreen() {
  return (
    <View>
      {/*Flatlist for scrollable list*/}
      <FlatList
        data={products} renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{gap: 10, padding: 15}}
        columnWrapperStyle={{gap: 10}}
      />
    </View>
  );
};
