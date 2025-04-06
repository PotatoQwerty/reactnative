import axios from "axios";

const API_URL = "https://fakestoreapi.com";
// fetch all products is done and works

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("failed to fetch products:", error);
  }
};

// fetch product by id is done and works

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
  }
};

// fetch products by category is done and works

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${API_URL}/products/category/${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error("Failed to add product:", error);
  }
};

// update Product is done and works

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, product);

    if (response.status === 200) {
      return response.status, response.data;
      // the response data contains the updated product
    }
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    if (response.status === 200) {
      return response.data, response.status;
    }
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
};
// fetch all getusercart is done and works
export const getUserCart = async (userId) => {
  const response = await axios.get(`https://fakestoreapi.com/carts/${userId}`);
  if (response.status === 200) {
    return response.data.products;
  }
};

export const updateUserCart = async (userId, cart) => {
  const response = await axios.put(
    `https://fakestoreapi.com/carts/${userId}`,
    cart
  );
  if (response.status === 200) {
    return response.data, response.status;
  } else {
    throw new Error("Failed to update user cart");
  }
};
