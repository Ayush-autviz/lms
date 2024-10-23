import React from "react";

import { TouchableOpacity, Dimensions, View, Text } from "react-native";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
const ButtonComponent = (props: any) => {
  const {
    text,
    borderWidth,
    borderStyle,
    borderColor,
    borderRadius,
    textColor,
    backgroudColor,
    marginRight,
  } = props;
  return (
    <View
      style={{
        width: "18%",
        height: high / 21.35,
        margin: 7,

        marginRight: marginRight,
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "110%",
          backgroundColor: backgroudColor,
          borderStyle: borderStyle,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: borderColor,
        }}
      >
        <Text
          style={{
            color: textColor,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;
