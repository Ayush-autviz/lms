import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useStateContext } from "../screens/Context/ContextProvider";
import { heightPercentageToDP } from "../lib/ResonsiveDimesions";

const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
function HeaderNav(props: any) {
  const { userImage } = useStateContext();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.RectangleMenuContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <View style={{ backgroundColor: "#FAFAFB" }}>
          <Image
            style={styles.RectangleImgContainer}
            resizeMode="cover"
            source={require("../assets/images/ReactanglemenuBar/MenuRectange1.png")}
          ></Image>
          <Image
            style={styles.RectangleImgContainer}
            resizeMode="cover"
            source={require("../assets/images/ReactanglemenuBar/MenuRectange3.png")}
          ></Image>
        </View>

        <View>
          <Image
            style={styles.RectangleImgContainer}
            resizeMode="cover"
            source={require("../assets/images/ReactanglemenuBar/MenuRectange2.png")}
          ></Image>
          <Image
            style={styles.RectangleImgContainer}
            resizeMode="cover"
            source={require("../assets/images/ReactanglemenuBar/MenuRectange4.png")}
          ></Image>
        </View>
      </TouchableOpacity>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: heightPercentageToDP(2.6),
            fontFamily: "Poppins-Bold",
            backgroundColor: "#F7F7F7",
            paddingLeft: wid / 11.2,
          }}
        >
          {props.name}
        </Text>
      </View>
      <View style={styles.profileConatiner}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Job")}
          style={{ paddingRight: wid / 36.4, backgroundColor: "#F7F7F7" }}
        >
          <MaterialCommunityIcons
            name="bell-badge-outline"
            size={28}
            color="black"
          />
        </TouchableOpacity>
        {!userImage ? (
          <View style={{ backgroundColor: "#F7F7F7" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProfilePage")}
            >
              <Image
                resizeMode="cover"
                style={{ borderRadius: 10, backgroundColor: "#F7F7F7" }}
                source={require("../assets/images/profilePic.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ backgroundColor: "#F7F7F7" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProfilePage")}
            >
              <Image
                source={{ uri: userImage }}
                style={{
                  height: high / 22,
                  width: wid / 10.3,
                  borderRadius: 10,
                  backgroundColor: "#F7F7F7",
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F7",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    top: high / 42.7,
    height: high / 12.2,
    marginBottom: high / 42.7,
  },

  profileConatiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  RectangleMenuContainer: {
    marginTop: high / 170.8,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    padding: 8,
  },
  RectangleImgContainer: {
    margin: 2,
  },
});
export default HeaderNav;
