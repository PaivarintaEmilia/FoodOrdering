import Button from '@/src/components/Button';
import Colors from '@/src/constants/Colors';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/src/lib/supabase';


const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Loading state to prevent multiple signUp intentions
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    async function signUpWithEmail() {

        setLoading(true);

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) Alert.alert(error.message);

        setLoading(false);
    }


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
            <Button onPress={signUpWithEmail} text={loading ? 'Creating account...' : 'Sign Up'} disabled={loading}/>
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

