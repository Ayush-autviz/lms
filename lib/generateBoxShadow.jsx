import { StyleSheet, Platform } from "react-native";

export const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid
) => {
  const styles = StyleSheet.create({
    IosBoxShadow: {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    },
    AndroidBoxShadow: {
      elevation,
      shadowColor: shadowColorAndroid,
    },
  });
  if (Platform.OS === "ios") {
    return styles.IosBoxShadow;
  } else if (Platform.OS === "android") {
    return styles.AndroidBoxShadow;
  }
};
