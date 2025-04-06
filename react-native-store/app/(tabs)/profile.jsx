import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { images } from "../../constants/images";
import { useRouter } from "expo-router";

const profile = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    // implement dark mode functionality here
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 mb-28">
        {isAuthenticated ? (
          <View className="bg-secondary w-full h-60 items-center justify-center rounded-b-3xl shadow-2xl">
            <Image
              source={images.Profile}
              className="w-24 h-24 rounded-full border-4 border-white mb-2"
              resizeMode="cover"
            />
            <Text className="text-2xl font-QuicksandBold text-white">
              {user}
            </Text>
            <TouchableOpacity className="mt-2">
              <Text className="text-sm font-QuicksandRegular text-white underline">
                Edit Profile Name
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="bg-secondary w-full h-60 items-center justify-center rounded-b-3xl">
            <Text className="text-2xl font-QuicksandBold text-white">
              Not Signed In
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/signin")}
              className="mt-2"
            >
              <Text className="text-lg font-QuicksandRegular text-white underline">
                Go to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="mt-6 px-4">
          {isAuthenticated && (
            <>
              <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-300">
                <Text className="text-lg font-QuicksandMedium">
                  List Project
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-300">
                <Text className="text-lg font-QuicksandMedium">
                  Change Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-300">
                <Text className="text-lg font-QuicksandMedium">
                  Change Email Address
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-300">
                <Text className="text-lg font-QuicksandMedium">
                  Preferences
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => signOut()}
                className="flex-row items-center justify-between py-4 border-b border-gray-300"
              >
                <Text className="text-lg font-QuicksandMedium text-red-500">
                  Logout
                </Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-300">
            <Text className="text-lg font-QuicksandMedium">Settings</Text>
          </TouchableOpacity>
          <View className="flex-row items-center justify-between py-4 border-b border-gray-300">
            <Text className="text-lg font-QuicksandMedium">Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default profile;
