import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

import { trimDate, getVideoId } from "../utils/Logics";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
const shadow = generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");
import RenderHtml from "react-native-render-html";
import { heightPercentageToDP } from "../lib/ResonsiveDimesions";
import { generateBoxShadowStyle } from "../lib/generateBoxShadow";
import { MyWebComponent } from "./MyWebComponent";

export default function VideoHome(props: any) {
  const { description,  title, fileName, creationTime } = props.item;
  let detail = description + "";
  const [readMore, setReadMore] = useState(detail.length > 50 ? true : false);
  const source = {
    html:
      description && readMore === true
        ? `${detail.trim().slice(0, 174)}`
        : `${detail.trim()}`,
  };

  return (
    <View
      style={{
        padding:15,
        paddingBottom:40,
        flexDirection: "column",
        marginBottom: 100,
        height: heightPercentageToDP(37.8),
        width: wid / 1,
        ...shadow,
        marginRight: wid / 12,
        borderColor: "#F1F1F1",
        borderRadius: 11,
        borderStyle: "solid",
        backgroundColor: "#FAFAFB",
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#FAFAFB",
          borderRadius: 20,
          justifyContent: "space-between",
          marginBottom:10,
          borderWidth: 0,
          alignSelf: "center",
          width: "100%",
        }}
      >
        <Text allowFontScaling={false} style={styles.cardText}>
          {title}
        </Text>
      </View>
      <Text
        allowFontScaling={false}
        style={{
          fontFamily: "Poppins-Bold",

          fontSize: 10,
          color: "#92A1B8",
          paddingHorizontal: 4,
        }}
      >
        {trimDate(creationTime)}
      </Text>
      <View>
        <MyWebComponent youtube={getVideoId(fileName)} />
      </View>

      {/* <View style={{ padding: 0, margin: 2, backgroundColor: "#FAFAFB" }}>
        {description != null && (
          <RenderHtml contentWidth={wid} source={source} />
        )}
        {description != null && (
          <TouchableOpacity
            style={{ marginTop: -2, padding: 0, backgroundColor: "#FAFAFB" }}
            onPress={() => {
              setReadMore(!readMore);
            }}
          >
            <Text
              style={{
                color: "#319EAE",
                fontSize: 14,
              }}
            >
              {readMore === true ? "... Read More" : "Read Less"}
            </Text>
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: wid / 1.2,
    height: wid / 2.4,
    borderRadius: 10,
    alignSelf: "center",
  },
  cardDesc: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardText: {
    fontFamily: "Poppins-Bold",
    fontSize: 17,
    fontWeight: "700",
    width: "80%",
    paddingHorizontal: 4,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
