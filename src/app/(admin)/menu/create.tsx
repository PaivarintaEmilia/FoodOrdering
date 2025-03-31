import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';



const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [error, setError] = useState('');

    const [image, setImage] = useState<string | null>(null);

    // We need the id to know which product we want to update
    const {id} = useLocalSearchParams();
    const isUpdating = !!id;

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const validateInput = () => {
        setError('');
        if (!name) {
            setError('Name is required');
            return false;
        }
        if (!price) {
            setError('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setError('Price is not a number');
            return false;
        }
        return true;
    }

    const onSubmit = () => {
        if (isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    }

    const onCreate = () => {

        if (!validateInput()) {
            return;
        }

        console.warn('Create product');

        // Save in the database functionality

        resetFields();
    };
    
    const onUpdate = () => {

        if (!validateInput()) {
            return;
        }

        console.warn('Update product');

        // Save in the database functionality

        resetFields();
    };

    


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    return (
        <View style={styles.container}>

            <Stack.Screen options={{ title: isUpdating ? "Update Product" : "Create Product" }}/>

            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            <Text 
                onPress={pickImage}
                style={styles.textButton}
            >Select image</Text>

            {/** Form to create product */}
            <Text style={styles.label}>Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder='Name'
                style={styles.input}
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder='9.99'
                style={styles.input}
                keyboardType='numeric'
            />


            <Text style={{ color: 'red' }}>{error}</Text>
            <Button onPress={onSubmit} text={ isUpdating? 'Update' : 'Create'} />


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
    },
    label: {
        fontSize: 16,
        color: 'grey',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 15,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        fontSize: 18,
        alignSelf: 'center',
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
});

export default CreateProductScreen;

