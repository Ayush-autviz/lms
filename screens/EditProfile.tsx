import React, { useEffect, useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  BackHandler,
  TextInput,
  Keyboard,
  View,
  Text,
  PermissionsAndroid,
  TouchableWithoutFeedback,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
import { object, string } from "yup";
import { useStateContext } from "./Context/ContextProvider";
import axios from "axios";
import { baseUrl } from "../utils";

import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../lib/ResonsiveDimesions";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
declare global {
  interface FormData {
    getHeaders: () => { [key: string]: string };
  }
}

export default function EditProfile(props: any) {
  FormData.prototype.getHeaders = () => {
    return { "Content-Type": "multipart/form-data" };
  };
  const defaultImage =
    "http://app.teachersvision.in/assets/img/user-img.png";
  const { userDetail, userImage, setuserImage, setUserDetail, access_token } =
    useStateContext();
  const navigation = useNavigation();
  const [currUserDetail, setcurrUserDetail] = useState<any>();
  const [surName, setSurName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Save");
  const [currUserImage, setCurrUserImage] = useState<any>({
    showLink: "",
    saveLink: "",
  });

  let header: any = {
    "Content-Type": "multipart/form-data",
    "Abp-TenantId": "1",
    Authorization: `Bearer ${access_token}`,
  };

  const getImageFromLibrary = async () => {
    try {
      const grantedcamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      const grantedstorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (
        grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
        grantedstorage === PermissionsAndroid.RESULTS.GRANTED
      ) {
        let res: any = await DocumentPicker.getDocumentAsync({
          type: "image/*",
        });
        if (res.type != "cancel") {
          const payload = new FormData();
          payload.append("file", {
            name: res.uri,
            type: res.mimeType,
            uri: res.uri,
          } as any);
          var config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${baseUrl}/api/services/app/CommonService/UploadImage`,
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "multipart/form-data",
            },
            data: payload,
          };

          await axios(config)
            .then(function (response) {
              setCurrUserImage({
                showLink: response.data.result.showLink,
                saveLink: response.data.result.saveLink,
              });
              console.log(response.data.result);
            })
            .catch(function (error) {
              console.log("fdasfdsa", error);
            });
        }
      } else {
        console.log("Camera permission denied");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const save = async () => {
    let data: any = JSON.stringify({
      id: currUserDetail.id,
      userName: phoneNumber,
      name: name,
      gender: currUserDetail.gender,
      phoneNumber: null,
      pofileImage: currUserImage.saveLink || userImage || defaultImage,
      surname: surName,
      emailAddress: email,
      isActive: true,
      normalPassword: currUserDetail.normalPassword,
      fullName: currUserDetail.fullName,
      creationTime: moment(),
      roleNames: ["STUDENT"],
    });
    let header = {
      "Abp-TenantId": "1",
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    try {
      var config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${baseUrl}/api/services/app/User/Update`,
        headers: header,
        data: data,
      };

      const res = await axios(config)
        .then(function (response) {
          Toast.show({
            type: "success",
            text1: "Saved",
            position: "top",
          });
          console.log(response.data);
          setUserDetail({
            name: response.data.result.name,
            surname: response.data.result.surname,
            userName: response.data.result.name.userName,
            emailAddress: response.data.result.emailAddress,
            id: userDetail.id,
          });
          setuserImage(response.data.result.pofileImage);
          navigation.goBack();
        })
        .catch((err) => {
          Toast.show({
            type: "error",
            text1: "Please Enter Correct Details!!",
            position: "top",
          });
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Please Enter Correct Details!!!",
        position: "top",
      });
    }
  };
  useEffect(() => {
    const backbuttonHander = () => {
      navigation.dispatch(StackActions.pop());
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  let editProfileSchema = object({
    name: string().required("Please Enter Your Name"),
    surName: string().required("Please Enter Your SurName"),
    phoneNumber: string()
      .max(10, "Please Enter valid Mobile Number")
      .min(10, "Please Enter valid Mobile Number")
      .required("Please Enter valid Mobile Number"),
  });

  const checkValidation = async () => {
    try {
      await editProfileSchema.validate({ phoneNumber, name, surName });
      setButtonLabel("Saving ...");
      save();
    } catch (error: any) {
      alert(error.errors);
    }
  };

  const getcurrUserDeatail = async () => {
    try {
      const {
        data: { result },
      } = await axios.get(
        `${baseUrl}/api/services/app/User/Get?Id=${userDetail.id}`,
        { headers: header }
      );

      setcurrUserDetail(result);
      setPhoneNumber(result.userName);
      setEmail(result.emailAddress);
      setName(result.name);
      setSurName(result.surname);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcurrUserDeatail();
    return () => setButtonLabel("Save");
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#FFF", flex: 1 }}>
      <ImageBackground
        style={{ paddingVertical: high / 30 }}
        imageStyle={{}}
        source={require("../assets/images/bgBig.png")}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: heightPercentageToDP(2),
          }}
        >
          <TouchableOpacity
            style={{
              marginLeft: widthPercentageToDP(5),
            }}
            onPress={() => navigation.dispatch(StackActions.pop())}
          >
            <Ionicons name="arrow-back-sharp" size={35} color="white" />
          </TouchableOpacity>

          <Text
            allowFontScaling={false}
            style={{
              marginLeft: widthPercentageToDP(21.5),
              fontSize: 20,
              textAlign: "center",
              fontFamily: "Poppins-Bold",
              color: "white",
            }}
          >
            Edit Profile
          </Text>
        </View>
        <View
          style={{
            width: wid,
            backgroundColor: "transparent",
          }}
        >
          {currUserImage.showLink ? (
            <Image
              source={{ uri: currUserImage.showLink }}
              style={{
                marginTop: high / 30,
                alignSelf: "center",
                borderRadius: 18,
                width: wid / 4.5,
                height: wid / 4.5,
              }}
            />
          ) : (
            <Image
              source={
                userImage
                  ? { uri: userImage }
                  : require("../assets/images/profile.png")
              }
              style={{
                alignSelf: "center",
                marginTop: high / 30,
                borderRadius: 18,
                width: wid / 4.5,
                height: wid / 4.5,
              }}
            />
          )}

          <Text
            allowFontScaling={false}
            style={{
              marginTop: high / 30,
              alignSelf: "center",
              color: "white",
              fontFamily: "Poppins-Regular",
              fontSize: 15,
            }}
          >
            Do not disturb.
          </Text>
          <TouchableOpacity
            onPress={() => getImageFromLibrary()}
            style={{
              justifyContent: "center",
              backgroundColor: "#2C384C",
              marginTop: high / 50,
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
              Edit Image
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.textColor}>Edit Profile </Text>
          <TextInput
            value={name}
            placeholder="Enter Name"
            style={styles.textInput}
            onChangeText={(data: any) => setName(data)}
          />
          <TextInput
            placeholder="Enter SurName"
            value={surName}
            style={styles.textInput}
            onChangeText={(data: any) => setSurName(data)}
          />

          <TextInput
            placeholder="Enter Phone No"
            value={phoneNumber}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            style={styles.textInput}
            onChangeText={(data: any) => setPhoneNumber(data)}
          />
          <Text style={[styles.textInput, { textAlignVertical: "center" }]}>
            {email}
          </Text>

          <TouchableOpacity
            onPress={() => {
              checkValidation();
            }}
            disabled={buttonLabel === "Save" ? false : true}
            style={{
              width: wid / 2.258,
              height: high / 17.08,
              backgroundColor: "#319EAE",
              borderRadius: 26,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: high / 20,
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
              {buttonLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "center",
    paddingHorizontal: wid / 10,
    paddingVertical: high / 60,
  },
  textColor: {
    fontSize: 20,
    textAlign: "left",
    color: "#959595",
    fontFamily: "Poppins-Medium",
  },

  inner: {
    justifyContent: "space-around",
    backgroundColor: "pink",
  },
  textInput: {
    marginTop: high / 60,
    borderWidth: 1,
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
    borderColor: "#DBDBDB",
    alignSelf: "center",
    paddingHorizontal: wid / 30,
    width: wid / 1.25,
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "center",
    height: high / 16.35,
  },
});
