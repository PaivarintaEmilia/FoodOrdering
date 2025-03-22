import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
// Import the data, so we can get the correct pizzaz data
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
// IseState import for size selector
import { useState } from 'react';

const sizes = ['S', 'M', 'X', 'XL',]

const ProductDetailScreen = () => {
    // With this we get the id from previous screen
    const { id } = useLocalSearchParams();

    const [selectedSize, setSelectedSIze] = useState('M');

    // Get the correct data of a pizza
    const product = products.find((p) => p.id.toString() == id);

    // Check if the product exists 
    if (!product) {
        return <Text>Product not found</Text>
    };


    return (
        <View style={styles.container}>
            {/** Change the navigation menu name  */}
            <Stack.Screen options={{ title: product?.name }} />
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />

            {/** SIZE SELECTOR */}
            <Text>Select Size</Text>

            <View style={styles.sizes}>
                {sizes.map((size) => (
                    <Pressable
                        onPress={() => {
                            setSelectedSIze(size)
                        }}
                        style={[
                            styles.size, 
                            { 
                                backgroundColor: selectedSize === size ? 'gainsboro' : 'white'
                            }
                        ]} key={size}>
                        <Text 
                            style={[
                                styles.sizeText,
                                {
                                    color: selectedSize === size ? 'black' : 'grey'
                                }
                            ]}
                        >{size}</Text>
                    </Pressable>
                ))}
            </View>

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
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,

    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
    },
})

export default ProductDetailScreen;
