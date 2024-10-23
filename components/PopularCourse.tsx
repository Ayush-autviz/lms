import React, { Fragment } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";

import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";
import { generateBoxShadowStyle } from "../lib/generateBoxShadow";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
const shadow = generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");
const PopularCourse = ({ navigation, item }: any) => {
  const handleNavigate = () => {
    navigation.navigate("CourseDetails", {
      data: item,
      Courseid: item.id,
    });
  };
  return (
    <TouchableOpacity onPress={() => handleNavigate()} style={styles.topicCntr}>
      <View >
        {!item.imagePath ? (
          <Image
            source={require("../assets/images/bigEnglish.png")}
            style={styles.imageStyle}
          />
        ) : (
          <Image
            source={{ uri: `${item.imagePath}` }}
            style={styles.imageStyle}
          />
        )}
      </View>
      <View
        style={{
          paddingVertical: high / 180,
          alignSelf: "center",
          width: wid / 2,
          flexDirection: "column",
          backgroundColor: "transparent",
        }}
      >
        <Text allowFontScaling={false} style={styles.cardText}>
          {item.name}
        </Text>
        <View style={styles.iconContainer}>
          {item.price != 0 ? (
            <Fragment>
              <FontAwesome
                style={{ marginRight: 5, marginLeft: 5 }}
                name="rupee"
                size={13}
                color="black"
              />
              <Text style={{ fontFamily: "Poppins-Regular" }}>
                {item.price}
              </Text>
            </Fragment>
          ) : (
            <Fragment>
              <Text style={{ fontFamily: "Poppins-Regular" }}>Free</Text>
            </Fragment>
          )}
        </View>
      </View>
      <AntDesign name="right" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default PopularCourse;
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  number: {
    fontFamily: "Poppins-Regular",
    left: wid / 70,
    fontSize: 14,
    color: "#8A8A8A",
    backgroundColor: "transparent",
  },
  cardText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  imageStyle: {
    resizeMode: "center",
    width: wid / 5.4,
    height: wid / 5.4,
    borderRadius: 10,
  },
  topicCntr: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 11,
    borderColor: "#F1F1F1",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: wid / 1.15,
    backgroundColor: "#FAFAFB",
    ...shadow,
  },

  placeholder1: {
    fontFamily: "Poppins-Medium",
    fontStyle: "normal",
    fontSize: 13,
  },
});
