import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/images";
import { useAuth } from "../../context/AuthContext";

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

const Signup = () => {
  const { signUp } = useAuth();
  const [logs, setLogs] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleTextChange = (nativeID, e) => {
    setLogs({ ...logs, [nativeID]: e.nativeEvent.text });
  };

  const handleSubmit = async () => {
    setError("");
    if (!logs.username || !logs.email || !logs.password) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(logs.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      await signUp(logs.username, logs.email, logs.password);
      console.log("Signup data:", logs);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-4xl font-QuicksandBold text-primary mb-2">
            Let’s Get Started!
          </Text>
          <Text className="text-gray mb-6 text-center font-QuicksandMedium">
            Create your StyleOn account to explore the latest trends.
          </Text>

          {error ? (
            <Text className="text-red-500 font-semibold mb-4">{error}</Text>
          ) : null}

          <View className="w-full gap-4">
            <TextInput
              nativeID="username"
              placeholder="Username"
              value={logs.username}
              placeholderTextColor={"#050315"}
              autoCapitalize="none"
              className="bg-secondary text-text font-QuicksandMedium p-4 rounded-xl"
              onChange={(e) => handleTextChange("username", e)}
            />
            <TextInput
              nativeID="email"
              placeholder="Email"
              value={logs.email}
              keyboardType="email-address"
              placeholderTextColor={"#050315"}
              autoCapitalize="none"
              className="bg-secondary text-text p-4 rounded-xl font-QuicksandMedium"
              onChange={(e) => handleTextChange("email", e)}
            />
            <TextInput
              nativeID="password"
              placeholder="Password"
              value={logs.password}
              placeholderTextColor={"#050315"}
              secureTextEntry
              className="bg-secondary text-text p-4 rounded-xl font-QuicksandMedium"
              onChange={(e) => handleTextChange("password", e)}
            />

            <TouchableOpacity
              className="bg-primary py-4 rounded-xl shadow-xl"
              onPress={handleSubmit}
            >
              <Text className="text-white font-QuicksandBold text-center text-lg ">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <View className="items-center justify-center mt-8 w-full">
            <View className="bg-gray w-full h-[1px] mb-4" />
            <Text className="text-gray font-semibold mb-4">
              or continue with
            </Text>

            <TouchableOpacity className="bg-accent py-3 w-3/4 rounded-xl flex-row items-center justify-center gap-3 mb-3">
              <Image
                source={images.Google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-white font-bold text-center">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-primary py-3 w-3/4 rounded-xl flex-row items-center justify-center gap-3">
              <Image
                source={images.Facebook}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-white font-bold text-center">Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default Signup;
