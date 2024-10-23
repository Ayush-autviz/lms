import { FontAwesome } from "@expo/vector-icons";
import React, { Fragment } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";

import { enrollTrimText  } from "../utils/Logics";
import { generateBoxShadowStyle } from "../lib/generateBoxShadow";
import { heightPercentageToDP } from "../lib/ResonsiveDimesions";
import moment from "moment";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
const shadow = generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");
export const btnshadow = generateBoxShadowStyle(
 -2,
  4,
  "#171717",
  0.2,
  5,
  4,
  "#171717"
);
export default function EnrolledCourse({
  navigation,
  courseManagementId,
  imagePath,
  name,
  detail,
  isBuy,
  buy,
  creationTime,
  price,
  isFree,
  expiry,
  valid
}: any) {
  const navigate = () => {
    navigation.navigate("CourseDetails", {
      Courseid: courseManagementId,
      data: {
        courseManagementId,
        imagePath,
        name,
        detail,
        isBuy,
        creationTime,
        price,
      },
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(courseManagementId, "this is the navid");
        navigate();
      }}
      style={{
        flexDirection: "column",
        marginBottom: 2,
        height: heightPercentageToDP(34.8),
        width: wid / 1.7,
        ...shadow,
        marginRight: wid / 12,
        borderColor: "#F1F1F1",
        borderRadius: 11,
        borderStyle: "solid",
        backgroundColor: "#FAFAFB",
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
        borderWidth: 1,
      }}
    >
      <View style={{ backgroundColor: "#FAFAFB" }}>
        {imagePath ? (
          <Image
            resizeMode="stretch"
            style={{
              width: "101%",
              alignSelf: "center",
              marginTop: -1,
              height: high / 6.269,
              opacity: 2,
              backgroundColor: "transparent",
              borderTopRightRadius: 11,
              borderTopLeftRadius: 11,
            }}
            source={{ uri: imagePath }}
          ></Image>
        ) : (
          <Image
            resizeMode="stretch"
            style={{
              width: "101%",
              alignSelf: "center",
              marginTop: -1,
              height: high / 6.269,
              opacity: 2,
              backgroundColor: "transparent",
              borderTopRightRadius: 11,
              borderTopLeftRadius: 11,
            }}
            source={require("../assets/images/bigEnglish.png")}
          ></Image>
        )}
      </View>
      <View
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
          backgroundColor: "#FAFAFB",
          paddingTop: 15,
          paddingBottom: 10,
          borderBottomRightRadius: 13,
          borderBottomLeftRadius: 13,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap:'nowrap',
            height: heightPercentageToDP(2.7),
            backgroundColor: "#FAFAFB",
           // justifyContent: "space-between",
          }}
        >
          <Text
            numberOfLines={1}
            style={{ fontFamily: "Poppins-Bold", fontSize: 15, width: "60%" }}
          >
            {name}
          </Text>
      
        </View>
         {
          buy && valid!=='Unlimited' ? (  <Text style={{ fontFamily: "Poppins-Regular" }}>Valid till : {moment(expiry).format('YYYY-MM-DD')}</Text>
        ) : (  <Text style={{ fontFamily: "Poppins-Regular" }}>Valid upto : {valid}</Text>
      )
         }
       
        <View
          style={{
            height: high / 19,
            backgroundColor: "#FAFAFB",
            justifyContent: "center",
          }}
        >
          <Text numberOfLines={2} style={{ fontFamily: "Poppins-Regular" }}>
            {detail ? enrollTrimText(detail) : "No Details available"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#FAFAFB",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FAFAFB",
              alignItems: "center",
              width: wid / 3.7,
            }}
          >
            {!isFree && (
              <Fragment>
                <FontAwesome
                  style={{ marginRight: 5, marginLeft: 5 }}
                  name="rupee"
                  size={13}
                  color="black"
                />
                <Text style={{ fontFamily: "Poppins-Bold" }}>{price}</Text>
              </Fragment>
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigate()}
            style={{
              backgroundColor: "#319EAE",
              borderRadius: 20,
              width: wid / 6,
              height: high / 30,
              alignItems: "center",
              justifyContent: "center",
              ...btnshadow,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                color: "#FFFFFF",
              }}
            >
              {isFree ? "Free" : isBuy ? "View" : "View"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
