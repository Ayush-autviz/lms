import React, { Fragment, useCallback, useState } from "react";

import {
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
} from "react-native";

const wid = Dimensions.get("window").width;
import {  FontAwesome } from "@expo/vector-icons";
import { horizontalScale  } from "../utils/metrics";
import { useNavigation } from "@react-navigation/native";
import { generateBoxShadowStyle } from "../lib/generateBoxShadow";

const high = Dimensions.get("window").height;
const shadow = generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");
const VideoCard = (props: any) => {
  const navigation = useNavigation();
  const {
    isBuy,
    videoUrl,
    title,
    videoId,
    
    BuyCourse,
    
    isFree,
    onCourseDetailPage,
  } = props;



 

  const navigateHandler = () => {
    isFree || isBuy
      ? navigation.navigate("Videos", { videoUrl: videoUrl } as never)
      : BuyCourse();
  };
  return (

    <Fragment>
      {onCourseDetailPage && !isFree && !isBuy ? (
        <TouchableOpacity
          onPress={() => navigateHandler()}
          style={{ marginBottom: 10 }}
        >
          <ImageBackground
            style={[styles.imageStyle, { borderColor: "grey" }]}
            imageStyle={{ borderRadius: 11, opacity: 0.7 }}
            source={{
              uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            }}
          >
            <Text
              adjustsFontSizeToFit={false}
              numberOfLines={1}
              style={styles.TextStyle}
            >
              {title}
            </Text>
            <FontAwesome
              style={{ alignSelf: "center", marginTop: "5%" }}
              name="lock"
              size={90}
              color="#e6e6e6"
            />
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigateHandler()}
          style={{ marginBottom: 10 }}
        >
          <ImageBackground
            style={[styles.imageStyle, { borderColor: "#F1F1F1" }]}
            imageStyle={{ borderRadius: 11 }}
            source={{
              uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            }}
          >
            <Text numberOfLines={1} style={styles.TextStyle}>
              {title}
            </Text>
            <FontAwesome
              style={{
                alignSelf: "center",
                marginTop: "8%",
              }}
              name="youtube-play"
              size={70}
              color="red"
            />
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  TextStyle: {
    paddingHorizontal: horizontalScale(13),
    color: "#fafafa",
    opacity: 0.8,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#000000",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  imageStyle: {
    borderRadiusTop: 11,
    borderWidth: 1,
    height: high / 5,
    width: wid / 1.35,
    borderRadius: 11,
    marginRight: 11,
  },
  textContainer: {
    opacity: 0.8,
    borderWidth: 1,
    borderRadiusTop: 11,

    backgroundColor: "#000000",
  },
});
export default VideoCard;
