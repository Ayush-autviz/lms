import * as React from "react";
import { StyleSheet, Image, Dimensions, View, Text } from "react-native";
import RenderHtml from "react-native-render-html";
import HtmlRenderWithMathTag from "./HtmlRenderWithMathTag";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
export default function AnswerOption(props: any) {
  let currColor = props.isSelected ? "#81DBDB" : "#FAFAFB";
  const source = {
    html: `${props.text}`,
  };
  const baseStyle = React.useMemo(
    () => ({
      fontFamily: "Poppins-Medium",
      color: "black",
    }),
    [props.isSelected]
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
        {props.isSelected ? (
          <Image
            style={{
              width: wid / 20,
              height: high / 40,
              backgroundColor: "#FAFAFB",
            }}
            resizeMode="cover"
            source={require("../assets/images/GreenCheck.png")}
          ></Image>
        ) : (
          <Image
            style={{ marginRight: wid / 38.4, backgroundColor: "#FAFAFB" }}
            resizeMode="cover"
            source={require("../assets/images/OptionDots.png")}
          ></Image>
        )}
        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>
          {props.title ? props.title : "No Option"}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "86%",
          backgroundColor: "#FAFAFB",
          borderStyle: "dashed",
          borderColor:
          props.isSelected === "isSelected" ? "#319EAE" : "#C9C17F",
          borderWidth: 1.5,
          borderRadius: 25,
          marginHorizontal: "3%",
          paddingHorizontal: wid / 19.2,
          minHeight: high / 17,
          paddingVertical: 5,
        }}
      >
        <View style={{ backgroundColor: "transparent", width: wid / 1.48 }}>
          {props.text.includes("math") ? (
            <View style={{}}>
              <HtmlRenderWithMathTag color={""} source={props.text} />
            </View>
          ) : (
            <RenderHtml
              baseStyle={baseStyle}
              contentWidth={wid / 1.3}
              source={source}
            />
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
