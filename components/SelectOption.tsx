import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
const SelectOption = ({
  currentSelection,
  SetCurrentSelection,
  courseType,
}: any) => {
  var Video = (
    <View
      style={{
        flexDirection: "row",
        width: wid / 1.2,
        height: high / 17,
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 116,
        borderWidth: 0.5,
        borderColor: "#EEEEEE",
        backgroundColor: "#FAFAFB",
      }}
    >
      <TouchableOpacity
        onPress={() => SetCurrentSelection("Notes")}
        style={{
          backgroundColor: currentSelection == "Notes" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: currentSelection == "Notes" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => SetCurrentSelection("Videos")}
        style={{
          backgroundColor: currentSelection == "Videos" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: currentSelection == "Videos" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Videos
        </Text>
      </TouchableOpacity>
    </View>
  );
  var Mock = (
    <View
      style={{
        flexDirection: "row",
        width: wid / 1.2,
        height: high / 17,
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 116,
        borderWidth: 0.5,
        borderColor: "#EEEEEE",
        backgroundColor: "#FAFAFB",
      }}
    >
      <TouchableOpacity
        onPress={() => SetCurrentSelection("Notes")}
        style={{
          backgroundColor: currentSelection == "Notes" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: currentSelection == "Notes" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => SetCurrentSelection("Mock Tests")}
        style={{
          backgroundColor:
            currentSelection == "Mock Tests" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: currentSelection == "Mock Tests" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Mock Tests
        </Text>
      </TouchableOpacity>
    </View>
  );
  var hybrid = (
    <View
      style={{
        flexDirection: "row",
        width: "90%",
        height: high / 17,
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 116,
        borderWidth: 0.5,
        borderColor: "#EEEEEE",
        backgroundColor: "#FAFAFB",
      }}
    >
      <TouchableOpacity
        onPress={() => SetCurrentSelection("Notes")}
        style={{
          backgroundColor: currentSelection == "Notes" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: "33.4%",
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: currentSelection == "Notes" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => SetCurrentSelection("Videos")}
        style={{
          backgroundColor: currentSelection == "Videos" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: "33.4%",
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: currentSelection == "Videos" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Videos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => SetCurrentSelection("Mock Tests")}
        style={{
          backgroundColor:
            currentSelection == "Mock Tests" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: "33.4%",
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: currentSelection == "Mock Tests" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Mock Tests
        </Text>
      </TouchableOpacity>
    </View>
  );
  return courseType == "Mock" ? Mock : courseType == "Hybrid" ? hybrid : Video;
};

export default SelectOption;
