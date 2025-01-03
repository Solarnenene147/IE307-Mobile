import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (userId, user) => {
  try {
    await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(user)); // Chuyển thành chuỗi JSON
  } catch (error) {
    console.error("Failed to save user data to AsyncStorage", error);
  }
};

export const getUser = async (userId) => {
  try {
    const user = await AsyncStorage.getItem(`user_${userId}`);
    return user ? JSON.parse(user) : null; // Parse chuỗi JSON thành object
  } catch (error) {
    console.error("Failed to fetch user data from AsyncStorage", error);
  }
};

export const getCart = async (userId) => {
  try {
    const user = await AsyncStorage.getItem(`user_${userId}`);
    const userData = user ? JSON.parse(user) : {};
    return userData.cart || []; // Trả về mảng rỗng nếu không có giỏ hàng
  } catch (error) {
    console.error("Failed to fetch cart data from AsyncStorage", error);
  }
};

export const addToCart = async (userId, product) => {
  try {
    const user = await AsyncStorage.getItem(`user_${userId}`);
    let userData = user ? JSON.parse(user) : { cart: [] };

    // Ensure userData.cart is an array
    if (!Array.isArray(userData.cart)) {
      userData.cart = [];
    }

    const updatedCart = userData.cart;
    const productIndex = updatedCart.findIndex(
      (item) => item.productId === product.productId
    );

    if (productIndex !== -1) {
      throw new Error("Product already exists in the cart");
    } else {
      updatedCart.push(product);
    }

    userData.cart = updatedCart; // Update the cart
    await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(userData)); // Save the entire user data
    return updatedCart;
  } catch (error) {
    console.error("Failed to add product to cart", error);
    throw error; // Throw the error to be handled by the caller
  }
};

export const updateCart = async (userId, updatedCart) => {
  try {
    const user = await AsyncStorage.getItem(`user_${userId}`);
    let userData = user ? JSON.parse(user) : { cart: [] };

    userData.cart = updatedCart; // Cập nhật lại cart
    await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to update cart", error);
  }
};

export const countCartItems = async (userId) => {
  try {
    const user = await AsyncStorage.getItem(`user_${userId}`);
    const userData = user ? JSON.parse(user) : {};
    return userData.cart ? userData.cart.length : 0;
  } catch (error) {
    console.error("Failed to count cart items", error);
  }
};

export const deleteFromCart = async (userId, productId) => {
  try {
    const user = await AsyncStorage.getItem(`user_${userId}`);
    let userData = user ? JSON.parse(user) : { cart: [] };

    const updatedCart = userData.cart.filter(
      (item) => item.productId !== productId
    );

    userData.cart = updatedCart;
    await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to delete product from cart", error);
  }
};
export const clearCart = async (userId) => {
  try {
    const user = await AsyncStorage.getItem(`user_${userId}`);
    let userData = user ? JSON.parse(user) : { cart: [] };
    userData.cart = [];
    await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to clear cart", error);
  }
};

export const updateQuantity = async (userId, productId, quantity) => {
  try {
    const user = await AsyncStorage.getItem(`user_${userId}`);
    let userData = user ? JSON.parse(user) : { cart: [] };

    const updatedCart = userData.cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    userData.cart = updatedCart;
    await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to update quantity", error);
  }
};
