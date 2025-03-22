import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native';
// Import the data, so we can get the correct pizzaz data
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';

const ProductDetailScreen = () => {
    // With this we get the id from previous screen
    const {id} = useLocalSearchParams();

    // Get the correct data of a pizza
    const product = products.find((p) => p.id.toString() == id);

    // Check if the product exists 
    if (!product) {
        return <Text>Product not found</Text>
    };


    return (
        <View style={styles.container}>
            {/** Change the navigation menu name  */}
            <Stack.Screen options={{ title: product?.name }}/>
            <Image 
                source={{ uri: product.image || defaultPizzaImage }} 
                style={styles.image} 
            />

            <Text style={styles.price}>${product.price}</Text>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 15,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default ProductDetailScreen;
