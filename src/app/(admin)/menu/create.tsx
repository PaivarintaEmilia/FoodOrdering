import Button from '@/src/components/Button';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput } from 'react-native';



const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [error, setError] = useState('');

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

    const onCreate = () => {

        if (!validateInput()) {
            return;
        }

        console.warn('Create product');

        // Save in the database functionality

        resetFields();
    };

    return (
        <View style={styles.container}>
            <Image></Image>
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
            <Button onPress={onCreate} text={'Create'}/>


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
})

export default CreateProductScreen;
