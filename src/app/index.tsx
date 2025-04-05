/** ROOT INDEX FILE */
import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';

const index = () => {
  const {session, loading} = useAuth();

  if (loading) {
    return <ActivityIndicator />; // Creates a spinner while Auth provider is fetching session data from Supabase
  }

  if (!session) {
    return <Redirect href={'/(auth)/menu/sign-in'} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      {/** User side */}
      <Link href={'/(user)/menu'} asChild>
        <Button text="User" />
      </Link>
      {/** Admin side */}
      <Link href={'/(admin)/menu'} asChild>
        <Button text="Admin" />
      </Link>
      {/** Login / register side */}
      <Link href={'/(auth)/menu/sign-in'} asChild>
        <Button text="Sign in" />
      </Link>
    </View>
  );
};

export default index;