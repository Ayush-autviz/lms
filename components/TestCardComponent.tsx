import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../screens/Context/ContextProvider";
import { StackActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { baseUrl } from "../utils";
import moment from "moment-timezone";
import GeneralInstructionModal from "./modal/GeneralInstructionModal";

const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
const TestCardComponent = (props: any) => {
  const [mockTestSectionData, setmockTestSectionData] = useState<any>([]);
  const [runOnlyFirstTime, setRunOnlyFirstTime] = useState<boolean>(false);
  const { data, title, purchased, BuyCourse, courseBuyed } = props;
  const {
    id,
    isBuy,
    isReattempt,
    isDeleted,
    isResulted,
    isSubmitted,
    isView,
    mockTestId,
    studentId,
    mockTest,
  } = data;
  const [testDuration, setTestDuration] = useState<number>(mockTest.duration);

  const navigation = useNavigation();
  let currrentCourseData: any = {
    id: id,
    isReattempt: isReattempt,
    isSubmitted: isSubmitted,
    isView: isView,
    studentId: studentId,
    isBuy: isBuy,
    isResulted: isResulted,
    isDeleted: isDeleted,
    mockTestId: mockTestId,
  };

  const { isFree } = data.mockTest;

  const { access_token } = useStateContext();
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const start = async () => {
    const { id, isView } = currrentCourseData;
    if (isView) {
      Alert.alert(
        "Do you want to Resume the mocktest...!!",
        "If you select Yes It will resume the test otherwise If you select Cancel it will start again",
        [
          {
            text: "Resume",
            onPress: () => {
              currrentCourseData.isDeleted = "isResume";
              navigation.navigate("Test", {
                data: currrentCourseData,
              } as never);
            },
            style: "cancel",
          },
          { text: "Cancel", onPress: () => reattempt() },
        ]
      );
    } else {
      createUserMockTestAllSection();
      MarkIsView(id);
      navigation.navigate("Test", {
        data: currrentCourseData,
      } as never);
    }
  };

  const reattempt = () => {
    const { id, isSubmitted } = currrentCourseData;

    if (isSubmitted == true) {
      MarkIsSubmitted(id);
    }

    mockTestSectionData.forEach((element: any) => {
      updateUserMockTestSection(element);
    });

    currrentCourseData.isReattempt = "isReattempt";
    navigation.dispatch(
      StackActions.replace("Test", { data: currrentCourseData })
    );
  };

  const getTestSectionsWithoutUpdateTime = async () => {
    setRunOnlyFirstTime(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/services/app/MockTest/GetMockTestSection?mockTestId=${mockTestId}`,
        config
      );
      if (data.result.length != 0 && runOnlyFirstTime == false) {
        console.log("runs promise All");
        await Promise.all([createUserMockTestAllSection(data.result)]);
        data.result.map((_section: any) => {
          console.log(_section);
        });
        getTestSections();
        console.log("getTestSectionsWithoutUpdateTime", data);
      }
    } catch (error) {
      console.log("getTestSectionsWithoutUpdateTime", error);
    }
  };

  const getTestSections = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTestUserAns/GetUserMockTestSection?mocktestId=${mockTestId}&userId=${studentId}`,
        config
      );

      setRunOnlyFirstTime(true);
      console.log(res);
      if (res.data.result.length == 0) {
        getTestSectionsWithoutUpdateTime();
      } else {
        if (mockTest.duration == 0) {
          setTestDuration(
            res.data.result.reduce(
              (accumulator: number, curr_item: any) =>
                accumulator + curr_item.duration,
              0
            )
          );
        }

        setmockTestSectionData(res.data.result);
      }
    } catch (error) {
      console.log("mockSectionData failed", error);
    }
  };

  const createUserMockTestAllSection = async (allMockTestSection?: any[]) => {
    try {
      var config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": " application/json",
          "Abp-TenantId": "1",
        },
      };

      const data = allMockTestSection
        ? allMockTestSection
        : mockTestSectionData;
      const res = await axios.post(
        `${baseUrl}/api/services/app/MockTestUserAns/CreateUserMockTestAllSection`,
        data,
        config
      );
    } catch (error) {
      console.log("createUserMockTestAllSection", error);
    }
  };

  const MarkIsView = async (id: any) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/services/app/EnrollMockTest/MarkIsView?id=${currrentCourseData.id}`,
        config
      );
    } catch (error) {
      console.log("MarkView Api", error);
    }
  };
  const MarkIsSubmitted = async (id: any) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/services/app/EnrollMockTest/MarkIsSubmitted?id=${id}`,
        config
      );
    } catch (error) {
      console.log("MarkIsSubmitted", error);
    }
  };

  const updateUserMockTestSection = async (element: any) => {
    element.creationTime = moment();
    var config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": " application/json",
        "Abp-TenantId": "1",
      },
    };

    const data = JSON.stringify(element);
    try {
      const res = await axios.put(
        `${baseUrl}/api/services/app/MockTestUserAns/UpdateUserMockTestSection`,
        data,
        config
      );
      console.log("updatedTheSEctionTIme", res);
    } catch (error) {
      console.log("failer to update the time");
    }
  };
  useEffect(() => {
    if (!runOnlyFirstTime) {
      console.log("runs from here");
      getTestSections();
    }
  }, []);

  return (
    <View
      style={{
        alignSelf: "center",
        width: "92%",
        borderStyle: "dashed",
        borderColor: "#C9C17F",
        borderWidth: 1,
        borderRadius: 11,
        marginVertical: "2%",
      }}
    >
      <View
        style={[
          styles.MockTestCard,
          styles.paddingInContainer,
          {
            justifyContent: "space-between",
            marginTop: high / 71.16,
            width: "100%",
          },
        ]}
      >
        <Text
          allowFontScaling={false}
          style={{ fontSize: 14, fontFamily: "Poppins-Bold" }}
        >
          {title}
        </Text>
      </View>

      <View
        style={[
          styles.paddingInContainer,
          styles.MockTestCard,
          {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: high / 80,
            marginBottom: high / 50,
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <AntDesign name="clockcircleo" size={22} color="black" />
          <Text
            allowFontScaling={false}
            style={[styles.fontColor, { marginLeft: wid / 64 }]}
          >
            {!mockTest.duration ? testDuration : mockTest.duration} min
          </Text>
        </View>
        {isSubmitted == true && (
          <View style={{}}>
            <TouchableOpacity
              style={{
                marginRight: -wid / 10,
                paddingRight: -wid / 10,
                backgroundColor: "#319EAE",
                width: wid / 4,
                justifyContent: "center",
                alignContent: "center",
                height: high / 25.5,
                borderRadius: 4,
              }}
              onPress={() => {
                navigation.navigate("TestResult", {
                  id: mockTestId,
                } as never);
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: "white",
                  fontFamily: "Poppins-Regular",
                  fontSize: 12,
                  alignSelf: "center",
                }}
              >
                View Result
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!isSubmitted && (
          <View style={{}}>
            {!isBuy && !isFree && !purchased && !courseBuyed ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#e6e6e6",

                  width: wid / 4,
                  justifyContent: "center",
                  alignContent: "center",
                  height: high / 25.5,
                  borderRadius: 4,
                  alignItems: "center",
                }}
                onPress={() => BuyCourse()}
              >
                <FontAwesome name="lock" size={20} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "#e6e6e6",

                  width: wid / 4,
                  justifyContent: "center",
                  alignContent: "center",
                  height: high / 25.5,
                  borderRadius: 4,
                }}
              >
                <GeneralInstructionModal
                  name={title}
                  buttonTitle={
                    isView == true
                      ? "Resume"
                      : !isView && !purchased && isFree
                      ? "Free"
                      : "Start"
                  }
                  onPressFunction={start}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {isSubmitted == true && (
          <View style={{}}>
            <TouchableOpacity
              style={{
                backgroundColor: "#319EAE",
                width: wid / 4,
                justifyContent: "center",
                alignContent: "center",
                height: high / 25.5,
                borderRadius: 4,
                marginLeft:6,
              }}
            >
              <GeneralInstructionModal
                name={title}
                buttonTitle={"Re Attempt"}
                onPressFunction={reattempt}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default TestCardComponent;

const styles = StyleSheet.create({
  MockTestCard: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paddingInContainer: {
    paddingHorizontal: wid / 19.2,
  },
  textStyle: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  fontColor: {
    color: "#8A8A8A",
    fontFamily: "Poppins-Regular",
  },
});
