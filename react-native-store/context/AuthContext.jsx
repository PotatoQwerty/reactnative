import { useEffect, useState, createContext, useContext } from "react";
import { createAccount, login } from "../api/auth";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      const userToken = await SecureStore.getItemAsync("Token");
      const userName = await AsyncStorage.getItem("user");
      setLoading(true);
      if (userToken && userName) {
        setIsAuthenticated(true);
        setUser(userName);
        setLoading(false);
        setIsGuest(false);
      } else {
        setIsAuthenticated(false);
        setIsGuest(true);
        setLoading(false);
      }
    };
    checkUser();
  }, []);
  const signIn = async (username, password) => {
    try {
      const response = await login(username, password);
      if (response) {
        setUser(username);
        setIsAuthenticated(true);
        setIsGuest(false);
        router.replace("/(tabs)/");
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  const signOut = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync("Token");
    await AsyncStorage.removeItem("user");
    setIsAuthenticated(false);
  };
  const signUp = async (username, email, password) => {
    const response = await createAccount(username, email, password);
    if (response) {
      setUser(username);
      setIsAuthenticated(true);
      setIsGuest(false);
      router.replace("/(tabs)/");
    } else {
      throw new Error("Account creation failed");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isGuest,
        loading,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
