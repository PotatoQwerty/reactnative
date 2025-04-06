import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
const API_URL = "https://fakestoreapi.com/";

export const login = async (username, password) => {
  const credentials = { username, password };

  try {
    const response = await axios.post(`${API_URL}auth/login`, credentials);
    if (response.status === 200) {
      await SecureStore.setItemAsync("Token", response.data.token);
      // Store the token in SecureStore for to check for authentication on relaunch and im using
      // SecureStore for the token because it is more secure than AsyncStorage
      // and is used to store sensitive information like tokens and passwords
      await AsyncStorage.setItem("user", username);
      // Store the username in AsyncStorage for later use because fakestoreapi doesn't return the username or id in response so
      // we have to store it ourselves
      return response.status;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

export const createAccount = async (username, email, password) => {
  const credentials = { username, email, password };
  try {
    const response = await axios.post(`${API_URL}users`, credentials);
    if (response) {
      const id = response.data.id.toString();
      // im using tostring function to make sure the id is a string bc
      // SecureStore only accepts string values
      await SecureStore.setItemAsync("Token", id);
      // im simulating the token here because the fakestoreapi doesn't return a token on account creation
      // so we have to store it ourselves in normal cases the token is returned in the response
      // THIS IS NOT THE BEST PRACTICE BUT FOR THIS EXAMPLE IT WORKS
      await AsyncStorage.setItem("user", username);
      // Store the username in AsyncStorage for later use
      console.log("Account created successfully:", response.data.id);

      return response.status;
    } else {
      throw new Error(
        `Account creation failed with status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error during account creation:", error.message);
    throw new Error("Failed to create account. Please try again later.");
  }
};
