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
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../utils";
import { useStateContext } from "./Context/ContextProvider";
import { updatePasswordSchema } from "../utils/Validators";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function Password() {
  const save = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };
  const naviagation = useNavigation();
  const { access_token, setAccess_token, userDetail, setRefresh } =
    useStateContext();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const checkPasswordValidation = async (password: any, newPassword: any) => {
    try {
      await updatePasswordSchema.validate({
        password,
        newPassword,
      });
   //   if (password !== newPassword) {
       // alert("New Password and Old Password not Matching");
      // } else {
         changePassword(password, newPassword);
      // }
    } catch (error: any) {
      console.log(error);
      alert(error.errors);
    }
  };

  console.log(userDetail,'userdetail')

  const SignUpAgainUpdatePassWord = async () => {
    var data = JSON.stringify({
      userNameOrEmailAddress: userDetail.emailAddress,
      password: newPassword,
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
        SecureStore.setItemAsync(
          "userId1",
          JSON.stringify(res.data.result.userId)
        );

        setAccess_token(res.data.result.accessToken);

        save("user_id", JSON.stringify(res.data.result.user_id));
        save("access_token", res.data.result.accessToken);
        setRefresh(new Date().getTime());
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const changePassword = async (password: any, newPassword: any) => {
    var data = JSON.stringify({
      currentPassword: password,
      newPassword: newPassword,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/User/ChangePassword`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Abp-TenantId": "1",
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)

      .then((res: any) => {
        SignUpAgainUpdatePassWord();
        Alert.alert("Success", "Password Changed Successfuly", [
          {
            text: "Okay",
            onPress: () => {
              naviagation.navigate("Home");
            },
          },
        ]);

        setNewPassword("");
        setPassword("");
      })
      .catch((error: any) => {
        Alert.alert(
          "Old Password is not Correct",
          "Please Enter Old Password",
          [{ text: "Okay" }]
        );
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#DBDBDB",
          top: high / 8.55,
          alignContent: "flex-start",
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
            fontSize: 18,
            left: wid / 76.8,
            textAlignVertical: "center",
          }}
          value={password}
          autoCapitalize="none"
          placeholder="Old Password"
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#DBDBDB",
          top: high / 6.55,
          alignContent: "flex-start",
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
            fontSize: 18,
            left: wid / 76.8,
            textAlignVertical: "center",
          }}
          value={newPassword}
          autoCapitalize="none"
          placeholder="New Password"
          onChangeText={(e) => setNewPassword(e)}
        />
      </View>
      <TouchableOpacity
        onPress={() => checkPasswordValidation(password, newPassword)}
        style={{
          width: "80%",
          alignSelf: "center",
          height: 40,
          borderRadius: 10,
          alignItems: "center",
          top: high / 4,
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
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
