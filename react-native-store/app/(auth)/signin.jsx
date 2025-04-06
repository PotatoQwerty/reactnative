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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
};

const Signin = () => {
  const { signIn } = useAuth();
  const [logs, setLogs] = useState({
    username: "",
    password: "",
  });

  const handleTextChange = (key, e) => {
    setLogs({ ...logs, [key]: e.nativeEvent.text });
  };

  const handleSubmit = async () => {
    await signIn(logs.username, logs.password);
  };

  return (
    <DismissKeyboard>
      <SafeAreaView className="w-full h-full bg-background px-6">
        <View className="flex-1 items-center justify-center gap-6">
          <Text className="text-4xl text-primary font-QuicksandBold mb-4">
            Welcome Back!
          </Text>

          <View className="w-full gap-5">
            <TextInput
              nativeID="username"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#050315"
              value={logs.username}
              className="bg-accent text-text p-5 rounded-2xl font-QuicksandMedium"
              onChange={(e) => handleTextChange("username", e)}
            />
            <TextInput
              nativeID="password"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#050315"
              secureTextEntry
              value={logs.password}
              className="bg-accent text-text p-5 rounded-2xl font-QuicksandMedium"
              onChange={(e) => handleTextChange("password", e)}
            />

            <TouchableOpacity className="self-end px-2">
              <Text className="text-blue-500 font-QuicksandBold">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-primary py-4 rounded-2xl shadow-lg"
            >
              <Text className="text-white text-center text-lg font-QuicksandBold">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full items-center gap-5 mt-6">
            <View className="bg-gray h-[1px] w-full" />
            <Text className="text-gray-500 font-QuicksandBold text-lg">Or</Text>

            <TouchableOpacity className="flex-row bg-accent p-4 w-4/5 rounded-2xl items-center justify-center gap-3 shadow">
              <Image
                source={images.Google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-white font-QuicksandRegular">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row bg-accent p-4 w-4/5 rounded-2xl items-center justify-center gap-3 shadow">
              <Image
                source={images.Facebook}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-white font-QuicksandRegular">
                Continue with Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default Signin;
