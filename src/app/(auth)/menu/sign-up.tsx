import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Link, Stack, useLocalSearchParams } from 'expo-router';



const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');


    const validateInput = () => {
        setError('');
        if (!email) {
            setError('Email is required');
            return false;
        }
        if (!password) {
            setError('Password is required');
            return false;
        }
        return true;
    }

    const signUp = () => {
        if (validateInput()) {
            // Sign in functionality
        } else {
            return;
        }
    }


    return (
        <View style={styles.container}>

            <Stack.Screen options={{ title: "Sign Up" }} />

            {/** Form to sign In */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder='example,@email.com'
                keyboardType='email-address'
                style={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                keyboardType='visible-password'
            />


            <Text style={{ color: 'red' }}>{error}</Text>
            <Button onPress={signUp} text="Sign Up" />
            <Link href={'/(auth)/menu/sign-in'} asChild>
                <Text style={styles.textButton}>Sign In</Text>
            </Link>
            


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

export default SignInScreen;

