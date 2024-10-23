import React, { useState } from "react";

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity, Image, Dimensions } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import RazorpayCheckout from "react-native-razorpay";
import { useStateContext } from "./Context/ContextProvider";

import { baseUrl } from "../utils";
import axios from "axios";

import { calcValidity, checkArrayIsEmpty, getVideoId } from "../utils/Logics";

import SelectOption from "../components/SelectOption";
import TestCardComponent from "../components/TestCardComponent";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import VideoCard from "../components/VideoCard";
import SelectDropdown from "react-native-select-dropdown";

import { deleteData } from "../api/SubjectService/sever";
import moment from "moment";
import { Status } from "../types";
import { heightPercentageToDP } from "../lib/ResonsiveDimesions";

const wid = Dimensions.get("window").width;

const high = Dimensions.get("window").height;

function CourseDetails(props: any) {
  const { userDetail, setRefresh, access_token, setTestRefresh } =
    useStateContext();

  const [currentSelection, SetCurrentSelection] = useState("Notes");
  const [showMore, setShowMore] = useState<number>(5);
  const [courseData, setCourseData] = useState<any>([]);
  const [buttonValue, setButtonValue] = useState<boolean>(false);
  const [courseType, setCourseType] = useState();

  const [subjectName, setSubjectName] = useState<any[]>([]);
  const [mockTestData, setMockTestData] = useState<any>([]);
  const [filterVideo, setFilteredVideos] = useState<any>([]);
  const [topic, setTopic] = useState<any>([]);
  const [videos, setVideos] = useState([]);
  const [videosForTopicFilter, setVideoForTopicFilter] = useState();

  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [topicDropData, setTopicDropData] = useState([]);
  const { data, Courseid } = props.route.params;

  const navigation = useNavigation();

  const filterVideosforCurrSelection = (
    value: string | number,
    filterFor: string
  ) => {
    setShowMore(5);

    console.log(value);

    if (value == "All Topics") {
      setFilteredVideos(videos);

      return;
    }

    if (filterFor === "subject")
      setFilteredVideos(videos.filter((item: any) => value == item?.subjectId));
    else {
      setFilteredVideos(
        videos.filter((item: any) => value == item?.topicsName)
      );
    }
  };

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };

  const BuyCourse = (mockTestIndex?: number) => {
    var options = {
      description: "Credits towards Coures",

      image:
        "https://firebasestorage.googleapis.com/v0/b/asdf-60b71.appspot.com/o/MicrosoftTeams-image%20(1).png?alt=media&token=da02bf77-0614-42d8-a53c-a01d3df11413",
      currency: "INR",

      key: "rzp_live_053g5CxcjSsXJW",

      amount: data.price * 100,

      name: "Teacher's Vision",

      prefill: {
        email: userDetail.emailAddress,
        contact: "",
        name: userDetail.name,
      },
      theme: { color: "#319EAE" },
    };

    RazorpayCheckout.open(options as any)

      .then((response: any) => {
        const { razorpay_payment_id } = response;

        createPayment("Success", razorpay_payment_id);

        setRefresh(new Date().getTime());

        setButtonValue(true);

        createEnrollementCoures(mockTestIndex);
      })

      .catch((error: any) => {
        console.log(error);
        const { payment_id } = error.error.metadata;

        createPayment("Failed", payment_id);

        console.log(error);

        alert(
          `Payment Failed if Money deducted from your account.Please Contact Admin`
        );
      });
  };

  const createEnrollementCoures = async (mockTestIndex?: number) => {
    let payload = JSON.stringify({
      studentId: userDetail.id,
      courseManagementId: Courseid,
    });

    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/EnrollCourses/CreateEnrollCourse`,
      headers,
      data: payload,
    };

    await axios(config)
      .then(function (response: any) {
        setButtonValue(true);
        if (mockTestIndex) {
          mockTestData[mockTestIndex].isBuy = true;
        }
      })

      .catch(function (error: any) {
        console.log("Create Enroll Failed", error);
      });
  };

  const getCourseDetails = async (token: any) => {
    let payload = "";
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/CourseManagementAppServices/GetStudentCourse?id=${Courseid}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Abp-TenantId": 1,
      },
      data: payload,
    };

    await axios(config)
      .then(function (response: any) {
        setVideoForTopicFilter(
          response?.data?.result?.videos.map((item: any) => item.topicsName)
        );
        setButtonValue(
          response.data.result.isBuy || response.data.result.price === 0
        );
        const seen: any = new Set([]);
        const seenTopic: any = new Set([]);
        seenTopic.add({ topicsName: "All Topics" });
        console.log("subjectVideo", response?.data?.result?.videos);

        let uniqueSubjects = response?.data?.result?.videos
          .map((item: any) => {
            if (item?.topicsName && !seenTopic.has(item?.title)) {
              seenTopic.add(item);
            }
            if (!seen.has(item?.subjectName) && seen.add(item?.subjectName))
              return { subjectName: item?.subjectName, id: item?.subjectId };
          })
          .filter(Boolean);
        setTopic([...seenTopic]);

        setSubjectName([
          { subjectName: "All Subjects", id: "All Topics" },
          ...uniqueSubjects,
        ]);
        setCourseData(response.data.result);

        setFilteredVideos(response?.data?.result?.videos);
        setVideos(response?.data?.result?.videos);
        setCourseType(response.data.result.type);

        if (
          response?.data?.result?.notes?.length == 0 &&
          response.data.result.type == "Mock"
        ) {
          SetCurrentSelection("Mock Tests");
        } else if (response.data.result.type == "Hybrid") {
          SetCurrentSelection("Videos");
        } else {
          SetCurrentSelection("Notes");
        }
        getEnrollMockTestByUserIdAndCouresId(
          response.data.result?.mockTests,
          response.data.result?.id
        );
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  const createPayment = async (status: Status, razorpay_payment_id: string) => {
    var payload = {
      couragementId: Courseid,
      name: userDetail.name,
      testName: "string",
      date: moment(),
      paymentType: "Online",
      purchaseTitle: data.name,
      price: data.price,
      paymentStatus: status,
      courseDescription: data.detail,
      emailAddress: userDetail.emailAddress,
      transactionID: razorpay_payment_id,
    };

    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/Payment/CreatePayment`,
      headers,
      data: payload,
    };

    await axios(config)
      .then(function (response: any) { })
      .catch(function (error: any) {
        console.log("create payment APi", error);
      });
  };

  const getEnrollMockTestByUserIdAndCouresId = async (
    CoursemockTests?: any | null,
    courseMngId?: any
  ) => {
    const headers: any = {
      Authorization: `Bearer ${access_token}`,
    };
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/EnrollMockTest/GetEnrolledMockTestByUserIdAndCourseId?userId=${userDetail.id}&courseId=${Courseid}`,
        headers
      );

      setMockTestData(res.data.result);

      if (CoursemockTests) {
        const newAddedMocktest = CoursemockTests?.filter(
          (item: any) =>
            !res.data.result.some((_item: any) => _item.mockTestId === item.id)
        );

        const deletedMockTest = res.data?.result?.filter(
          (item: any) =>
            !CoursemockTests.some((_item: any) => _item.id === item.mockTestId)
        );

        if (newAddedMocktest || deletedMockTest) {
          await Promise.all(
            newAddedMocktest.map(async (element: any) => {
              await createCourseMockTest(courseMngId, element.id);
            })
          );

          await Promise.all(
            deletedMockTest?.map(async (element: any) => {
              await deleteData(
                "/api/services/app/EnrollMockTest/Delete",
                element.id
              );
            })
          );
          getEnrollMockTestByUserIdAndCouresId();
        }
      }
    } catch (error) {
      console.log("GetEnrolledMockTestByUserIdAndMockTestId", error);
    }
  };

  const createCourseMockTest = async (id: string, mockTestId: number) => {
    let payload = {
      studentId: userDetail.id,
      mockTestId: mockTestId,
      courseManagementId: id,
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
      .then(function (response: any) { })
      .catch(function (error: any) {
        console.log("Create MockTest Failed", error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getCourseDetails(access_token);

      getEnrollMockTestByUserIdAndCouresId();
    }, [])
  );
  const getTopicBySubjectId = async (id: any) => {
    const headers: any = {
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/Topics/GetTopicsBySubject?subjectId=${id}`,
        headers
      );

      setTopicDropData(res.data.result);
    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, marginBottom: heightPercentageToDP(1) }}
    >
      <View
        style={{
          alignItems: "center",
          marginTop: high / 30,
        }}
      >
        {data.imagePath ? (
          <Image
            source={{ uri: data.imagePath }}
            style={{
              width: wid / 1.12,
              height: high / 3,
              borderRadius: 10,
              resizeMode: "contain",
              backgroundColor: "transparent",
            }}
          ></Image>
        ) : (
          <Image
            source={require("../assets/images/bigEnglish.png")}
            style={{
              width: wid / 1.12,
              height: high / 3,
              borderRadius: 10,
              resizeMode: "contain",
              backgroundColor: "transparent",
            }}
          ></Image>
        )}
      </View>
      <View style={{ marginTop: 10, paddingHorizontal: wid / 18 }}>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 22,
            marginTop: high / 60,
          }}
        >
          {data.name}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "Poppins-Regular",
          }}
        >
          {data.detail}
        </Text>
      </View>
      <View style={{ marginBottom: high / 30, marginTop: high / 80 }}>
        <SelectOption
          courseType={courseType}
          SetCurrentSelection={SetCurrentSelection}
          currentSelection={currentSelection}
        />
      </View>

      <View>
        {currentSelection == "Mock Tests" && (
          <ScrollView
            style={{
              marginBottom: 20,
              backgroundColor: "transparent",
            }}
          >
            {mockTestData?.map((item: any, idx: any) => {
              return (
                <TestCardComponent
                  key={idx}
                  index={idx}
                  courseBuyed={buttonValue}
                  title={item.mockTest.title}
                  data={item}
                  setTestRefresh={setTestRefresh}
                  BuyCourse={BuyCourse}
                />
              );
            })}
            {mockTestData.length == 0 && (
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  marginTop: high / 50,
                  marginBottom: !buttonValue ? heightPercentageToDP(5) : 0,
                }}
              >
                No MockTest Available
              </Text>
            )}
          </ScrollView>
        )}
        {currentSelection == "Notes" && (
          <ScrollView
            style={{
              marginBottom: 20,
              width: wid,
            }}
            contentContainerStyle={{}}
          >
            {courseData.notes?.map((e: any, idx: number) => {
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() =>
                    buttonValue
                      ? props.navigation.navigate("Web", {
                        id: `${e.id}`,
                      })
                      : BuyCourse()
                  }
                  style={styles.topicCntr}
                >
                  <Text style={{ fontFamily: "Poppins-Medium", fontSize: 16 }}>
                    {e.title}
                  </Text>
                  {buttonValue ? (
                    <FontAwesome5
                      name="file-download"
                      size={25}
                      color="#319EAE"
                    />
                  ) : (
                    <FontAwesome name="lock" size={24} color="black" />
                  )}
                </TouchableOpacity>
              );
            })}
            {courseData?.notes?.length == 0 && (
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  marginTop: high / 50,
                  marginBottom: !buttonValue ? 0 : heightPercentageToDP(5),
                }}
              >
                No Notes Available
              </Text>
            )}
          </ScrollView>
        )}
        {currentSelection == "Videos" ? (
          <ScrollView
            style={{
              marginBottom: 20,
              width: wid,
            }}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: wid,
                paddingHorizontal: wid / 7,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {!checkArrayIsEmpty(courseData.videos) && (
                <SelectDropdown
                  buttonStyle={{
                    width: wid / 3,
                    height: 33,
                    marginTop: 0,
                    borderRadius: 116,
                    marginBottom: 10,
                    backgroundColor: "#319EAE",
                  }}
                  defaultButtonText={"Select Subject"}
                  searchPlaceHolder="Select Subject"
                  dropdownStyle={{
                    backgroundColor: "#fff",
                    marginTop: -42,
                    borderRadius: 12,
                  }}
                  rowTextStyle={{ fontSize: 11, fontFamily: "Poppins-Regular" }}
                  buttonTextStyle={{
                    fontSize: 11,
                    color: "#FFF",
                    fontFamily: "Poppins-Regular",
                  }}
                  data={subjectName}
                  onSelect={(selectedItem, index) => {
                    setSelectedSubjectId(selectedItem.id);
                    getTopicBySubjectId(selectedItem.id);
                    filterVideosforCurrSelection(selectedItem.id, "subject");
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.subjectName;
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.subjectName;
                  }}
                />
              )}
              {!checkArrayIsEmpty(videos) && (
                <SelectDropdown
                  buttonStyle={{
                    width: wid / 3,
                    height: 33,
                    marginTop: 0,
                    borderRadius: 116,
                    marginBottom: 20,
                    backgroundColor:
                      topicDropData.length === 0 ? "#b0d2cf" : "#319EAE",
                  }}
                  defaultButtonText={"Select Topic"}
                  searchPlaceHolder="Select Topic"
                  dropdownStyle={{
                    backgroundColor: "#fff",
                    marginTop: -42,
                    borderRadius: 12,
                  }}
                  rowTextStyle={{ fontSize: 11, fontFamily: "Poppins-Regular" }}
                  buttonTextStyle={{
                    fontSize: 11,
                    color: "#FFF",
                    fontFamily: "Poppins-Regular",
                  }}
                  data={topicDropData}
                  disabled={topicDropData.length === 0}
                  onSelect={(selectedItem, index) => {
                    const { title } = selectedItem;
                    filterVideosforCurrSelection(title, "topic");
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.title;
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.title;
                  }}
                />
              )}
            </View>

            {filterVideo.slice(0, showMore)?.map((video: any) => {
              return (
                <VideoCard
                  key={video.id}
                  startTime={video.startTime}
                  videoUrl={video.videoUrl}
                  title={video.title}
                  isBuy={video.isFree || buttonValue ? true : false}
                  BuyCourse={BuyCourse}
                  onCourseDetailPage={true}
                  videoId={getVideoId(video.videoUrl)}
                  navigation={props.navigation}
                  isFree={video.isFree}
                />
              );
            })}

            {filterVideo?.slice(0, showMore).length >= 0 &&
              filterVideo?.length > showMore && (
                <TouchableOpacity
                  onPress={() => setShowMore((prev: number) => (prev += 5))}
                  style={{
                    width: wid / 3.3,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 0,
                    borderRadius: 116,
                    marginBottom: 10,
                    backgroundColor: "#319EAE",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#FFF",
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    Load More..
                  </Text>
                </TouchableOpacity>
              )}

            {checkArrayIsEmpty(courseData.videos) && (
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  marginTop: high / 50,
                  marginBottom: !buttonValue ? heightPercentageToDP(5) : 0,
                }}
              >
                No Videos Available
              </Text>
            )}
          </ScrollView>
        ) : (
          <></>
        )}
      </View>
      {!buttonValue && (
        <View
          style={{
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: "#D1CB97",
            borderRadius: 8,
            width: wid / 1.1,
            marginTop: high / 60,
            paddingHorizontal: wid / 20,
            paddingVertical: high / 60,
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: "#F5F5F5",
            marginBottom: 20,
          }}
        >
          <View style={styles.courseDetail}>
            <Text allowFontScaling={false} style={styles.textstyle}>
              Price
            </Text>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}} >
            <FontAwesome
                  style={{ marginRight: 5, marginLeft: 5 }}
                  name="rupee"
                  size={20}
                  color="#A9A9A9"
                />
            <Text allowFontScaling={false} style={styles.textstyle}>
              {data.price}
            </Text>
            </View>
          </View>
          <View style={styles.courseDetail}>
            <Text allowFontScaling={false} style={styles.textstyle}>
              Duration
            </Text>
            <Text allowFontScaling={false} style={styles.textstyle}>
              1 Year
            </Text>
          </View>
          <View style={styles.courseDetail}>
            <Text allowFontScaling={false} style={styles.textstyle}>
              Valid Year
            </Text>
            <Text allowFontScaling={false} style={styles.textstyle}>
              {calcValidity(moment().add(1, 'year').format('YYYY-MM-DD'))}
            </Text>
          </View>
          <View style={styles.courseDetail}>
            <Text allowFontScaling={false} style={styles.textstyle}>
              Total
            </Text>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}} >
            <FontAwesome
                  style={{ marginRight: 5, marginLeft: 5 }}
                  name="rupee"
                  size={20}
                  color="#A9A9A9"
                />
            <Text allowFontScaling={false} style={styles.textstyle}>
              {data.price}
            </Text>
            </View>

          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{
                backgroundColor: "#319EAE",
                marginTop: high / 30,
                width: wid / 1.371,
                borderRadius: 6,
                height: high / 17.08,

                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                BuyCourse();
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 18,
                  color: "white",
                }}
              >
                {buttonValue ? "View" : `Buy`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: "#FAFAFB",
                width: wid / 1.371,
                borderRadius: 6,
                borderWidth: 1,
                marginTop: high / 60,
                borderColor: "#F1F1F1",
                height: high / 17.08,
                alignSelf: "center",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 18,
                  color: "grey",
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  loader: {
    // top: high / 2,
    // width: wid / 2,
  },
  courseDetail: {
    marginVertical: high / 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topicCntr: {
    flexDirection: "row",
    marginBottom: 10,
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
  textstyle: {
    color: "#A9A9A9",
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
});
export default CourseDetails;
