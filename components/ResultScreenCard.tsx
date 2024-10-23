import { View, Text, Image, Modal } from "react-native";
import React from "react";

const ResultScreenCard = (props: any) => {
  const { name, marks, fullMarks, icon_url } = props;

  return (
    <>
      <View
        style={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "4.5%",
        }}
      >
        <Image
          style={{ margin: 10 }}
          resizeMode="cover"
          source={icon_url}
        ></Image>
        <Text style={{ fontSize: 17, marginTop: "1%", fontWeight: "500" }}>
          {marks} / {fullMarks}
        </Text>
        <Text
          style={{
            color: "#B0B0B0",
            fontSize: 16,
            marginTop: "1%",
            fontWeight: "700",
          }}
        >
          {name}
        </Text>
      </View>
    </>
  );
};

export default ResultScreenCard;
