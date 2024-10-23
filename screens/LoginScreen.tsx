import React from "react";
import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  View,
  Text,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Storage } from "../utils/LocalStorage";
import { KEYS } from "../utils";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
export default function LoginScreen() {
  const navigation = useNavigation();
  async function getValueFor() {
    let accesToken = await Storage.getItem(KEYS.ACCESS_TOKEN);
    let user_Id = await Storage.getItem(KEYS.ACCESS_TOKEN);
    if (accesToken && user_Id) {
      navigation.dispatch(StackActions.replace("Root"));
    } else {
      navigation.dispatch(StackActions.replace("SignIn"));
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={{
          resizeMode: "cover",
          height: "100%",
        }}
        style={styles.ImageBackground}
        source={require("../assets/images/bgBig.png")}
      >
        <View
          style={{
            height: "100%",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "transparent",
          }}
        >
          <View style={styles.image}>
            <Image
              source={require("../assets/images/sampleImage.png")}
              style={{
                backgroundColor: "transparent",
                alignSelf: "center",
                borderRadius: 18,
              }}
            ></Image>
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              top: high / 1.909,
              width: "90%",
              height: "10%",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 28,
                color: "white",
                fontFamily: "Poppins-Regular",
                alignSelf: "center",
              }}
            >
              Welcome to Teachers Vision
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              top: high / 1.45,
              width: "90%",
              height: "10%",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                color: "white",
                fontFamily: "Poppins-Regular",
                alignSelf: "center",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              indust
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              top: high / 1.2,
              height: high / 14.23,
              justifyContent: "space-around",
              width: "100%",
              alignItems: "center",
              alignContent: "center",
              backgroundColor: "transparent",
              position: "absolute",
            }}
          >
            <TouchableOpacity
              onPress={() => getValueFor()}
              style={{
                width: wid / 3.48,
                height: high / 28.46,
                backgroundColor: "transparent",
                alignContent: "center",
                borderRadius: 14,
                justifyContent: "center",
              }}
            >
              <Text allowFontScaling={false} style={styles.BottomText}>
                Skip
              </Text>
            </TouchableOpacity>
            <Image source={require("../assets/images/dot.png")} />
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.replace("Root"))}
              style={{
                width: wid / 3.24,
                height: high / 21.35,
                backgroundColor: "#1E2E46",
                alignContent: "center",
                borderRadius: 14,
                justifyContent: "center",
              }}
            >
              <Text allowFontScaling={false} style={styles.BottomText}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: high,
    width: wid,
    flex: 1,
  },
  ImageBackground: {
    width: "100%",
    alignSelf: "center",
    height: "100%",
  },
  image: {
    position: "absolute",
    width: "90%",
    top: high / 28.46,
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  BottomText: {
    fontFamily: "Poppins-Regular",
    alignSelf: "center",
    color: "white",
    fontSize: 16,
  },
});
