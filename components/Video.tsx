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
import RenderHtml from "react-native-render-html";
import { MyWebComponentFeed } from "./MyWebComponentFeed";
export default function VideoComponent(props: any) {
  const { description, title, fileName, creationTime } = props.item;
  let detail = description + "";

  const [readMore, setReadMore] = useState(detail.length > 50 ? true : false);
  const source = {
    html:
      description && readMore === true
        ? `${detail.trim().slice(0, 174)}`
        : `${detail.trim()}`,
  };

  return (
    <View>
      <View
        style={{
          width: "90%",
          padding: 16,
          marginTop: 8,
          marginBottom: high / 42.7,
          borderRadius: 20,
          borderWidth: 1.5,
          borderColor: "#E8E8E8",
          backgroundColor: "#FAFAFB",
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#FAFAFB",
            borderRadius: 20,
            justifyContent: "space-between",
            borderWidth: 0,
            alignSelf: "center",
            width: "100%",
          }}
        >
          <Text allowFontScaling={false} style={styles.cardText}>
            {title}
          </Text>
          <Image
            source={require("../assets/images/dots.png")}
            style={{ alignSelf: "center" }}
          />
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
          <MyWebComponentFeed youtube={getVideoId(fileName)} />
        </View>

        {/* <View style={{ padding: 0, margin: 0, backgroundColor: "#FAFAFB" }}>
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
