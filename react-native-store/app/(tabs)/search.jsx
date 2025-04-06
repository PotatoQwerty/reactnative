import React, { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, SafeAreaView } from "react-native";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import CategorySelector from "../../components/CategorySelector";
import { fetchProducts } from "../../api/fakestore";

const Search = () => {
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res);
        setFiltered(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let filteredData = products;

    if (selectedCategory !== "all") {
      filteredData = filteredData.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(filteredData);
    // i added these dependencies to the useEffect so that it runs every time the search term or selected category changes
    // this way we can filter the products based on the search term and selected category
  }, [selectedCategory, searchTerm, products]);

  const renderItem = ({ item }) => (
    <ProductCard
      id={item.id}
      title={item.title}
      image={item.image}
      category={item.category}
      price={item.price}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <SearchBar
        ref={inputRef}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        className="px-4"
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingBottom: 100, // added padding to avoid conflict with the tab bar
        }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Search;
