import Button from '@/src/components/Button';
import Colors from '@/src/constants/Colors';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/src/lib/supabase';



const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);


    async function signInWithEmail() {

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) Alert.alert(error.message);

        setLoading(false);
    };



    return (
        <View style={styles.container}>

            <Stack.Screen options={{ title: "Sign In" }} />

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
                secureTextEntry
            />

            <Button onPress={signInWithEmail} text={loading ? 'Signing in...' : 'Sign in'} disabled={loading}/>
            <Link href={'/(auth)/menu/sign-up'} asChild>
                <Text style={styles.textButton}>Create an account</Text>
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

