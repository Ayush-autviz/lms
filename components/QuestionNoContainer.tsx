import React from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";

const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
const QuestionNoContainer = (props: any) => {
  const { setIndex } = props;
  const { quesno, color } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        setIndex(quesno - 1);
        props.setModalVisible(false);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,

        alignSelf: "center",
        backgroundColor: color ? color : "#FAFAFB",
        width: wid / 7,
        margin: 8,
        height: high / 18,
        padding: 5,
      }}
    >
      <Text
        allowFontScaling={false}
        style={{
          fontSize: 23,
          fontFamily: "Poppins-Medium",
          color: color ? "#FAFAFB" : "black",
        }}
      >
        {quesno}
      </Text>
    </TouchableOpacity>
  );
};

export default QuestionNoContainer;
