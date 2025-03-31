import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
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
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

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

            {/** Admin side details page header */}
            <Stack.Screen
                //name="[id]"
                options={{
                    title: 'Menu',
                    headerRight: () => (
                        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            {/** Change the navigation menu name  */}
            <Stack.Screen options={{ title: product?.name }} />
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />

            <Text style={styles.price}>{product.name}</Text>
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
        marginTop: 15,
    },
})

export default ProductDetailScreen;
