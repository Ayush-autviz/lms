import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const NoInternetModal = ({ isConnected }: any) => (
  <Modal visible={isConnected} style={styles.modal} animationType="slide">
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Connection Lost</Text>
      <Text style={styles.modalText}>
        Oops! Looks like your device is not connected to the Internet.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Please Check your Internet Connection ...
        </Text>
      </TouchableOpacity>
    </View>
  </Modal>
);
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  modalText: {
    fontSize: 18,
    color: "#555",
    marginTop: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
export default NoInternetModal;
