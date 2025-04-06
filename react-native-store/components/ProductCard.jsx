import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { images } from "../constants/images";
import { Link } from "expo-router";

// these variabales are used to make the card responsive to different screen sizes
// theyre out of the component so they become global variables
// and can be used in the styles of the component
const { width, height } = Dimensions.get("window");
const cardWidth = width * 0.45; // 45% of the screen width
const cardHeight = height * 0.38; // 38% of the screen height
// This will make the card responsive to different screen sizes
const ProductCard = (props) => {
  //   const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth, height: cardHeight }]}
      //   onPress={() => router.push(`/(screens)/${props.id}`)}
    >
      <Link href={`/(screens)/details/${props.id}`}>
        <View style={styles.content}>
          <View>
            <TouchableOpacity style={styles.wishlist}>
              <Image
                source={images.Heart}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Image
              source={{ uri: props.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.content}>
            <Text
              style={styles.title}
              numberOfLines={2}
              // added this number of line to make the text not overflow the card
            >
              {props.title}
            </Text>
            <Text style={styles.category}>{props.category}</Text>
            <Text style={styles.price}>${props.price}</Text>
          </View>
        </View>
      </Link>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontFamily: "QuicksandMedium",
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: cardWidth * 0.8, // 80% of the card width
    height: cardHeight * 0.5, // 50% of the card height
    marginVertical: 8,
  },
  category: {
    fontFamily: "QuicksandRegular",
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontFamily: "QuicksandBold",
    paddingTop: 5,
    fontSize: 20,
    color: "#a3b78f",
  },
  wishlist: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ProductCard;
