import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { getUserCart, fetchProductById } from "../../api/fakestore";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

const Cart = () => {
  const { id } = useLocalSearchParams();

  const [localCart, setLocalCart] = useState([]);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 px-4 bg-background justify-center items-center">
        <Text className="text-xl font-QuicksandBold mb-4">
          Please sign in to view your cart
        </Text>
        <Button title="Sign In" onPress={() => router.push("/signin")} />
      </SafeAreaView>
    );
  }

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await getUserCart(1);
        // hardcoded user id to 1 for testing purposes
        // in a real app, you would get the user id from the auth context or state management

        // chcecking if the cartResponse is an array before mapping over it
        // to avoid errors
        if (Array.isArray(cartResponse)) {
          const productDetails = await Promise.all(
            cartResponse.map((item) => fetchProductById(item.productId))
          );

          const newProduct = id ? await fetchProductById(id) : null;

          const updatedCart = [
            ...productDetails.map((product, index) => ({
              ...product,
              quantity: cartResponse[index].quantity,
            })),
            ...(newProduct ? [{ ...newProduct, quantity: 1 }] : []),
          ];

          setLocalCart(updatedCart);
        } else {
          console.error("Cart response is not an array:", cartResponse);
        }
      } catch (error) {
        console.error("Error fetching cart or products:", error);
      }
    };

    fetchCart();
  }, [id]);

  // this function updates the quantity of a specific product in the cart
  // if the product exists in the cart, its quantity is updated to the provided value
  // if the product does not exist, the cart remains unchanged
  const updateLocalCart = (productId, quantity) => {
    setLocalCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity = quantity;
        return updatedCart;
      }

      return prevCart;
    });
  };

  // This function adds a product to the cart or increments its quantity if it already exists
  // f the product exists in the cart, its quantity is increased by 1
  // if the product does not exist its added to the cart with a quantity of 1
  const addToLocalCart = (product) => {
    setLocalCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const renderItem = ({ item }) => (
    <View className="p-4 mb-2 border border-gray-300 rounded-lg">
      <Text className="text-xl font-QuicksandBold">{item.title}</Text>
      <Text className="text-lg font-QuicksandMedium">
        Quantity: {item.quantity}
      </Text>
      <Text className="text-lg font-QuicksandMedium">Price: ${item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Text className="text-2xl font-QuicksandBold mb-4">Cart Items</Text>
      <FlatList
        data={localCart}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Cart;
