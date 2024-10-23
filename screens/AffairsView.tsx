import React, { useEffect, useState } from "react";
import { BackHandler, ScrollView } from "react-native";
import { Image, Dimensions, View, Text } from "react-native";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
import WebView from "react-native-webview";
export default function AffairsView(props: any) {
  const prop = props.route.params.item;
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  return (
    <ScrollView
      style={{
        backgroundColor: "#FAFAFB",
        marginBottom: high / 150,
      }}
    >
      <ScrollView
        scrollEnabled
        style={{
          backgroundColor: "pink",
        }}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <View
          style={{
            width: wid,

            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#FAFAFB",
          }}
        >
          <Image
            source={{ uri: `${prop.image}` }}
            style={{
              width: "80%",
              height: high / 4.27,
              borderRadius: 10,
              marginTop: 20,
              resizeMode: "contain",
            }}
          ></Image>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 22,
              alignSelf: "flex-start",
              left: wid / 12.8,
              marginTop: high / 28.46,
            }}
          >
            {prop.title}
          </Text>
          {prop.description.charAt(0) != "<" ? (
            <Text
              allowFontScaling={false}
              style={{
                marginTop: high / 22.7,
                width: "85%",
                height: "auto",
              }}
            >
              {prop.description}
            </Text>
          ) : (
            <WebView
              style={{
                backgroundColor: "transparent",
                width: wid / 1.2,
                height: high / 2,
              }}
              automaticallyAdjustContentInsets={true}
              originWhitelist={["*"]}
              source={{
                html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><style>
    body {word-wrap: break-word; overflow-wrap: }
</style><body>${prop.description}</body></html>`,
              }}
            />
          )}

          {/* <RenderHtml contentWidth={wid} source={source} /> */}
        </View>
        <View
          style={{
            backgroundColor: "#FAFAFB",
          }}
        ></View>
      </ScrollView>
    </ScrollView>
  );
}
