import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../utils";
import { FontAwesome } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { useStateContext } from "./Context/ContextProvider";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
const save = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};
const OtpScreen = (props: any) => {
  const { setAccess_token } = useStateContext();

  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const checkOTP = async () => {
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/services/app/User/ConfirmEmail?input=${props.route.params.userId}&otp=${otp}`,
      headers: {
        "Abp-TenantId": "1",
      },
    };

    await axios(config)
      .then(function (response) {
        Toast.show({
          type: "success",
          text1: "Register Successfull",
          position: "top",
        });

        result();
      })
      .catch(function (error) {
        Toast.show({
          type: "error",
          text1: error.response.data.error.message,
          position: "top",
        });
        alert(error.response.data.error.message);
      });
  };
  const resendOtp = async () => {
    var data = "";

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/services/app/Account/ResendOtp?id=${props.route.params.userId}`,
      headers: {
        "Abp-TenantId": "1",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        Toast.show({
          type: "success",
          text1: "Resent OTP Successfull",
          position: "top",
        });
        alert("Otp Resend Successfully");
      })

      .catch(function (error) {
        Toast.show({
          type: "error",
          text1: "Something went wrong!!!",
          position: "top",
        });
      });
  };
  const result = async () => {
    var data = JSON.stringify({
      userNameOrEmailAddress: props.route.params.email,
      password: props.route.params.password,
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

    axios(config)
      .then((res: any) => {
        SecureStore.setItemAsync("userId1", `${res.data.result.userId}`);

        setAccess_token(res.data.result.accessToken);
        save("user_id", `${res.data.result.userId}`);
        save("access_token", `${res.data.result.accessToken}`);
        navigation.dispatch(StackActions.replace("Root"));
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert("Login Failed", error.response.data.error.details, [
          { text: "Okay" },
        ]);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Toast position="top" topOffset={10} />

      <View >
        <View>
          <Text style={[styles.header, { marginBottom: 10 }]}>
            OTP Verification
          </Text>
          <Text style={[styles.header, { fontSize: 15, marginTop: 20 }]}>
            Please enter the OTP sent to your E-mail Address
          </Text>
          <Text style={styles.textHeader}>Enter OTP </Text>
          <TextInput
            value={otp}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            style={styles.textInput}
            onChangeText={(data: any) => setOtp(data)}
          />
          <TouchableOpacity
            onPress={() => checkOTP()}
            style={{
              width: wid / 1.3,
              flexDirection: "row",
              height: high / 17,
              marginTop: high / 60,
              backgroundColor: "#1E2E46",
              alignSelf: "center",
              borderRadius: 14,
              justifyContent: "center",
            }}
          >
            <Text allowFontScaling={false} style={styles.BottomText}>
              Verify & Proceed
            </Text>
            <FontAwesome
              name="long-arrow-right"
              color={"white"}
              style={{ alignSelf: "center", left: wid / 38.4 }}
            ></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: high / 80, flexDirection: "row", width: wid }}
            onPress={() => resendOtp()}
          >
            <Text
              style={[
                styles.textHeader,
                {
                  color: "#309EAF",
                  marginBottom: 10,
                  textAlign: "center",
                  width: wid,
                },
              ]}
            >
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    marginTop: high / 18,
    height: high / 1.5,
    justifyContent: "space-around",
  },
  header: {
    textAlign: "center",
    fontSize: 36,
    marginBottom: 48,
  },
  BottomText: {
    fontFamily: "Poppins-Regular",
    alignSelf: "center",
    color: "white",
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
    borderColor: "#DBDBDB",
    alignSelf: "center",
    paddingHorizontal: wid / 30,
    width: wid / 1.3,
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "center",
    height: high / 16.35,
  },
  textHeader: {
    fontFamily: "Poppins-Regular",
    alignSelf: "center",
    width: wid / 1.3,
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: 8,
    justifyContent: "center",
  },
});
