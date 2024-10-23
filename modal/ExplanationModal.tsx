import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import RenderHtml from "react-native-render-html";
const high = Dimensions.get("window").height;

const wid = Dimensions.get("window").width;

const ExplanationModal = ({ explanation, correctAnswer }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const source = {
    html: `${explanation}`,
  };
  const correctAnswerSrc = {
    html: `${correctAnswer}`,
  };
  const baseStyle = React.useMemo(
    () => ({
      fontFamily: "Poppins-Bold",
      color: "black",

      fontSize: 16,
      marginLeft: 5,
      marginTop: -3,
    }),
    []
  );
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.modalView}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View style={styles.upperContainer}>
              <Text
                style={[
                  styles.fontSytle,
                  { fontSize: 20, textAlign: "center" },
                ]}
              >
                {/* General Instructions */}
                Explanation
              </Text>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <FontAwesome name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    styles.fontSytle,
                    { fontSize: 15, textAlign: "center" },
                  ]}
                >
                  The Correct Answer is
                </Text>
                <RenderHtml
                  baseStyle={baseStyle}
                  ignoredDomTags={["math"]}
                  contentWidth={wid / 1.28}
                  source={correctAnswerSrc}
                />
              </View>

              <View>
                <RenderHtml
                  ignoredDomTags={["math"]}
                  contentWidth={wid / 1.28}
                  source={source}
                />
              </View>

              {/* <Text style={[styles.fontSytle, { color: "black" }]}>
                {explantion}
              </Text> */}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          left: wid / 20,
          alignItems: "center",
          justifyContent: "center",
          width: wid / 3,
          height: high / 20,
          backgroundColor: "#319EAE",
          borderStyle: "solid",
          borderColor: "#E9E9E9",
          borderRadius: 6,
        }}
      >
        <Text style={[styles.textStyle]}>View Explanation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  upperContainer: {
    width: wid / 1.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fontSytle: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    textAlign: "center",
  },

  textBold: {
    fontFamily: "Poppins-Bold",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    alignSelf: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: wid / 1.1,
    marginBottom: 20,
    backgroundColor: "#fafbfa",
    borderRadius: 20,
    paddingBottom: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    height: high / 25,
    width: wid / 10,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  buttonOpen: {},
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
});

export default ExplanationModal;
