import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React    from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  View,
  Text,
  ScrollView,
} from "react-native";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function CurrentAffairs(props: any) {
  const { title,  image } = props.item;
  return (
    <ScrollView
      style={{
        paddingVertical: wid / 50,
        backgroundColor: "#FAFAFB",
      }}
      contentContainerStyle={{ justifyContent: "flex-start" }}
    >
      {image ? (
        <TouchableOpacity
          style={styles.topicCntr}
          onPress={() =>
            props.navigation.navigate("Affairs", {
              item: props.item,
            })
          }
        >
          <View
            style={{
              backgroundColor: "#FAFAFB",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                backgroundColor: "transparent",
                width: wid / 5.4,
                height: 60,
              }}
              source={{ uri: `${image}` }}
            ></Image>
          </View>
          <View
            style={{
              paddingVertical: high / 180,
              width: wid / 2,
              flexDirection: "column",
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                textAlignVertical: "center",
                backgroundColor: "transparent",
                marginVertical: 2,
                fontFamily: "Poppins-Bold",
                fontSize: 16,
              }}
            >
              {title}
            </Text>
          </View>
          <AntDesign name="right" size={28} color="black" />
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontFamily: "Poppins-Regular",
    left: wid / 50,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topicCntr: {
    marginHorizontal: "5%",
    flexDirection: "row",
    borderRadius: 11,
    justifyContent: "space-between",
    paddingVertical: wid / 50,
    paddingHorizontal: wid / 40,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#F1F1F1",
    width: "90%",
    backgroundColor: "#FAFBFA",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
