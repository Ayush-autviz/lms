import React, { Fragment } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../screens/Context/ContextProvider";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { trimDate, trimName, trimText } from "../utils/Logics";
import { baseUrl } from "../utils";
import { generateBoxShadowStyle } from "../lib/generateBoxShadow";
import { Status } from "../types";
import moment from "moment";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
const shadow = generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");
export default function MockTestCard(props: any) {
  const navigation = useNavigation();
  const { userDetail, access_token  } = useStateContext();
  const {
    name,
    details,
    date,
    id,
    price,
    isBuy,
    isFree,
    isMockTest,
    upComingData,
    expiry
  } = props;

  var buy = isFree ? "Free" : isBuy ? "View" : "View";
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };

  const getCourseDetails = async (token: any, id: any) => {
    let data = "";
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/CourseManagementAppServices/GetStudentCourse?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    await axios(config)
      .then(function (response: any) {})
      .catch(function (error: any) {
        console.log(error);
      });
  };
  const createPayment = async (status: Status, razorpay_payment_id: string) => {
    var data = {
      name: userDetail.name,
      testName: "string",
      date: moment(),
      paymentType: "Online",
      purchaseTitle: name,
      price: price,
      paymentStatus: status,
      transactionID: razorpay_payment_id,
    };

    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/Payment/CreatePayment`,
      headers,
      data: data,
    };

    await axios(config)
      .then(function (response: any) {
        console.log(response);
        getCourseDetails(access_token, id);
      })
      .catch(function (error: any) {
        console.log("create payment APi", error);
      });
  };

  const createEnrollementCoures = async () => {
    let data = JSON.stringify({
      studentId: userDetail.id,
      courseManagementId: id,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/EnrollCourses/CreateEnrollCourse`,
      headers,
      data: data,
    };

    await axios(config)
      .then(function (response: any) {
        const { razorpay_payment_id } = response;
        buy = "View";
        upComingData();
        createPayment("Success", razorpay_payment_id);
        getCourseDetails(access_token, id);
      })
      .catch(function (error: any) {
        console.log(error);
        const { payment_id } = error.error.metadata;
        console.log(payment_id, error.error);
        createPayment("Failed", payment_id);
        console.log("Create Enroll Failed", error);
      });
  };

  const handleNavigation = () => {
    navigation.navigate("CourseDetails", {
      data: props,
      Courseid: id,
    } as never);
  };
  return (
    <TouchableOpacity
      onPress={() => handleNavigation()}
      style={{
        alignSelf: "center",
        width: "92%",
        borderStyle: "dashed",
        borderColor: "#C9C17F",
        borderWidth: 1,
        borderRadius: 11,
        marginVertical: "2%",
      }}
    >
      <View
        style={[
          styles.MockTestCard,
          styles.paddingInContainer,
          {
            justifyContent: "space-between",
            marginTop: high / 71.16,
            width: "100%",
          },
        ]}
      >
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={{ fontSize: 14, fontFamily: "Poppins-Bold", width: wid / 2.5 }}
        >
          {name.length <= 27 ? name : trimName(name)}
        </Text>
        <Text
          allowFontScaling={false}
          style={[styles.fontColor, { alignSelf: "center" }]}
        >
          
          {expiry ? `Valid till : ${moment(expiry).format('YYYY-MM-DD')}`: `Valid upto : ${date}`  }
        </Text>
      </View>
      {details && (
        <View style={{ width: "95%" }}>
          <Text
            allowFontScaling={false}
            style={[
              styles.paddingInContainer,
              styles.fontColor,
              { marginTop: high / 80.16, fontSize: 13 },
            ]}
          >
            {details.length <= 18 || details.length != null
              ? trimText(details)
              : "Details Not Available"}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.paddingInContainer,
          styles.MockTestCard,
          {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: high / 80,
            marginBottom: high / 50,
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {price && price > 0 ? (
            <Fragment>
              <FontAwesome name="rupee" size={18} color="black" />
              <Text
                allowFontScaling={false}
                style={[styles.fontColor, { marginLeft: wid / 64 }]}
              >
                {price}
              </Text>
            </Fragment>
          ) : (
            <Fragment>
              <FontAwesome name="rupee" size={18} color="black" />
              <Text
                allowFontScaling={false}
                style={[styles.fontColor, { marginLeft: wid / 64 }]}
              >
                Free
              </Text>
            </Fragment>
          )}
        </View>
        <View style={{}}>
          {isMockTest == true ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#319EAE",
                width: wid / 4,
                justifyContent: "center",
                alignContent: "center",
                height: high / 25.5,
                borderRadius: 4,
              }}
              onPress={() => {
                navigation.navigate("Test", { id: id } as never);
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: "white",
                  fontFamily: "Poppins-Regular",
                  fontSize: 12,
                  alignSelf: "center",
                }}
              >
                Start
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#319EAE",
                width: wid / 4,
                justifyContent: "center",
                alignContent: "center",
                height: high / 25.5,
                borderRadius: 4,
              }}
              onPress={() => {
                handleNavigation();
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: "white",
                  fontFamily: "Poppins-Regular",
                  fontSize: 12,
                  alignSelf: "center",
                }}
              >
                {buy}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  MockTestCard: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paddingInContainer: {
    paddingHorizontal: wid / 19.2,
  },
  fontColor: {
    color: "#8A8A8A",
    fontFamily: "Poppins-Regular",
  },
});
