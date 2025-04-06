import React from "react";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";

const categories = [
  "all",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="p-4 "
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View
        className={`flex-row items-center justify-center min-h-[48] flex-1`}
      >
        {/* i added this min-h to make sure that all elements will be shown in the scroll view and not cropped out */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            className={`px-4 py-2 rounded-full mr-2 ${
              selectedCategory === category ? "bg-accent" : "bg-gray-300"
            }`}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              className={`text-lg font-QuicksandBold ${
                selectedCategory === category ? "text-white" : "text-black"
              }`}
              numberOfLines={1}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CategorySelector;
