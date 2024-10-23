import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  Text,
  View,
} from "react-native";

import axios from "axios";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../utils";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function ResetPassword() {
  const navigation = useNavigation();
  const [emailOrNO, setEmailOrNO] = useState("");
  const config: any = {
    "Abp-TenantId": "1",
  };
  let options_: any = {
    observe: "response",
    responseType: "blob",
    headers: {
      Accept: "text/plain",
      "Abp-TenantId": "1",
    },
  };

  const changePassword = async (num: any) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/services/app/Account/ForgotPassword?usernameOrEmail=${emailOrNO}`,
        null,
        options_
      );
      Alert.alert("Email sent Successfully", "Please Check you Email", [
        { text: "Ok", onPress: () => navigation.navigate("SignIn") },
      ]);
    } catch (error) {
      alert("No Account Found...!!!");
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ width: wid, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 22,
          }}
        >
          Enter your Email
        </Text>
        <TextInput
          style={{
            marginTop: high / 40,
            width: "80%",
            borderWidth: 1,
            borderColor: "#DBDBDB",
            fontFamily: "Poppins-Regular",
            fontSize: 18,
            height: 40,
            borderRadius: 5,
            paddingHorizontal: 15,
          }}
          autoCapitalize="none"
          placeholder="User name or email"
          onChangeText={(e) => setEmailOrNO(e)}
        />
        <TouchableOpacity
          onPress={() => changePassword(emailOrNO)}
          style={{
            width: "80%",
            alignSelf: "center",
            marginTop: high / 40,

            height: 40,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1E2E46",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 16,
              color: "white",
            }}
          >
            Send Email
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: high / 4,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
