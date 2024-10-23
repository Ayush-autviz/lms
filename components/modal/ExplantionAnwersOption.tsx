import * as React from "react";

import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import HtmlRenderWithMathTag from "../HtmlRenderWithMathTag";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
export default function ExplantionAnwersOption(props: any) {
  const { userAnswer, title, corrctAnswer, question } = props;
  let currTitle = props.title.toLowerCase();
  let color = "";

  let correctOption = corrctAnswer == currTitle ? true : false;
  if (correctOption) {
    color = "#63a461";
  }
  if (userAnswer != "null") {
    let userAnweredThisOption = userAnswer == currTitle ? true : false;
    if (userAnweredThisOption && !correctOption) {
      color = userAnswer === corrctAnswer ? "#319EAE" : "red";
    }
  }
  const source = {
    html: `${question}`,
  };
  const baseStyle = React.useMemo(
    () => ({
      fontFamily: "Poppins-Medium",
      color: color ? "#FFFFFF" : "black",
    }),
    [color]
  );

  return (
    <View
      style={{
        paddingHorizontal: wid / 19.2,
        display: "flex",
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FAFAFB",
      }}
    >
      <View
        style={{
          backgroundColor: "#FAFAFB",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {correctOption ? (
          <Image
            style={{
              width: wid / 20,
              height: high / 40,
              backgroundColor: "#FAFAFB",
            }}
            resizeMode="cover"
            source={require("../../assets/images/GreenCheck.png")}
          ></Image>
        ) : (
          <Image
            style={{ marginRight: wid / 38.4, backgroundColor: "#FAFAFB" }}
            resizeMode="cover"
            source={require("../../assets/images/OptionDots.png")}
          ></Image>
        )}
        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>
          {title ? title : "*"}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "86%",
          backgroundColor: color ? color : "#FAFAFB",
          borderStyle: color ? "solid" : "dashed",
          borderColor: color ? color : "#C9C17F",
          borderWidth: 1.5,
          borderRadius: 25,
          marginHorizontal: "3%",
          paddingHorizontal: wid / 19.2,
          minHeight: high / 17,
          paddingVertical: 5,
        }}
      >
        <View style={{ backgroundColor: "transparent", width: wid / 1.48 }}>
          {question.includes("math") ? (
            <View style={{}}>
              <HtmlRenderWithMathTag color={""} source={props.question} />
            </View>
          ) : (
            <RenderHtml
              baseStyle={baseStyle}
              contentWidth={wid / 1.3}
              source={source}
            />
          )}

          {/* <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              color: props.isSelected === "isSelected" ? "#FFFFFF" : "black",
              fontFamily: "Poppins-Medium",
              backgroundColor: "transparent",
            }}
          >
            {props.text}
          </Text> */}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
