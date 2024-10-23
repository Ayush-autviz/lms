import React, { Fragment, useEffect, useState } from "react";
import { TextInput, StyleSheet, FlatList, View, Text } from "react-native";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import EnrolledCourse from "../components/EnrolledCourse";
import useDebounce from "../shared/Debounce";
import HeaderNav from "../components/HeaderNav";
import { ActivityIndicator } from "react-native-paper";
import { useStateContext } from "./Context/ContextProvider";
import { KEYS, baseUrl } from "../utils";
import { Storage } from "../utils/LocalStorage";
import PopularCourse from "../components/PopularCourse";
import { verticalScale } from "../utils/metrics";
import { generateBoxShadowStyle } from "../lib/generateBoxShadow";
import FilterModal from "../modal/FilterModal";
const shadow = generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function TabTwoScreen({ routes, navigation }: any) {
  const { access_token, refresh } = useStateContext();
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState<number | null>();
  const [resultFound, setResultFound] = useState(false);
  const [searchedData, setSearchData] = useState<any>(null);
  const debouncedSearchTerm = useDebounce(searchQuery, 400);
  const debouncedSearchTermForFilter = useDebounce(filterQuery, 0);
  const [resData, SetResData] = useState<any>([]);
  const [allDataForSearch, setAllDataForSearch] = useState<any>([]);
  const [enrollCourseData, setEnrollCourseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCatory, setFilterCatory] = useState([]);

  const handleChangeText = async (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
    }
  };
  const preFetchData = async () => {
    setIsLoading(true);
    try {
      const userId: any = await Storage.getItem(KEYS.USER_ID);
      const [GetEnrolledCourseResponse, GetCourseInformationResponse] =
        await Promise.all([
          GetEnrolledCourse(access_token, userId),
          GetCourseInformation(),
        ]);
      setEnrollCourseData(GetEnrolledCourseResponse?.data?.result);
      SetResData(GetCourseInformationResponse?.data.result);
      setIsLoading(false);
      setAllDataForSearch([
        ...GetCourseInformationResponse?.data.result,
        ...GetEnrolledCourseResponse?.data?.result.map((item: any) => {
          return (
            !GetCourseInformationResponse?.data.result.includes(
              item.courseManagement
            ) && item.courseManagement
          );
        }),
      ]);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  console.log(enrollCourseData,"enrolledcoursedata");

  const getFilterCatorgies = async () => {
    const { data } = await axios.get(
      `${baseUrl}/api/services/app/CategoryAppServices/GetAllCategories`
    );
    setFilterCatory(data.result.sort((a: any, b: any) => b.id - a.id));
  };
  const GetEnrolledCourse = (access_token: any, user_id: any) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      };
      return axios.get(
        `${baseUrl}/api/services/app/EnrollCourses/GetAllEnrollCourses?studentId=${user_id}`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };
  const GetCourseInformation = () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
          "Abp-TenantId": "1",
        },
      };
      return axios.get(
        `${baseUrl}/api/services/app/CourseManagementAppServices/GetAllDataBasedOnCategory?courseType=Hybrid`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onClear = async () => {
    setSearchQuery("");
    setFilterQuery(null);
    setResultFound(false);
    setSearchData(null);
  };
  useEffect(() => {
    if (debouncedSearchTerm || debouncedSearchTermForFilter) {
      filterData();
      setResultFound(true);
    } else {
      setSearchData(null);
      setResultFound(false);
    }
  }, [debouncedSearchTerm, debouncedSearchTermForFilter]);

  const filterData = () => {
    let filterRes = allDataForSearch.filter((course: any) => {
      return searchQuery
        ? course.name.toLowerCase().includes(searchQuery.toLowerCase())
        : course.categoryId === filterQuery;
    });
    filterRes.length ? setSearchData([...filterRes]) : setSearchData(null);
    setResultFound(true);
  };

  useEffect(() => {
    preFetchData();
  }, [refresh]);
  useEffect(() => {
    getFilterCatorgies();
  }, []);
  return (
    <View
      style={{
        backgroundColor: "#F7F7F7",
        flex: 1,
      }}
    >
      <HeaderNav name="My Courses" navigation={navigation} />
      {isLoading == false ? (
        <View style={{ backgroundColor: "#FFF", height: high }}>
          <View style={[styles.searchBarContainer]}>
            <TextInput
              allowFontScaling={false}
              value={searchQuery}
              onChangeText={handleChangeText}
              style={[styles.searchBar, styles.placeholder1, shadow]}
              placeholder="Try out a course.."
              placeholderTextColor={
                colorScheme === "dark" ? "#D1D0D0" : "black"
              }
            />
            {searchQuery || filterQuery ? (
              <AntDesign
                name="close"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
                onPress={onClear}
                style={[styles.clearIcon2, shadow]}
              />
            ) : (
              <FontAwesome
                name="search"
                size={20}
                style={[styles.clearIcon2, shadow]}
              />
            )}
            <View style={{ alignItems: "center" }}>
              <FilterModal
                filterCatory={filterCatory}
                setFilterQuery={setFilterQuery}
              />
            </View>
          </View>
          {!searchQuery && !filterQuery ? (
            <View>
              {enrollCourseData?.length ? (
                <View>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={enrollCourseData}
                    style={{
                      width: wid,
                      marginTop: 20,
                      paddingLeft: wid / 12.8,
                    }}
                    renderItem={({ item, index }) => (
                      <EnrolledCourse
                        key={index}
                        courseManagementId={item.courseManagement.id}
                        imagePath={item.courseManagement.imagePath}
                        name={item.courseManagement.name}
                        detail={item.courseManagement.detail}
                        navigation={navigation}
                        isBuy={true}
                        expiry={item.expiryDate}
                        buy={true}
                        valid={item.valideUpto}
                        price={item.courseManagement.price}
                        creationTime={item.courseManagement.creationTime}
                      />
                    )}
                  />
                </View>
              ) : (
                <Text
                  allowFontScaling={false}
                  style={{
                    marginTop: high / 65,
                    height: high / 3,
                    textAlignVertical: "center",
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "Poppins-Bold",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  No Purchased Course
                </Text>
              )}

              <View>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins-Bold",
                    backgroundColor: "#FFFFFF",
                    paddingLeft: wid / 11.2,
                    marginVertical: high / 60,
                  }}
                >
                  Popular Courses
                </Text>
              </View>
              <FlatList
                key={Math.random() * 100}
                showsHorizontalScrollIndicator={false}
                data={resData}
                style={{ width: wid, height: high / 2.8 }}
                renderItem={({ item }) => (
                  <PopularCourse item={item} navigation={navigation} />
                )}
              />
            </View>
          ) : (
            <View>
              {searchedData ? (
                <FlatList
                  key={Math.random() * 100}
                  showsHorizontalScrollIndicator={false}
                  data={searchedData}
                  style={{
                    width: wid,
                    marginTop: 20,
                    height: verticalScale(650),
                  }}
                  renderItem={({ item, index }) => (
                    <PopularCourse
                      key={index}
                      item={item}
                      navigation={navigation}
                    />
                  )}
                />
              ) : (
                <Text
                  allowFontScaling={false}
                  style={{
                    marginTop: high / 9,
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "Poppins-Bold",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  No Course Found
                </Text>
              )}
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <ActivityIndicator size="large" color="#319EAE" />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  searchBarContainer: {
    marginHorizontal: wid / 14,
    alignItems: "center",
    marginTop: 15,
    padding: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  number: {
    fontFamily: "Poppins-Regular",
    left: wid / 70,
    fontSize: 14,
    color: "#8A8A8A",
    backgroundColor: "transparent",
  },
  cardText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  topicCntr: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 11,
    borderColor: "#F1F1F1",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: wid / 1.15,
    backgroundColor: "#FAFAFB",
  },
  shadowProp: {
    elevation: 20,
    shadowColor: "#52006A",
  },
  searchBar: {
    width: wid / 1.45,
    height: high / 20.35,
    paddingLeft: wid / 32.66,
    backgroundColor: "#ECECEC",
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: high / 142.33,
  },
  placeholder1: {
    fontFamily: "Poppins-Medium",
    fontStyle: "normal",
    fontSize: 13,
  },

  clearIcon: {
    bottom: 13,
    color: "#8A8A8A",
    justifyContent: "center",
    alignSelf: "center",
    width: wid / 19.2,
    height: high / 42.7,
  },
  clearIcon2: {
    position: "absolute",
    bottom: 17,
    color: "#8A8A8A",
    right: wid / 5,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
});
