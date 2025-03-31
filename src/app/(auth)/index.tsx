import { Redirect } from 'expo-router';

export default function TabIndex () {
  return <Redirect href={'/(auth)/menu/sign-in'} />;
};