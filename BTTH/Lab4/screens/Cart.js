import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { jwtDecode } from "jwt-decode";
import Icon from "react-native-vector-icons/FontAwesome"; 
import { FlatList, Swipeable } from "react-native-gesture-handler";
import {
  getCart,
  deleteFromCart,
  updateQuantity,
  clearCart,
} from "../database/db";

export default function CartScreen({ navigation }) {
  const { userToken, countCart, updateCountCart } = useContext(AuthContext);
  const user = userToken !== "" ? jwtDecode(userToken) : null;
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const cartInfo = await getCart(user.sub);
      setCart(cartInfo);
      setLoading(false);
    };

    fetchCart();
  }, [countCart]);

  const handleIncreaseQuantity = async (index, productId) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    await updateQuantity(user.sub, productId, updatedCart[index].quantity);
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = async (index, productId) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      await updateQuantity(user.sub, productId, updatedCart[index].quantity);
      setCart(updatedCart);
    } else {
      setSelectedProductId(productId);
      setModalVisible(true);
    }
  };

  const handleRemoveProduct = async () => {
    setLoading(true);
    await deleteFromCart(user.sub, selectedProductId);
    updateCountCart(countCart - 1 > 0 ? countCart - 1 : 0);
    setCart(cart.filter((item) => item.productId !== selectedProductId));
    setModalVisible(false);
    setLoading(false);
  };

  const handleCheckout = async () => {
    setLoading(true);
    await clearCart(user.sub);
    updateCountCart(0);
    setCart([]);
    setLoading(false);
  };

  const renderRightActions = (productId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => {
        setSelectedProductId(productId);
        setModalVisible(true);
      }}
    >
      <Icon name="trash" size={30} color="white" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#cf3339" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.productId.toString()}
            contentContainerStyle={{ paddingBottom: 50 }}
            renderItem={({ item: product, index }) => (
              <Swipeable
              renderRightActions={() => renderRightActions(product.productId)}
            >
              <View style={styles.product}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productDetailsContainer}>
                  <Text style={styles.productTitle} numberOfLines={1}>
                    {product.title}
                  </Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleDecreaseQuantity(index, product.productId)}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{product.quantity}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleIncreaseQuantity(index, product.productId)}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.totalPrice}>
                    ${(product.price * product.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </Swipeable>
            )}
          />
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Total Amount: $
              {cart
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            You have no products in your cart.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#02D0A0",
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              SHOPPING NOW
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to remove this item?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonYes}
                onPress={handleRemoveProduct}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonNo}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  product: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 8,
    padding: 10,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productDetailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#cf3339",
  },
  deleteButton: {
    backgroundColor: "#cf3339",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  shopButton: {
    backgroundColor: "#cf3339",
    padding: 10,
    borderRadius: 5,
  },
  shopButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#cf3339",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButtonYes: {
    backgroundColor: "#cf3339",
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 5,
  },
  modalButtonNo: {
    backgroundColor: "#02D0A0",
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
