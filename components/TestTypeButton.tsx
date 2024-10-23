import { Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
const TestTypeButton = (props: any) => {
  const { title } = props;
  return (
    <TouchableOpacity
      style={{
        marginTop: high / 60,
        backgroundColor: "#319EAE",
        justifyContent: "center",
        alignItems: "center",
        width: wid / 2.5,
        height: high / 18,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontFamily: "Poppins-Bold",
          fontSize: 20,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TestTypeButton;
