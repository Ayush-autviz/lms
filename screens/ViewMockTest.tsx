import React, { useEffect, useState } from "react";
import { BackHandler, ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RazorpayCheckout from "react-native-razorpay";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";
import axios from "axios";
import { Status } from "../types";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function ViewMockTest(props: any) {
  const { userDetail, setRefresh, access_token } = useStateContext();
  const [res, setRes] = useState("Notes");
  const navigation = useNavigation();
  const { data } = props.route.params;

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };
  const backbuttonHander = () => {
    navigation.navigate("TabTwo");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  }, [backbuttonHander]);

  console.log(data.isBuy);
  const [buttonValue] = useState(data.isBuy);

  const BuyCourse = () => {
    var options = {
      description: "Credits towards Coures",
      image:
        "https://icons.iconarchive.com/icons/graphics-vibe/neon-glow-social/48/youtube-icon.png",
      currency: "INR",
      key: "rzp_live_053g5CxcjSsXJW",
      amount: data.price * 100,
      name: "Teacher's Vision",
      prefill: {
        email: userDetail.emailAddress,
        contact: "",
        name: userDetail.name,
      },
      theme: { color: "#319EAE" },
    };
    RazorpayCheckout.open(options as any)
      .then((data: any) => {
        setRefresh(new Date().getTime());
        createPayment("Success");
        createEnrollementCoures();
      })
      .catch((error: any) => {
        createPayment("Failed");
        alert(
          `Payment Failed if Money deducted from your account.Please Contact Admin`
        );
      });
  };
  const createEnrollementCoures = async () => {
    let payload = JSON.stringify({
      studentId: userDetail.id,
      courseManagementId: data.id,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/EnrollCourses/CreateEnrollCourse`,
      headers,
      data: payload,
    };
    await axios(config)
      .then(function (response: any) { })
      .catch(function (error: any) {
        console.log("Create Enroll Failed", error);
      });
  };
  const getCourseDetails = async (token: any) => {
    let payload = "";
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/CourseManagementAppServices/GetStudentCourse?id=${data.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    };
    await axios(config)
      .then(function (response: any) {
        console.log(response);
        response.data?.result?.mockTests?.forEach((element: any) => {
          createCourseMockTest(element.id);
        });
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  const createCourseMockTest = async (mockTestId: any) => {
    let payload: any = JSON.stringify({
      courseManagementId: data.id,
      studentId: userDetail.id,
      mockTestId: mockTestId,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/EnrollMockTest/CreateCourseMockTest`,
      headers,
      data: payload,
    };

    await axios(config)
      .then(function (response: any) { })
      .catch(function (error: any) {
        console.log("Create MockTest Failed", error);
      });
  };

  const createPayment = async (status: Status) => {
    var payload = JSON.stringify({
      courseManagementId: data.id,
      name: userDetail.name,
      paymentType: "Online",
      purchaseTitle: data.name,
      price: data.price,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/Payment/CreatePayment`,
      headers,
      data: payload,
    };
    await axios(config)
      .then(function (response: any) {
        getCourseDetails(access_token);
      })
      .catch(function (error: any) {
        console.log("create payment APi", error);
      });
  };
  const goToPurchasePage = () => {
    props.navigation.navigate("Purchased", {
      id: data.id,
    });
  };
  var Mock = (
    <View
      style={{
        flexDirection: "row",
        width: wid / 1.2,
        height: high / 17,
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 116,
        borderWidth: 0.5,
        borderColor: "#EEEEEE",
        backgroundColor: "#FAFAFB",
      }}
    >
      <TouchableOpacity
        onPress={() => setRes("Notes")}
        style={{
          backgroundColor: res == "Notes" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Notes" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRes("Mock Tests")}
        style={{
          backgroundColor: res == "Mock Tests" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Mock Tests" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Mock Tests
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <ScrollView style={{ flex: 1, marginBottom: 1 }}>
      <View
        style={{
          alignItems: "center",
          marginTop: high / 30,
        }}
      >
        {data.imagePath ? (
          <Image
            source={{ uri: data.imagePath }}
            style={{
              width: wid / 1.12,
              height: high / 3,
              borderRadius: 10,
              resizeMode: "contain",
              backgroundColor: "transparent",
            }}
          ></Image>
        ) : (
          <Image
            source={require("../assets/images/bigEnglish.png")}
            style={{
              width: wid / 1.12,
              height: high / 3,
              borderRadius: 10,
              resizeMode: "contain",
              backgroundColor: "transparent",
            }}
          ></Image>
        )}
      </View>
      <View style={{ backgroundColor: "transparent", marginTop: high / 30 }}>
        {Mock}
      </View>
      <View style={{ marginTop: 10, paddingHorizontal: wid / 18 }}>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 22,
            marginTop: high / 60,
          }}
        >
          {data.name}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "Poppins-Regular",
          }}
        >
          {data.detail}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: "#D1CB97",
          borderRadius: 8,
          width: wid / 1.1,
          marginTop: high / 60,
          paddingHorizontal: wid / 20,
          paddingVertical: high / 60,
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
          marginBottom: 20,
        }}
      >
        <View style={styles.courseDetail}>
          <Text allowFontScaling={false} style={styles.textstyle}>
            Price
          </Text>
          <Text allowFontScaling={false} style={styles.textstyle}>
            {data.price}
          </Text>
        </View>
        <View style={styles.courseDetail}>
          <Text allowFontScaling={false} style={styles.textstyle}>
            Duration
          </Text>
          <Text allowFontScaling={false} style={styles.textstyle}>
            1 Year
          </Text>
          <Text allowFontScaling={false} style={styles.textstyle}>
            Total
          </Text>
          <Text allowFontScaling={false} style={styles.textstyle}>
            {data.price} 
          </Text>
        </View>
        <View style={{}}>
          <TouchableOpacity
            style={{
              backgroundColor: "#319EAE",
              marginTop: high / 30,
              width: wid / 1.371,
              borderRadius: 6,
              height: high / 17.08,

              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              buttonValue == "Buy" ? BuyCourse() : goToPurchasePage();
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
              {buttonValue == "Buy" && data.price > 0
                ? `Buy ${data.price}`
                : "View"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#FAFAFB",
              width: wid / 1.371,
              borderRadius: 6,
              borderWidth: 1,
              marginTop: high / 60,
              borderColor: "#F1F1F1",
              height: high / 17.08,
              alignSelf: "center",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "grey",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  loader: {
  },
  courseDetail: {
    marginVertical: high / 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textstyle: {
    color: "#A9A9A9",
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
});
