import React from "react";
import { TouchableOpacity, Dimensions, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
const high = Dimensions.get("screen").height;
const FinishButtonTest = (props: any) => {
  const route = useRoute();
  const { marginRight, SumbitTest, name } = props;
  return (
    <View
      style={{
        width: "100%",
        height: high / 21.35,
        margin: 7,
        marginRight: marginRight,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          SumbitTest();
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "110%",
          backgroundColor: "#319EAE",

          borderRadius: 4,
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 17,
            fontFamily: "Poppins-Regular",
            color: "white",
          }}
        >
          {name
            ? name
            : route.name.includes("xpanation") ||
              route.name.includes("uizTestViewExplanationScreen")
            ? "Exit"
            : "Finish Test"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinishButtonTest;
