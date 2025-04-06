import { View, Text, FlatList } from "react-native";
import React from "react";

const wishlist = () => {
  const items = []; // Example empty array for wishlist items

  return (
    <View style="flex-1 items-center justify-center bg-white">
      {items.length === 0 ? (
        <Text style="text-gray text-lg">Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style="text-black text-lg">{item}</Text>
          )}
        />
      )}
    </View>
  );
};

export default wishlist;
