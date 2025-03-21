import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const ProductDetailScreen = () => {
    // With this we get the id from previous screen
    const {id} = useLocalSearchParams();
    return (
        <View>
            {/** Change the navigation menu name  */}
            <Stack.Screen options={{ title: 'Details ' + id }}/>
            <Text>ProductDetailScreen for id: {id}</Text>

        </View>
    )

}

export default ProductDetailScreen;
