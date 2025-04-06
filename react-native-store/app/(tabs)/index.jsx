import { Alert, FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchProducts } from "../../api/fakestore";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import { useDebounce } from "use-debounce";
import TopBar from "../../components/TopBar";
import { StatusBar } from "expo-status-bar";
const Index = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState();
  // here i set up all the states i need for the app
  // i set up the states for the products, filtered products, search term and selected id
  // i also set up the state for the search term and selected id to handle the redirect after clicking on a product
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  // im using the useDebounce hook to debounce the search term so that it only updates after 500ms of inactivity
  // this is to prevent the app from fetching the products every time the user types in the search bar in our case its a small app
  // it wouldnt be a problem but in a bigger app it would cause performance issues

  // we fetch the prodcuts from the api and set the products state to the response with useeffect that runs only once when the component mounts
  // so the depedency array is empty
  const getProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert(
        "Error",
        "There was an error fetching the products. Please try again later."
      );
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      setFiltered(products);
    } else {
      const filteredProducts = products.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFiltered(filteredProducts);
    }
  }, [debouncedSearchTerm, products]);
  // this is to handle in case there is no product found
  if (filtered.length === 0 && searchTerm.length > 0) {
    // if the filtered array is empty and the search term is not empty we show a message saying no products found
    return (
      <SafeAreaView className="flex-1 items-center justify-start bg-accent ">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          className="items-start"
        />
        <Text className="text-2xl font-QuicksandMedium self-center text-black">
          No products found
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <View className="flex-1 bg-background pt-44">
      <TopBar />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        className="px-4 pt-4"
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            image={item.image}
            category={item.category}
            price={item.price}
            onPress={() => setSelectedId(item.id)}
            selectedId={selectedId}
          />
        )}
      />
      <StatusBar style="light" />
    </View>
  );
};

export default Index;
