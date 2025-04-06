import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { images } from "../constants/images";
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext to manage authentication
import { StatusBar } from "expo-status-bar";

const Index = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading && isAuthenticated) {
      router.replace("/(tabs)/");
    }
  }, [loading, isAuthenticated]);

  return (
    <ImageBackground source={images.Landing} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 px-6 justify-between">
        <View className="mt-24">
          <Text className="text-5xl font-QuicksandBold text-text">StyleOn</Text>
          <Text className="text-lg text-text mt-4">
            Discover your style. Shop the latest trends today.
          </Text>
        </View>

        <View className="mb-16">
          <TouchableOpacity
            className="bg-accent py-4 rounded-2xl mb-4"
            onPress={() => router.push("/signup")}
          >
            <Text className="text-background text-center font-QuicksandBold text-lg">
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/signin")}>
            <Text className="text-center text-gray font-QuicksandMedium text-base">
              Already have an account?{" "}
              <Text className="text-accent underline">Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="transparent" translucent />
    </ImageBackground>
  );
};

export default Index;
