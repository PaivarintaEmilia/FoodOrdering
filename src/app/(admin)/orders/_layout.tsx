import { Stack } from "expo-router";


export default function OrderStack() {
    return (    
        <Stack>
            {/** <Stack.Screen name="index" options={{ title: 'Orders'}} /> */}
            <Stack.Screen name="list" options={{ headerShown: false }} />
        </Stack>
    );
}