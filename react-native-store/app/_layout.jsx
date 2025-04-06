import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Stack, Tabs } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { AuthProvider, useAuth } from "../context/AuthContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { user, loading } = useAuth();

  const [fontsLoaded] = useFonts({
    QuicksandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    QuicksandMedium: require("../assets/fonts/Quicksand-Medium.ttf"),
    QuicksandRegular: require("../assets/fonts/Quicksand-Regular.ttf"),
    QuicksandLight: require("../assets/fonts/Quicksand-Light.ttf"),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    } else {
      SplashScreen.preventAutoHideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
