import React, { useEffect } from "react";
import {
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ScrollView,
  View,
  Text,
} from "react-native";

import FinishButtonTest from "../components/FinishTestButton";
import QuestionNoContainer from "../components/QuestionNoContainer";

const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
const TestInfoScreen = (props: any) => {
  const length = props.route.params.length;
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.navigate("MockTest");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  const buttonText = "Markup";
  return (
    <View
      style={{
        display: "flex",
        alignSelf: "flex-end",
        backgroundColor: "#FFFFFF",
        height: "105%",
        top: high / 21.35,
        width: "85%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#319EAE",
          height: "10%",
          paddingHorizontal: "10%",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 26,
            color: "white",
          }}
        >
          Quant
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: 8,
            backgroundColor: "white",
            width: "12%",
            height: "40%",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ fontSize: 23, fontFamily: "Poppins-Bold" }}
          >
            X
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexWrap: "wrap",
          flexDirection: "row",
          width: wid / 1.2,
          alignItems: "center",
          height: high / 0.433,
          marginBottom: 200,
          paddingHorizontal: 15,
        }}
        style={{
          display: "flex",

          backgroundColor: "white",

          marginBottom: high / 4.5,
        }}
      >
        {Array.from(Array(length), (e: any, l: any) => {
          return <QuestionNoContainer key={l} quesno={l + 1} />;
        })}

        <FinishButtonTest key={Math.random() * 100} />
      </ScrollView>
    </View>
  );
};

export default TestInfoScreen;
