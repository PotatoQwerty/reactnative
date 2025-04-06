import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  deleteProduct,
  fetchProductById,
  updateProduct,
} from "../../api/fakestore";

const EditProduct = () => {
  const { product } = useLocalSearchParams();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    id: product,
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [placeholder, setPlaceholder] = useState({
    title: "Title",
    price: "Price",
    description: "Description",
    category: "Category",
    image: "Image URI",
  });

  useEffect(() => {
    fetchProductById(product).then((data) => {
      setPlaceholder({
        title: data.title,
        price: data.price.toString(),
        description: data.description,
        category: data.category,
        image: data.image,
      });
    });
  }, []);

  const handleUpdate = async () => {
    const res = await updateProduct(product, formData);
    if (res === 200) {
      Alert.alert("Success", `Successfully updated product of ID  ${product}.`);
      navigation.goBack();
      return;
    } else {
      Alert.alert("Error", "Failed to update product:");
      return;
    }
  };
  const handleDetele = async () => {
    const res = await deleteProduct(product);
    if (res === 200) {
      Alert.alert("Success", `Successfully deleted product of ID  ${product}.`);
      navigation.goBack();
      return;
    } else {
      Alert.alert("Error", "Failed to delete product:");
      return;
    }
  };
  return (
    <View className="flex-1 p-4 bg-background">
      <ScrollView>
        <Text className="text-lg font-bold mb-2">Title</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder={placeholder.title}
          value={formData.title}
          onChangeText={(value) => setFormData({ ...formData, title: value })}
        />

        <Text className="text-lg font-bold mb-2">Price</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder={placeholder.price}
          value={formData.price}
          onChangeText={(value) => setFormData({ ...formData, price: value })}
          keyboardType="numeric"
        />

        <Text className="text-lg font-bold mb-2">Description</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder={placeholder.description}
          value={formData.description}
          onChangeText={(value) =>
            setFormData({ ...formData, description: value })
          }
          multiline
        />

        <Text className="text-lg font-bold mb-2">Image URI</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder={placeholder.image}
          value={formData.image}
          onChangeText={(value) => setFormData({ ...formData, image: value })}
        />

        <Text className="text-lg font-bold mb-2">Category</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder={placeholder.category}
          value={formData.category}
          onChangeText={(value) =>
            setFormData({ ...formData, category: value })
          }
        />

        <Button title="Update Product" onPress={handleUpdate} />
        <Button title="Delete Product" onPress={handleDetele} color={"red"} />
      </ScrollView>
    </View>
  );
};

export default EditProduct;
