import React, { useState, useEffect, Fragment } from "react";
import { Dimensions, Platform, ScrollView } from "react-native";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  Alert,
  View,
  Text,
} from "react-native";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { KEYS, baseUrl } from "../utils";
import { useStateContext } from "./Context/ContextProvider";
import { Storage } from "../utils/LocalStorage";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;

export default function SignInPage(props: any) {
  const { setAccess_token } = useStateContext();
  const [isloading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [userMailId, setUserMailId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isTyping, setisTyping] = useState(false);
  const [focused, setFocused] = useState(false);

  const result = async () => {
    var data = JSON.stringify({
      userNameOrEmailAddress: userMailId,
      password: userPassword,
      rememberClient: false,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/TokenAuth/Authenticate`,
      headers: {
        "Content-Type": "application/json",
        "Abp-TenantId": "1",
      },
      data: data,
    };
    try {
      setLoading(true);
      await axios(config)
        .then((res: any) => {
          setAccess_token(res.data.result.accessToken);
          Storage.setItem(KEYS.ACCESS_TOKEN, res.data.result.accessToken);
          Storage.setItem(KEYS.USER_ID, JSON.stringify(res.data.result.userId));
          setLoading(false);
          navigation.dispatch(StackActions.replace("Root"));
        })
        .catch((error: any) => {
          setLoading(false);
          console.log(error);
          Alert.alert("Login Failed", error.response.data.error.details, [
            { text: "Okay" },
          ]);
        });
    } catch (error) {
      setLoading(false);
      Alert.alert("Invalid credentials", "Incorrect Email or Password", [
        { text: "Okay" },
      ]);
    }
  };
  const toggleFocus = () => {
    setFocused((prev: any) => !prev);
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setisTyping(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setisTyping(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <ImageBackground
        imageStyle={{
          resizeMode: "cover",
          height: high / 1.8,
        }}
        style={styles.ImageBackground}
        source={require("../assets/images/bgBig.png")}
      ></ImageBackground>

      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "transparent",
        }}
      >
        <View style={{ backgroundColor: "transparent" }}>
          <Toast position="bottom" />
          <Image
            source={require("../assets/images/sampleImage.png")}
            style={{
              marginTop: isTyping == true ? -high / 18 : high / 20,
              alignSelf: "center",
              borderRadius: 18,
            }}
          ></Image>
        </View>
        <View
          style={{
            width: wid,
            backgroundColor: "#FFFFFF",
            height: high / 1.4,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              paddingVertical: high / 60,
              marginBottom: high / 70,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 30,
                color: "#1E2E46",
                fontFamily: "Poppins-Bold",
                left: wid / 12.8,
              }}
            >
              Sign In
            </Text>
          </View>
          <View
            style={{
              marginTop: -20,
              height: high / 9.2,
              justifyContent: "space-between",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                alignSelf: "flex-start",
                left: wid / 9.8,
                color: "#929292",
              }}
            >
              Email Or Phone Number
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#DBDBDB",
                width: "80%",
                borderRadius: 5,
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: high / 16.35,
              }}
            >
              <TextInput
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 14,
                  paddingLeft: 12,
                  width: "80%",
                  textAlignVertical: "center",
                }}
                value={userMailId}
                autoCapitalize="none"
                placeholder="Enter Your Email Or Phone no."
                onChangeText={(e) => setUserMailId(e)}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: high / 60,
              height: high / 9.5,
              justifyContent: "space-between",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                alignSelf: "flex-start",
                left: wid / 9.8,
                color: "#929292",
              }}
            >
              Password
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#DBDBDB",

                width: "80%",
                alignSelf: "center",
                flexDirection: "row",
                borderRadius: 5,
                justifyContent: "center",
                height: high / 16.35,
              }}
            >
              <TextInput
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 14,
                  marginRight: 20,
                  width: "80%",
                  textAlignVertical: "center",
                }}
                value={userPassword}
                secureTextEntry={!focused}
                autoCapitalize="none"
                placeholder="Enter Your Password"
                onChangeText={(e) => setUserPassword(e)}
              />

              {!focused ? (
                <FontAwesome
                  onPress={toggleFocus}
                  style={{ color: "#D0D0D0", alignSelf: "center" }}
                  name="eye"
                  size={20}
                  color="black"
                />
              ) : (
                <FontAwesome
                  onPress={toggleFocus}
                  name="eye-slash"
                  size={20}
                  style={{ color: "#D0D0D0", alignSelf: "center" }}
                />
              )}
            </View>
          </View>
          <View
            style={{
              marginTop: high / 45,
              width: "40%",
              left: wid / 9.8,
              height: 20,
              backgroundColor: "transparent",
            }}
          >
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate("reset")}
            >
              <Text allowFontScaling={false} style={{ color: "#309EAF" }}>
                Forget Password
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              flexDirection: "column",
              marginTop: high / 50,
              height: high / 21.35,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <TouchableOpacity
              onPress={result}
              style={{
                width: "80%",
                flexDirection: "row",
                height: high / 17,
                marginTop: high / 20,
                backgroundColor: "#1E2E46",
                alignSelf: "center",
                borderRadius: 12,
                justifyContent: "center",
              }}
              disabled={isloading}
            >
              {isloading ? (
                <ActivityIndicator size="small" color="#319EAE" />
              ) : (
                <Fragment>
                  <Text allowFontScaling={false} style={styles.BottomText}>
                    Sign In
                  </Text>
                  <FontAwesome
                    name="long-arrow-right"
                    color={"white"}
                    style={{ alignSelf: "center", left: wid / 38.4 }}
                  ></FontAwesome>
                </Fragment>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: high / 80, flexDirection: "row" }}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text>Don’t have an account yet ? </Text>
              <Text allowFontScaling={false} style={{ color: "#309EAF" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </ImageBackground> */}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageBackground: {
    width: "100%",
    position: "absolute",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  image: {},
  BottomText: {
    fontFamily: "Poppins-Bold",
    alignSelf: "center",
    color: "white",
    fontSize: 14,
  },
});
