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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StackActions } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { trimDate } from "../utils/Logics";
import { baseUrl } from "../utils";
import moment from "moment";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
const TestCard = (props: any) => {
  const { name, startTime, id, price } = props;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [currrentCourseData, SetCurrrentCourseData] = useState<any>({});
  const [duration, Setduration] = useState("");
  const [mockTestSectionData, setmockTestSectionData] = useState<any>([]);
  const { userDetail, access_token } = useStateContext();
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const start = async (data: any) => {
    const { id, isView } = data;
    GetUserMockTestSection();
    if (isView) {
      Alert.alert(
        "Do you want to Resume the  mocktest...!!",
        "If you select Yes It will resume the test otherwise If you select Cancel it will start again",
        [
          {
            text: "Resume",
            onPress: () => {
              navigation.navigate("Test", {
                data: currrentCourseData,
              } as never);
            },
            style: "cancel",
          },
          { text: "Cancel", onPress: () => reattempt(currrentCourseData) },
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
  const reattempt = (data: any) => {
    const { id, isSubmitted } = data;
    if (isSubmitted == true) {
      MarkIsSubmitted(id);
    }
    mockTestSectionData?.forEach((element: any) => {
      element.creationTime = moment();
    });
    updateUserMockTestSection(mockTestSectionData[0]);
    navigation.dispatch(StackActions.replace("Test"), {});
    navigation.navigate("Test");
  };
  useEffect(() => {
    getEnrollMockTestByUserIdAndCouresId();

    getMockTestDuartion();
  }, []);
  const headers: any = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };
  const getMockTestDuartion = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTest/Get?Id=${id} `,
        headers
      );
      if (res.data.result != null) {
        Setduration(res.data.result.duration);
      }
      setLoading(false);
    } catch (error) {
      console.log("GetEnrolledMockTestByUserIdAndMockTestId", error);
    }
  };

  const getEnrollMockTestByUserIdAndCouresId = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/EnrollMockTest/GetEnrolledMockTestByUserIdAndMockTestId?userId=${userDetail.id}&mockTestId=${id} `,
        headers
      );
      if (res.data.result != null) {
        SetCurrrentCourseData(res.data.result);
        console.log("User TEST SECTION", res.data.result);
      }
      setLoading(false);
    } catch (error) {
      console.log("GetEnrolledMockTestByUserIdAndMockTestId", error);
    }
  };
  const GetUserMockTestSection = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/services/app/MockTestUserAns/GetUserMockTestSection?mocktestId=${id}&userId=${userDetail.id}`,
        config
      );
      if (mockTestSectionData.length < 1) setmockTestSectionData(data.result);

      console.log("GetUserMockTestSection APi HIT SUCCESS", data);
    } catch (error) {
      console.log(error, "GetUserMockTestSection");
    }
  };
  const createUserMockTestAllSection = async () => {
    try {
      var config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": " application/json",
          "Abp-TenantId": "1",
        },
      };

      const data = JSON.stringify(mockTestSectionData);
      const res = await axios.post(
        `${baseUrl}/api/services/app/MockTestUserAns/CreateUserMockTestAllSection`,
        data,
        config
      );
      console.log("createUserMockTestAllSection API hit true", res);
    } catch (error) {
      console.log("createUserMockTestAllSection", error);
    }
  };

  const MarkIsView = async (id: any) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/services/app/EnrollMockTest/MarkIsView?id=${id}`,
        config
      );
      console.log("isView API hit Success");
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
      console.log("MarkIsSubmitted Api Hit Sucees");
    } catch (error) {
      console.log("MarkIsSubmitted", error);
    }
  };

  const updateUserMockTestSection = async (element: any) => {
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
      console.log("UpdateUserMockTestSection Api HIT Suceess");
    } catch (error) {
      console.log("UpdateUserMockTestSection", error);
    }
  };
  return (
    <>
      {loading == false && (
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
              {name}
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
              {price ? (
                <>
                  <FontAwesome name="rupee" size={18} color="black" />
                  <Text
                    allowFontScaling={false}
                    style={[styles.fontColor, { marginLeft: wid / 64 }]}
                  >
                    {price}
                  </Text>
                </>
              ) : (
                <>
                  <AntDesign name="clockcircleo" size={20} color="#8A8A8A" />
                  {startTime ? (
                    <Text
                      allowFontScaling={false}
                      style={[styles.fontColor, { marginLeft: wid / 64 }]}
                    >
                      {trimDate(startTime)}
                    </Text>
                  ) : (
                    <Text
                      allowFontScaling={false}
                      style={[styles.fontColor, { marginLeft: wid / 64 }]}
                    >
                      {duration} min
                    </Text>
                  )}
                </>
              )}
            </View>
            {currrentCourseData.isSubmitted == true && (
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
                      id: currrentCourseData.mockTestId,
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
            {!currrentCourseData.isSubmitted && (
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#319EAE",

                    width: wid / 4,
                    justifyContent: "center",
                    alignContent: "center",
                    height: high / 25.5,
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    start(currrentCourseData);
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
                    {currrentCourseData.isView == false ? "Start" : "Resume"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {currrentCourseData.isSubmitted == true && (
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#319EAE",
                    width: wid / 4,
                    justifyContent: "center",
                    alignContent: "center",
                    height: high / 25.5,
                    borderRadius: 4,
                    marginLeft:6
                  }}
                  onPress={() => {
                    reattempt(currrentCourseData);
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
                    Re Attempt
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default TestCard;

const styles = StyleSheet.create({
  MockTestCard: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paddingInContainer: {
    paddingHorizontal: wid / 19.2,
  },
  fontColor: {
    color: "#8A8A8A",
    fontFamily: "Poppins-Regular",
  },
});
