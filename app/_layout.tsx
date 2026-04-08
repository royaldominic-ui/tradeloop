import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="listing" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="post" />
        <Stack.Screen name="search" />
        <Stack.Screen name="profile" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}