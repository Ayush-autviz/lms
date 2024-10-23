import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  ImageBackground,
  Image,

  Dimensions,
  StyleSheet,
  BackHandler,
  Share,
  View,
  Text,
} from "react-native";

import { useStateContext } from "./Context/ContextProvider";
import { Storage } from "../utils/LocalStorage";
import { KEYS } from "../utils";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function ProfilePage(props: any) {
  const navigation = useNavigation();
  const {
    userDetail,
    userImage,
    setuserImage,
    setAccess_token,
    setUserDetail,
  } = useStateContext();

  const logoutButtonHandler = async () => {
    try {
      setAccess_token(null);
      Storage.removeItem(KEYS.USER_ID);
      setUserDetail(null);
      Storage.removeItem(KEYS.ACCESS_TOKEN);
      setAccess_token(null);
      setuserImage(null);
      navigation.dispatch(StackActions.replace("SignIn"));
    } catch (error) {
      console.log(error);
    }
  };

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  console.log(userImage);

  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  return (
    <View style={{ backgroundColor: "#FAFAFB", width: wid }}>
      <ImageBackground
        imageStyle={{
          height: high / 1.9,
        }}
        style={styles.ImageBackground}
        source={require("../assets/images/bgBig.png")}
      >
        <View
          style={{
            flexDirection: "row",
            width: wid,
            height: high / 12.2,
            top: high / 42.7,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
                    <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ right: wid / 3.6 }}
          >
       
            <AntDesign name="back" size={28}
              color="#FFFFFF" />
          </TouchableOpacity>

          <Text
            allowFontScaling={false}
            style={{
              left: wid / 54.85,
              fontSize: 20,
              alignSelf: "center",
              fontFamily: "Poppins-Bold",
              color: "white",
            }}
          >
            Profile
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Job")}
            style={{ left: wid / 3.6 }}
          >
            <MaterialCommunityIcons
              name="bell-badge-outline"
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: wid,
            height: high / 3,
            flexDirection: "column",
            backgroundColor: "transparent",
            top: high / 28.46,
          }}
        >
          {userImage ? (
            <Image
              source={{ uri: userImage }}
              style={{
                alignSelf: "center",
                borderRadius: 18,
                width: wid / 4.5,
                height: wid / 4.5,
              }}
            />
          ) : (
            <Image
              source={require("../assets/images/profile.png")}
              style={{
                alignSelf: "center",
                borderRadius: 18,
                width: wid / 4.5,
                height: wid / 4.5,
              }}
            />
          )}

          <Text
            allowFontScaling={false}
            style={{
              top: high / 42.7,
              alignSelf: "center",
              color: "white",
              fontFamily: "Poppins-Regular",
              fontSize: 19,
            }}
          >
            {userDetail && userDetail.name}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              top: high / 34.16,
              alignSelf: "center",
              color: "white",
              fontFamily: "Poppins-Regular",
              fontSize: 15,
            }}
          >
            Do not disturb, doing a study right now.
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("EditProfile")}
            style={{
              top: high / 13.77,
              justifyContent: "center",
              backgroundColor: "#2C384C",
              width: wid / 3,
              height: high / 21.35,
              borderRadius: 114,
              alignSelf: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                alignSelf: "center",
                color: "white",
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "transparent",
          bottom: high / 4,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: wid / 3,
            flexDirection: "row",
            height: high / 18,
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              borderRadius: 11,
              justifyContent: "center",
              alignSelf: "center",
              marginRight: 10,
              backgroundColor: "#E3F9F3",
            }}
          >
            <Image
              style={{ alignSelf: "center" }}
              source={require("../assets/images/notes.png")}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false} style={{ alignSelf: "center" }}>
            My Note
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "#FAFAFB",
          height: high / 1.1,
          bottom: high / 5.116,
          alignContent: "flex-start",
        }}
      >
        <TouchableOpacity style={styles.cardCntnr} onPress={() => shareApp()}>
          <FontAwesome
            name="share-alt"
            size={15}
            style={styles.cardFont}
          ></FontAwesome>
          <Text allowFontScaling={false} style={styles.cardtext}>
            Share App
          </Text>
          <Image
            style={styles.cardImage}
            source={require("../assets/images/arow.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardCntnr}
          onPress={() => props.navigation.navigate("Password")}
        >
          <Image
            source={require("../assets/images/key.png")}
            style={{ backgroundColor: "pink", alignSelf: "center", left: 10 }}
          />

          <Text allowFontScaling={false} style={styles.cardtext}>
            Update Password
          </Text>
          <Image
            style={styles.cardImage}
            source={require("../assets/images/arow.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logoutButtonHandler()}
          style={{
            width: wid / 2.258,
            height: high / 17.08,
            backgroundColor: "#319EAE",
            borderRadius: 26,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            top: high / 42.7,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardImage: {
    alignSelf: "center",
    left: wid / 4.682,
  },
  cardFont: {
    left: wid / 38.4,
  },
  cardtext: {
    width: "60%",
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    alignSelf: "center",
    textAlign: "left",
    left: wid / 15.36,
  },
  cardCntnr: {
    marginBottom: high / 85.4,
    flexDirection: "row",
    width: "85%",
    borderWidth: 1,
    borderRadius: 11,
    borderColor: "#F1F1F1",
    alignSelf: "center",
    height: high / 14.233,
    alignContent: "center",
    alignItems: "center",
  },
  ImageBackground: {
    width: "100%",
    alignSelf: "center",
    height: "50%",
  },
  image: {
    position: "absolute",
    width: "30%",
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
