import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TopBar = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <View className="w-full h-40 px-4 py-2 bg-secondary flex-row items-center justify-between absolute top-0 z-10 rounded-b-xl shadow-xl">
      <View className="flex-col items-start">
        <Text className="text-3xl font-QuicksandBold text-white mb-2">
          StyleOn
        </Text>
        <Text className="text-lg font-QuicksandBold text-white">
          {user ? "Hi, " + user + "!" : ""}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(screens)/wishlist")}
        className="px-4 py-2"
      >
        <FontAwesome name="heart" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
