import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
// Import the data, so we can get the correct pizzaz data
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
// IseState import for size selector
import { useState } from 'react';
// Import Button component
import Button from '@/src/components/Button';
// Add cart import
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL',]

const ProductDetailScreen = () => {
    // With this we get the id from previous screen
    const { id } = useLocalSearchParams();
    const { addItem } = useCart(); // Function imported from the context

    const router = useRouter();

    const [selectedSize, setSelectedSIze] = useState<PizzaSize>('M');

    // Get the correct data of a pizza
    const product = products.find((p) => p.id.toString() == id);

    // Function for Button-element adding to cart
    const addToCart = () => {
        if (!product) {
            return;
        };
        addItem(product, selectedSize);  
    };

    const goToCart = () => {
        router.push('/cart');
    };




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

            <Button onPress={addToCart} text='Add to Cart' ></Button>
            <Button onPress={goToCart} text='Go to the Cart' ></Button>

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
        marginTop: 'auto',
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
