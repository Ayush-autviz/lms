import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import HeaderNav from "../components/HeaderNav";
import EnrolledCourse from "../components/EnrolledCourse";
import axios from "axios";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl, KEYS } from "../utils";
import { StackActions } from "@react-navigation/native";
import Banner from "../components/Banner";
import { getData } from "../api/SubjectService/sever";
import { heightPercentageToDP } from "../lib/ResonsiveDimesions";
import { Storage } from "../utils/LocalStorage";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { Platform } from "react-native";
import VideoHome from "../components/VideoHome";
SplashScreen.preventAutoHideAsync().then((result) =>
  console.log(`SplashScreen.preventAutoHideAsync() ${result}`)
);
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
function HomeScreen({ navigation }: any) {
  const { setUserDetail, setuserImage, setAccess_token, refresh } =
    useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [onGoingVideoCoures, setOnGoingVideoCoures] = useState<any[] | null>(
    null
  );

  const [hybridCourseData, setHybridCourseData] = useState<any[] | null>(null);
  const [feedVidForHome, setFeedVidForHome] = useState<any>(null);
  const [promotionData, setPromotionData] = useState<any[] | null>(null);
  const [feedFullData, setFeedFullData] = useState<any>();
  const [allMockTestData, setAllMockTestData] = useState<any[] | null>(null);
  const [freeVideoData, setFreeVideoData] = useState<null | any[]>(null);

  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((value: any) => {
      if (value != null) {
        FeedData(value);
      }
    });
  }, []);

  const getUserImage = (access_token: string, userId: string) => {
    const config = {
      headers: {
        Authorization: `Bearer  ${access_token}`,
        "Abp-TenantId": "1",
      },
    };
    return axios.get(
      `${baseUrl}/api/services/app/User/Get?Id=${userId}`,
      config
    );
  };


  console.log(allMockTestData,"allmocktstdata")

  console.log(onGoingVideoCoures,"ongoing")

  function extractNumberFromURL(url: string) {
    var regex = /\/(\d+)\//;
    var matcht = url?.match(regex);
    return matcht?parseInt(matcht?.[1]) : -1;
  }

  const getUserData = async (token: any) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/services/app/Session/GetCurrentLoginInformations`,
      headers: {
        "Abp-TenantId": "1",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.request(config);
      if (!data.result.user) {
        navigation.dispatch(StackActions.replace("SignIn"));
      }
      setUserDetail(data.result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getOngoingVideoCourses = (token: any) => {
    const config = {
      headers: {
        Authorization: `Bearer  ${token}`,
        "Abp-TenantId": "1",
      },
    };
    try {
      return axios.get(
        `${baseUrl}/api/services/app/CourseManagementAppServices/GetAllDataBasedOnCategory?courseType=Video`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getVideoContent = async () => {
    try {
      const { data, status } = await getData(
        "/api/services/app/ContentManagementService/getAllContentVideos"
      );

      setFreeVideoData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllPromotions = () =>
    axios.get(`${baseUrl}/api/services/app/Promotion/GetAllPromotions`);

  const onGoingMockCourse = async (access_token: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          "Abp-TenantId": "1",
        },
      };
      return axios.get(
        `${baseUrl}/api/services/app/CourseManagementAppServices/GetAllDataBasedOnCategory?categoryId=-1&courseType=Mock`,
        config
      );
    } catch (error) {
      console.log(error, "upcomingDataResonse");
    }
  };
  const onGoingHybridCourse = async (access_token: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          "Abp-TenantId": "1",
        },
      };
      return axios.get(
        `${baseUrl}/api/services/app/CourseManagementAppServices/GetAllDataBasedOnCategory?categoryId=-1&courseType=Hybrid`,
        config
      );
    } catch (error) {
      console.log(error, "upcomingDataResonse");
    }
  };
  const FeedData = async (token: any) => {
    var axios = require("axios");
    var data = "";
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/BlogAppServices/GetAllBlogs?subjectId=0&courseId=0`,
      headers: {
        Authorization: `Bearer  ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        console.log(
          "feed console",
          response.data.result.filter((item: any) => item.type == "Video")
        );
        console.log("full data", response.data.result);
        setFeedFullData(
          response.data.result.sort((a: any, b: any) => b.id - a.id)
        );

        console.log(feedFullData,"feed full data");
        setFeedVidForHome(
          response.data.result.filter((item: any) => item.type == "Video")
        );
      })
      .catch(function (error: any) {
        console.log(error);
      });
    setIsLoading(false);
  };
  const allData = async () => {
    try {
      setIsLoading(true);

      const access_token: any = await Storage.getItem(KEYS.ACCESS_TOKEN);
      const userId: any = await Storage.getItem(KEYS.USER_ID);
      if (!access_token && !userId) {
        await SplashScreen.hideAsync().then((result) =>
          console.log(`SplashScreen.Hide() ${result}`)
        );
        navigation.dispatch(StackActions.replace("SignIn"));
      }

      setAccess_token(access_token);
      const [
        getUserImageResponse,
        onGoingMockCourseResponse,
        getOngoingVideoCoursesResponse,
        getAllPromotionsResponse,
        getAllHybridCourseResponse,
      ] = await Promise.all([
        getUserImage(access_token, userId),
        onGoingMockCourse(access_token),
        getOngoingVideoCourses(access_token),
        getAllPromotions(),
        onGoingHybridCourse(access_token),
      ]);
      await SplashScreen.hideAsync().then((result) =>
        console.log(`SplashScreen.Hide() ${result}`)
      );
      setPromotionData(getAllPromotionsResponse.data.result);
      setuserImage(getUserImageResponse?.data.result.pofileImage);

      setAllMockTestData(
        onGoingMockCourseResponse?.data?.result?.filter(
          (course: any) => course.type == "Mock"
        )
      );

      setHybridCourseData(getAllHybridCourseResponse?.data.result);
      setOnGoingVideoCoures(getOngoingVideoCoursesResponse?.data.result);
      setIsLoading(false);
      getUserData(access_token);
      getVideoContent();
    } catch (error) {
      await SplashScreen.hideAsync().then((result) =>
        console.log(`SplashScreen.Hider() ${result}`)
      );

      Storage.removeItem(KEYS.ACCESS_TOKEN);
      Storage.removeItem(KEYS.USER_ID);
      navigation.dispatch(StackActions.replace("SignIn"));
      console.log(error);
    }
  };

  useEffect(() => {
    allData();
  }, [refresh]);

  console.log("stack");

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
      <>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        {isLoading === true ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#319EAE" />
          </View>
        ) : (
          <>
            <HeaderNav setIsLoading={setIsLoading} name={"DashBoard"} />
            <ScrollView
              overScrollMode="never"
              style={styles.onGoingVideoScroll}
            >
              <View style={styles.FAFAFBbackgoundcolor}>
                <FlatList
                  style={{ left: wid / 12.8 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={promotionData}
                  renderItem={({ item }) => (
                    <Banner
                      navigation={navigation}
                      item={item}
                      courseId={extractNumberFromURL(item.link)}
                    />
                  )}
                />
              </View>
              <View style={[styles.FAFAFBbackgoundcolor, { width: wid }]}>
                <Text allowFontScaling={false} style={styles.textStyle}>
                  Ongoing Video Courses
                </Text>
                {onGoingVideoCoures ? (
                  <View
                    style={[
                      styles.onGoingVideoinnnerScroll,
                      { backgroundColor: "#F7F7F7" },
                    ]}
                  >
                    <FlatList
                      style={{ backgroundColor: "#F7F7F7" }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={onGoingVideoCoures}
                      renderItem={({ item, index }) => (
                        <EnrolledCourse
                          key={index}
                          courseManagementId={item.id}
                          imagePath={item.imagePath}
                          name={item.name}
                          detail={item.detail}
                          navigation={navigation}
                          isFree={item.price == 0 && true}
                          isBuy={item.price == 0 ? true : item.isBuy}
                          price={item.price}
                          buy={item.isBuy}
                          valid={item.validateDuration}
                          creationTime={item.creationTime}
                        />
                      )}
                    />
                  </View>
                ) : (
                  <View style={styles.noAvailableStyle}>
                    <Text style={styles.noAvailableTextStyle}>
                      No Course has been purchased
                    </Text>
                  </View>
                )}
              </View>
              <View style={[styles.FAFAFBbackgoundcolor, { width: wid }]}>
                <Text
                  allowFontScaling={false}
                  style={[styles.textStyle, { marginTop: high / 85.4 }]}
                >
                  Ongoing Mock Courses
                </Text>

                {allMockTestData ? (
                  <View
                    style={{
                      left: wid / 12.8,
                      flexDirection: "row",
                      marginRight: wid / 45,
                    }}
                  >
                    <FlatList
                      data={allMockTestData}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <EnrolledCourse
                          key={index}
                          courseManagementId={item.id}
                          imagePath={item.imagePath}
                          name={item.name}
                          detail={item.detail}
                          navigation={navigation}
                          isFree={item.price == 0 && true}
                          isBuy={item.price == 0 ? true : item.isBuy}
                          price={item.price}
                          buy={item.isBuy}
                          valid={item.validateDuration}
                          creationTime={item.creationTime}
                        />
                      )}
                    />
                  </View>
                ) : (
                  <View style={styles.noAvailableStyle}>
                    <Text style={styles.noAvailableTextStyle}>
                      No Course has been purchased
                    </Text>
                  </View>
                )}
              </View>

              <View style={[styles.FAFAFBbackgoundcolor, { width: wid }]}>
                <Text
                  allowFontScaling={false}
                  style={[styles.textStyle, { marginTop: high / 85.4 }]}
                >
                  Ongoing Hybrid Courses
                </Text>
                {hybridCourseData ? (
                  <View
                    style={{
                      left: wid / 12.8,
                      flexDirection: "row",
                      marginRight: wid / 45,
                    }}
                  >
                    <FlatList
                      data={hybridCourseData}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <EnrolledCourse
                          key={index}
                          courseManagementId={item.id}
                          imagePath={item.imagePath}
                          name={item.name}
                          detail={item.detail}
                          navigation={navigation}
                          isFree={item.price == 0 && true}
                          isBuy={item.price == 0 ? true : item.isBuy}
                          price={item.price}
                          buy={item.isBuy}
                          valid={item.validateDuration}
                          creationTime={item.creationTime}
                        />
                      )}
                    />
                  </View>
                ) : (
                  <View style={styles.noAvailableStyle}>
                    <Text style={styles.noAvailableTextStyle}>
                      No Course has been purchased
                    </Text>
                  </View>
                )}
              </View>

              <Text
                allowFontScaling={false}
                style={[styles.textStyle, { marginTop: high / 85.4 }]}
              >
                Free Videos
              </Text>

              {feedFullData ? (
                <View
                  style={{
                    left: wid / 12.8,
                    flexDirection: "row",
                    marginRight: wid / 45,
                  }}
                >
                  <FlatList
                    data={feedFullData.filter(
                      (item: any) => item.type == "Video"
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <VideoHome item={item} key={index} />
                    )}
                  />
                </View>
              ) : (
                <View style={styles.noAvailableStyle}>
                  <Text style={styles.noAvailableTextStyle}>
                    No Course has been purchased
                  </Text>
                </View>
              )}
              <View style={{ height: 50 }}></View>
            </ScrollView>
          </>
        )}
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: high / 2,
    left: wid / 2.1,
  },
  loaderContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    justifyContent: "center",
    height: high,
  },

  onGoingVideoScroll: {
    backgroundColor: "#FAFAFB",
  },
  onGoingVideoinnnerScroll: {
    left: wid / 12.8,
    flexDirection: "row",
    marginRight: wid / 45,
  },
  FAFAFBbackgoundcolor: {
    marginTop: heightPercentageToDP(2),
    backgroundColor: "#FAFAFB",
  },
  textStyle: {
    fontFamily: "Poppins-Medium",
    fontSize: 19,
    left: wid / 12.8,
    color: "#212121",
    marginBottom: high / 85.4,
  },
  leftSpace: {
    left: wid / 12.8,
  },
  noAvailableStyle: {
    backgroundColor: "#FAFAFB",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: high / 14.3,
  },
  noAvailableTextStyle: {
    fontFamily: "Poppins-Medium",
    width: "100%",
    alignContent: "center",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "#FAFAFB",
  },
  freeVideoScroll: {
    marginBottom: 45,
    backgroundColor: "#FAFAFB",
    left: wid / 12.8,
    flexDirection: "row",
    marginRight: wid / 13,
  },
});
export default HomeScreen;
