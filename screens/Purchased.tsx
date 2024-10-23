import { Fragment, useEffect, useState } from "react";
import React from "react";
import { StyleSheet, ScrollView, FlatList, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { TouchableOpacity, Image, Dimensions } from "react-native";

import VideoCard from "../components/VideoCard";
import { checkArrayIsEmpty, getVideoId } from "../utils/Logics";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";
import SelectDropdown from "react-native-select-dropdown";
import { getSyllabus } from "../api/SubjectService";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import TestCardComponent from "../components/TestCardComponent";
import { heightPercentageToDP } from "../lib/ResonsiveDimesions";
import { deleteData } from "../api/SubjectService/sever";
import { generateBoxShadowStyle } from "../lib/generateBoxShadow";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function Purchased(props: any) {
  const [courseData, setCourseData] = useState<any>([]);
  const [videoData, setVideoData] = useState<any>([]);
  const [courseType, setCourseType] = useState<any>();
  const [currSubjectName, setCurrSubjectName] = useState<any>();
  const [subjectName, setSubjectName] = useState([]);
  const { access_token, userDetail } = useStateContext();
  const Courseid = props.route.params.id;
  const [currrentCourseData, SetCurrrentCourseData] = useState<any>([]);
  const [TestRefresh, setTestRefresh] = useState<string>("");
  const [res, setRes] = useState("Notes");

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
        onPress={() => setRes("Notes")}
        style={{
          backgroundColor: res == "Notes" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Notes" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRes("Videos")}
        style={{
          backgroundColor: res == "Videos" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Videos" ? "white" : "black",
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
        onPress={() => setRes("Notes")}
        style={{
          backgroundColor: res == "Notes" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Notes" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRes("Mock Tests")}
        style={{
          backgroundColor: res == "Mock Tests" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Mock Tests" ? "white" : "black",
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
  var hrbrid = (
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
        onPress={() => setRes("Notes")}
        style={{
          backgroundColor: res == "Notes" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: "33.4%",
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Notes" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRes("Videos")}
        style={{
          backgroundColor: res == "Videos" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: "33.4%",
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Videos" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Videos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRes("Mock Tests")}
        style={{
          backgroundColor: res == "Mock Tests" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: "33.4%",
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Mock Tests" ? "white" : "black",
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

  useFocusEffect(
    React.useCallback(() => {
      getCourseDetails(access_token, Courseid);
    }, [props.navigate])
  );
  useEffect(() => {
    setCurrSubjectName(null);
  }, [res]);
  const [isTrue, setIsTrue] = useState(true);
  const createCourseMockTest = async (id: number, mockTestId: number) => {
    let payload = {
      courseManagementId: `${id}`,
      studentId: userDetail.id,
      mockTestId: mockTestId,
    };
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/EnrollMockTest/CreateCourseMockTest`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Abp-TenantId": "1",
      },
      data: payload,
    };

    await axios(config)
      .then(function (response: any) {})
      .catch(function (error: any) {
        console.log("Create MockTest Failed", error);
      });
  };
  const getCourseDetails = async (token: any, id: any) => {
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/CourseManagementAppServices/GetStudentCourse?id=${Courseid}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        const seen: any = new Set([]);
        console.log("resr", response.data.result.videos);
        setSubjectName(
          response?.data?.result?.videos
            .map(({ subject }: any) => {
              if (
                !seen.has(subject.subjectName) &&
                seen.add(subject.subjectName)
              )
                return subject;
            })
            .filter(Boolean)
        );
        setVideoData(response.data.result.videos);
        setCourseType(response.data.result.type);
        if (
          response?.data?.result?.notes?.length == 0 &&
          response.data.result.type == "Mock"
        ) {
          setRes("Mock Tests");
        } else if (response.data.result.type == "Hybrid") {
          setRes("Videos");
        } else {
          setRes("Notes");
        }
        setCourseData(response.data.result);
        getEnrollMockTestByUserIdAndCouresId(
          response.data.result.mockTests,
          response.data.result.id
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const headers: any = {
    Authorization: `Bearer ${access_token}`,
    "Abp-TenantId": "1",
  };
  const getEnrollMockTestByUserIdAndCouresId = async (
    CoursemockTests?: any | null,
    courseMngId?: any
  ) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/EnrollMockTest/GetEnrolledMockTestByUserIdAndCourseId?userId=${userDetail.id}&courseId=${Courseid}`,
        headers
      );

      SetCurrrentCourseData(res.data.result);
      if (CoursemockTests) {
        // finding newAdded mocktest by admin
        const newAddedMocktest = CoursemockTests?.filter(
          (item: any) =>
            !res.data.result.some((_item: any) => _item.mockTestId === item.id)
        );

        // finding deleted mocktest by admin
        const deletedMockTest = res?.data?.result?.filter(
          (item: any) =>
            !CoursemockTests.some((_item: any) => _item.id === item.mockTestId)
        );

        if (newAddedMocktest || deletedMockTest) {
          // created newmocktest if newMocktest added
          await Promise.all(
            newAddedMocktest.map(async (element: any) => {
              await createCourseMockTest(courseMngId, element.id);
            })
          );
          // Deleting mocktest if newMocktest deleted by admin
          await Promise.all(
            deletedMockTest?.map(async (element: any) => {
              await deleteData(
                "/api/services/app/EnrollMockTest/Delete",
                element.id
              );
            })
          );
          // for newMockt Test (its run only if newAddedMockTest || for deleting mocktest ) 1 time only
          getEnrollMockTestByUserIdAndCouresId();
        }
      }
    } catch (error) {
      console.log("GetEnrolledMockTestByUserIdAndMockTestId", error);
    }
    setIsTrue(false);
  };
  const filterData = (subject_Id: number) => {
    setVideoData(
      courseData.videos.filter((item: any) => item.subjectId == subject_Id)
    );
    setCurrSubjectName(subject_Id);
  };

  return !isTrue ? (
    <View style={{ backgroundColor: "#FAFAFB", flex: 1, height: high }}>
      <View
        style={{
          backgroundColor: "#FAFAFB",
        }}
      >
        <View
          style={{
            width: wid,
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#FAFAFB",
          }}
        >
          {courseData.imagePath ? (
            <Image
              source={{ uri: courseData.imagePath }}
              style={{
                width: "80%",
                top: 10,
                height: high / 3.27,
                borderRadius: 10,
                alignSelf: "center",
                resizeMode: "contain",
              }}
            ></Image>
          ) : (
            <Image
              style={{
                width: "80%",
                top: 10,
                height: high / 3.27,
                borderRadius: 10,
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={require("../assets/images/bigEnglish.png")}
            />
          )}
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 20,
              alignSelf: "flex-start",
              left: wid / 12.8,
              top: high / 50.46,
            }}
          >
            {courseData.name}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              top: high / 45.46,
              alignSelf: "flex-start",
              left: wid / 12.8,
              width: "90%",
              fontSize: 13,
              fontFamily: "Poppins-Regular",
              backgroundColor: "#FAFAFB",
            }}
          >
            {courseData.detail}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FAFAFB",
            height: "100%",
            marginTop: 30,
          }}
        >
          <View style={{ backgroundColor: "#FAFAFB" }}>
            {courseType == "Mock"
              ? Mock
              : courseType == "Hybrid"
              ? hrbrid
              : Video}
          </View>

          <View
            style={{
              height: heightPercentageToDP(44.5),
              backgroundColor: "transparent",
            }}
          >
            {res == "Mock Tests" && (
              <Fragment>
                {currrentCourseData?.length != 0 ? (
                  <FlatList
                    data={currrentCourseData}
                    renderItem={({ item, index }) => (
                      <TestCardComponent
                        key={index}
                        title={item.mockTest.title}
                        data={item}
                        setTestRefresh={setTestRefresh}
                        purchased={true}
                      />
                    )}
                  />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Poppins-Medium",
                      fontSize: 16,
                      marginTop: high / 20,
                    }}
                  >
                    No MockTest Available
                  </Text>
                )}
              </Fragment>
            )}
            {res == "Notes" && (
              <ScrollView
                style={{
                  marginBottom: 100,
                  width: wid,
                }}
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {courseData.notes?.map((e: any, idx: number) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        props.navigation.navigate("Web", {
                          id: `${e.id}`,
                        })
                      }
                      style={styles.topicCntr}
                    >
                      <Text
                        style={{ fontFamily: "Poppins-Medium", fontSize: 16 }}
                      >
                        {e.title}
                      </Text>
                      <FontAwesome5
                        name="file-download"
                        size={25}
                        color="#319EAE"
                      />
                    </TouchableOpacity>
                  );
                })}
                {courseData?.notes?.length == 0 && (
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Poppins-Medium",
                      fontSize: 16,
                      marginTop: high / 20,
                    }}
                  >
                    No Notes Available
                  </Text>
                )}
              </ScrollView>
            )}
            {res == "Videos" && (
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  width: wid,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!checkArrayIsEmpty(courseData.videos) && (
                  <SelectDropdown
                    // defaultValue={"Select Subject"}
                    buttonStyle={{
                      width: wid / 2,
                      height: 40,
                      marginTop: 0,
                      borderRadius: 40,
                      marginBottom: 10,
                      backgroundColor: "#319EAE",
                    }}
                    defaultButtonText={"Subjects"}
                    searchPlaceHolder="Subjects"
                    dropdownStyle={{
                      backgroundColor: "#fff",
                      marginTop: -42,
                      borderRadius: 12,
                    }}
                    rowTextStyle={{
                      fontSize: 13,
                      fontFamily: "Poppins-Regular",
                    }}
                    buttonTextStyle={{
                      fontSize: 13,
                      color: "#FFF",
                      fontFamily: "Poppins-Regular",
                    }}
                    data={subjectName}
                    onSelect={(selectedItem, index) => {
                      setCurrSubjectName(selectedItem.id);
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.subjectName;
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.subjectName;
                    }}
                  />
                )}
                <FlatList
                  style={{ marginBottom: 3, backgroundColor: "transparent" }}
                  showsVerticalScrollIndicator={false}
                  data={videoData}
                  renderItem={({ item }) => (
                    <VideoCard
                      key={item.id}
                      videoUrl={item.videoUrl}
                      title={item.title}
                      isFree={true}
                      purchased={true}
                      videoId={getVideoId(item.videoUrl)}
                      navigation={props.navigation}
                    />
                  )}
                />

                {checkArrayIsEmpty(courseData.videos) && (
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Poppins-Medium",
                      fontSize: 16,
                      marginTop: high / 20,
                    }}
                  >
                    No Videos Available
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  ) : (
    <>
      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          height: high,
          backgroundColor: "transparent",
        }}
      >
        <ActivityIndicator size="large" color="#319EAE" />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  loader: {
    top: high / 2,
  },
  topicCntr: {
    flexDirection: "row",
    marginTop: wid / 18.4,
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
