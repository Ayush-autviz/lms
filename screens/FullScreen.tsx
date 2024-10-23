// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, BackHandler } from "react-native";
import { Dimensions } from "react-native";
import { useState } from "react";
import * as React from "react";
import { FontAwesome } from "@expo/vector-icons";
import WebView from "react-native-webview";

export default function FullScreen({ route, navigation }: any) {
  React.useEffect(() => {
    const backbuttonHander = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  const wid = Dimensions.get("window").width;
  const high = Dimensions.get("window").height;

  const [shouldShow, setShouldShow] = useState(true);
  return (
    <View
      style={{
        alignSelf: "center",
        top: high / 3.25,
        left: wid / 10.5,
        height: wid,
        width: high,
        transform: [{ rotate: "90deg" }],
      }}
    >
      <View
        style={{
          height: "120%",
          position: "absolute",
          width: "120%",
          alignSelf: "center",
          left: high / 40,
          right: wid / 2,
        }}
      >
        <WebView
          style={{ height: "90%", width: "80%", position: "absolute" }}
          scrollEnabled={false}
          javaScriptEnabled={true}
          nestedScrollEnabled={false}
          overScrollMode="never"
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          source={{
            uri: "https://www.youtube.com/watch?v=T0f2ahOj1eA&ab_channel=BoxofficeMovieScenes&vq=480",
          }}
        />

        <TouchableOpacity
          style={{
            height: wid / 6.4,
            top: wid / 40.194,
            width: "100%",
            justifyContent: "flex-start",
            position: "absolute",
          }}
        >
          {!shouldShow ? (
            <FontAwesome
              name="arrow-left"
              style={{ color: "black" }}
              allowFontScaling={false}
              size={25}
            ></FontAwesome>
          ) : null}
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "pink",
          width: high / 2,
          height: wid / 2,
          top: wid / 1,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
