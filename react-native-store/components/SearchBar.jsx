import { View, TextInput, Image } from "react-native";
import React, { forwardRef } from "react";
import { images } from "../constants/images";

const SearchBar = forwardRef(({ searchTerm, setSearchTerm }, ref) => {
  return (
    <View className="w-full h-fit px-4 py-2">
      <View className="w-full px-2 py-2 min-h-[50px] rounded-xl shadow-md flex-row items-center justify-between bg-white">
        <Image
          source={images.Search}
          className="size-6 ml-2"
          resizeMode="contain"
        />
        <TextInput
          ref={ref}
          className=" rounded-xl px-4 py-2 w-full h-full font-QuicksandMedium"
          placeholder="Search products..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          returnKeyType="search"
        />
      </View>
    </View>
  );
});

export default SearchBar;
