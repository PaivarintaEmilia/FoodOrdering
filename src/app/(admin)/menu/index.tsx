import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { View, Text } from '../../../components/Themed';
// Import the instructors own assets
import products from '@assets/data/products';
// Import created child component 
import ProductListItem from '@components/ProductListItem';
import { useProductList } from '@/src/api/products';



/*THIS IS THE HOME SCREEN*/
export default function MenuScreen() {

  const { data: products, error, isLoading } = useProductList();

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
        data={products} renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 15 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
};
