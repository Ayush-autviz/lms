import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Linking, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { trimDate, trimText } from "../utils/Logics";
import Collapsible from "react-native-collapsible";
import { btnshadow } from "./EnrolledCourse";
import { StyleSheet } from "react-native";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function NotificationBox({ data }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  function extractInnerText(htmlString: string) {
    const strippedText = htmlString?.replace(/<[^>]+>/g, "");
    return strippedText;
  }
  console.log(data?.description?.length, "dis length");
  return (
    <TouchableOpacity key={Math.random() * 100} style={styles.topicCntr}>
      <View
        style={{
          alignSelf: "flex-start",
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: 1.5,
          width: wid / 1.4,
          backgroundColor: "transparent",
        }}
      >
        <Text allowFontScaling={false} style={styles.cardText}>
          {data.nameOfJob}
        </Text>
        <Text allowFontScaling={false} style={styles.number}>
          {isCollapsed &&
            data.description &&
            extractInnerText(trimText(data.description))}
        </Text>
        <Collapsible collapsed={isCollapsed}>
          <Text allowFontScaling={false} style={styles.number}>
            {extractInnerText(data.description)}
          </Text>
        </Collapsible>

        {data?.description?.length > 55 && (
          <Text
            onPress={() => setIsCollapsed((s) => !s)}
            style={{ color: "black" }}
          >
            {isCollapsed ? "Read more" : "Read less"}
          </Text>
        )}
        <View style={{ flex: 1, flexDirection: "row",backgroundColor:"transparent" }}>
          <TouchableOpacity
            onPress={() => {
              !data.notesUrl || data.notesUrl == null
                ? alert("Link Not Available")
                : Linking.openURL(data.notesUrl);
            }}
            style={{
              backgroundColor: "#319EAE",
              borderRadius: 20,
              marginRight: 10,
              marginBottom: 10,
              marginTop: 10,
              width: wid / 5.5,
              height: high / 30,
              alignItems: "center",
              justifyContent: "center",
              ...btnshadow,
            }}
          >
            <Text style={{ color: "white" }}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              !data.link || data.link == null
                ? alert("Link Not Available")
                : Linking.openURL(data.link);
            }}
            style={{
              backgroundColor: "#319EAE",
              borderRadius: 20,
              marginBottom: 10,
              marginTop: 10,
              width: wid / 5.5,
              height: high / 30,
              alignItems: "center",
              justifyContent: "center",
              ...btnshadow,
            }}
          >
            <Text style={{ color: "white" }}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
            alignItems: "center",
            alignSelf: "flex-start",
            marginTop: 1.5,
          }}
        >
          <FontAwesome name="eye" size={10} style={{ color: "#8A8A8A" }} />
          <Text
            style={{
              marginLeft: 5,
              color: "#8A8A8A",
              marginTop: 1.5,
              backgroundColor: "transparent",
            }}
          >
            {data.startDate && trimDate(data.startDate)}
          </Text>
          <Text
            style={{
              color: "#8A8A8A",
              marginTop: 1.5,
              marginLeft: 8,
              backgroundColor: "transparent",
            }}
          >
            {data.lastDate && trimDate(data.lastDate)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  searchBarContainer: {
    marginTop: high / 56.933,
    backgroundColor: "#FAFAFB",
    flexDirection: "row",
  },
  image: {
    width: wid / 5.4,
    height: wid / 5.4,
    borderRadius: 10,
    alignSelf: "center",
    // right: wid/8.8,
    // bottom: 15
  },
  number: {
    marginTop: 1.5,
    backgroundColor: "transparent",
    fontFamily: "Poppins-Regular",
    textAlign: "left",
    fontSize: 12,
    color: "#858585",
  },
  cardText: {
    textAlign: "left",

    fontFamily: "Poppins-Medium",
    fontSize: 15,
  },
  topicCntr: {
    flexDirection: "row",
    marginBottom: wid / 38.4,
    borderRadius: 11,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    borderStyle: "dotted",
    justifyContent: "space-between",
    borderColor: "#C9C17F",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: wid / 1.1,
    backgroundColor: "#FAFAFB",
  },
});
