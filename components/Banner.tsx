import React from "react";
import {
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
  Text,
} from "react-native";

import { generateBoxShadowStyle } from "../lib/generateBoxShadow";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../lib/ResonsiveDimesions";
import { useStateContext } from "../screens/Context/ContextProvider";
import { baseUrl } from "../utils";
import axios from "axios";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
const shadow = generateBoxShadowStyle(-2, 4, "#171717", 0.2, 5, 4, "#171717");

const Banner = ({ item, navigation, courseId }: any) => {
  const { access_token } = useStateContext();
  console.log(item, "full banner item");
  async function fetchBannerData(token: any) {
    let payload = "";
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/CourseManagementAppServices/GetStudentCourse?id=${courseId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Abp-TenantId": 1,
      },
      data: payload,
    };
    try {
      const res = await axios(config);
      const item = res.data.result;
      navigation.navigate("CourseDetails", {
        Courseid: courseId,
        data: {
          courseId: courseId,
          imagePath: item.imagePath,
          name: item.name,
          detail: item.detail,
          isBuy: item.price == 0 ? true : item.isBuy,
          creationTime: item.creationTime,
          price: item.price,
        },
      });
    } catch (error) {
      alert("This link is not valid");
    }
  }
  return (
    <View
      style={{
        height: high / 5.53,
        width: wid / 1.69,
        marginRight: wid / 15.8,
        borderColor: "#C9C17F",
        borderRadius: 11,
        backgroundColor: "#FAFAFB",
        borderWidth: 1,
        marginBottom: high / 42.7,
        ...shadow,
      }}
    >
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ borderRadius: 10 }}
        source={{ uri: item.image }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              marginTop: heightPercentageToDP(1.5),
              backgroundColor: "transparent",
              alignContent: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                color: "#ffffff",
                left: 10,
              }}
            >
              {item.title}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              marginTop: heightPercentageToDP(1.5),
              width: widthPercentageToDP(50),
              height: heightPercentageToDP(7.4),
              backgroundColor: "transparent",
              opacity: 0.7,
            }}
          >
            <Text
              allowFontScaling={false}
              numberOfLines={2}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                color: "#ffffff",
                left: 10,
              }}
            >
              {item.discription}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "transparent",
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                fetchBannerData(access_token);
              }}
              style={{
                width: wid / 5.48,
                height: high / 28.4,
                left: wid / 48,
                backgroundColor: "#EDDB49",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 14,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 12,
                }}
              >
                Get Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({});
