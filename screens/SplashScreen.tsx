import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function SplashScreen() {
  return (
    <View>
      <Image
        style={styles.vectorIcon}
        resizeMode="cover"
        source={require("../assets/images/bg.png")}
      />
      <Image
        style={styles.decoratiom}
        resizeMode="cover"
        source={require("../assets/images/SplashScreenDecoration.png")}
      />
      <Image
        style={styles.groupIcon}
        resizeMode="cover"
        source={require("../assets/images/logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  vectorIcon: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  groupIcon: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 100,
    overflow: "hidden",
  },
  decoratiom: {
    top: "-1%",
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    backgroundColor: "transparent",
    height: "100%",
  },
  container: {
    justifyContent: "center",
    flex: 1,
  },
});
