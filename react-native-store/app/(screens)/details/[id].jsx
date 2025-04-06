import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  fetchProductById,
  updateUserCart,
  getUserCart,
} from "../../../api/fakestore";
import { images } from "../../../constants/images";
import { useAuth } from "../../../context/AuthContext";
import { StatusBar } from "expo-status-bar";

const ProductDetails = () => {
  // importing the useAuth hook to get the user authentication status
  // this is to show the edit button only if the user is authenticated
  // because fakestore api doesnt have roles as admin or user so its only based on isAuthenticated or not
  const { isAuthenticated } = useAuth();
  // getting the id from the url using expo router
  const { id } = useLocalSearchParams();
  // im getting the dimensions of the screen to set the image size and container size
  // this is to make the image responsive to the screen size
  const { width, height } = Dimensions.get("window");
  const router = useRouter();

  const imageWidth = width * 0.8;
  const imageContainerHeight = height * 0.6;

  const [productDetails, setProductDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductDetails = async () => {
      const product = await fetchProductById(id);
      if (!product) {
        setLoading(true);
        return;
      }
      setProductDetails(product);
      setLoading(false);
    };
    getProductDetails();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  const handleAddToCart = async (product) => {
    try {
      const cartResponse = await getUserCart(1);
      const existingItem = cartResponse.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        const updatedQuantity = existingItem.quantity + 1;
        const res = await updateUserCart(1, product.id, updatedQuantity);
        if (res) {
          Alert.alert("Success", "Product quantity updated successfully!");
        } else {
          Alert.alert("Error", "Failed to update product quantity.");
        }
      } else {
        const res = await updateUserCart(1, product.id);
        if (res) {
          Alert.alert("Success", "Product added to cart successfully!");
        } else {
          Alert.alert("Error", "Failed to add product to cart.");
        }
      }

      router.push({ pathname: "/(tabs)/cart", params: { id: product.id } });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.imageContainer, { height: imageContainerHeight }]}>
          <Image
            source={{ uri: productDetails.image }}
            style={{ width: imageWidth, height: imageContainerHeight }}
            resizeMode="contain"
          />

          <TouchableOpacity style={styles.wishlistIcon}>
            <Image
              source={images.Heart}
              style={styles.iconSize}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {isAuthenticated && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate("edit-product", { product: id })
              }
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.backButton}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
              {"<"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.category}>{productDetails.category}</Text>
          <Text style={styles.title}>{productDetails.title}</Text>
          <Text style={styles.price}>${productDetails.price}</Text>
          <Text style={styles.description}>{productDetails.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => handleAddToCart(productDetails)}
        >
          <Image source={images.Cart} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 16,

    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  wishlistIcon: {
    position: "absolute",
    top: 30,
    right: 10,
    backgroundColor: "#c9beab",
    borderRadius: 50,
    padding: 8,
    zIndex: 20,
  },
  editButton: {
    position: "absolute",
    top: 70,
    right: 10,
    backgroundColor: "#c9beab",
    borderRadius: 50,
    marginTop: 10,
    padding: 8,
    zIndex: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "QuicksandBold",
  },
  backButton: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 30,
    left: 10,
    backgroundColor: "#c9beab",
    borderRadius: 50,
    padding: 8,
  },
  iconSize: {
    width: 24,
    height: 24,
  },
  textContainer: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "QuicksandBold",
    marginTop: 12,
  },
  category: {
    paddingTop: 8,
    fontSize: 16,
    fontFamily: "QuicksandLight",
    color: "#6B7280",
  },
  price: {
    fontSize: 24,
    fontFamily: "QuicksandBold",
    color: "#a3b78f",
  },
  description: {
    fontSize: 18,
    fontFamily: "QuicksandRegular",
    color: "#374151",
    marginVertical: 8,
    paddingBottom: 8,
  },
  actionContainer: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f6f5f9",
    padding: 16,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Android shadow
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#a3b78f",
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buyNowText: {
    color: "white",
    fontSize: 20,
    fontFamily: "QuicksandBold",
  },
  cartButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: "#a3b78f",
  },
});

export default ProductDetails;
