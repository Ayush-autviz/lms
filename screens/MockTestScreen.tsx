import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  FlatList,
  View,
  Text,
} from "react-native";
import { Dimensions } from "react-native";
import HeaderNav from "../components/HeaderNav";
import axios from "axios";

import MockTestCard from "../components/MockTestCard";
import { ActivityIndicator } from "react-native-paper";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";
import { heightPercentageToDP } from "../lib/ResonsiveDimesions";

export default function MockTest(props: any) {
  const [mockData, setMockData] = useState<any>([]);
  const [myMockData, setMyMockData] = useState<any>([]);
  const { access_token, userDetail } = useStateContext();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [noUpcomingMockTest, setNoUpcomingMockTest] = useState(false);
  const [isThereAnyPurchasedMocktest, setisThereAnyPurchasedMocktest] =
    useState<boolean>(false);
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  }, []);

  const wid = Dimensions.get("window").width;
  const high = Dimensions.get("window").height;
  const [res, setRes] = useState("Upcoming");
  const [val, setValue] = useState("Buy");
  const [color, setColor] = useState(true);
  const [color1, setColor1] = useState(false);
  useEffect(() => {
    upComingData();
  }, []);

  const upComingData = async () => {
    try {
      setisLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          "Abp-TenantId": "1",
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/api/services/app/CourseManagementAppServices/GetAllDataBasedOnCategory?categoryId=-1&courseType=Mock`,
        config
      );
      setMockData(data.result);

      setisLoading(false);
      data.result.map((e: any) => {
        if (e.isBuy == false) {
          setNoUpcomingMockTest(true);
        }
      });
    } catch (error) {
      console.log(error, "upcomingDataResonse");
      setisLoading(false);
    }
  };
  const GetEnrolloedMockTest = async () => {

    try {
      setisLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
          "Content-Type": "application/json",
          "Abp-TenantId": "1",
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/EnrollCourses/GetAllEnrollCourses?studentId=${userDetail.id}`,
        config
      );
      setMyMockData(
        res.data.result.filter(
          (item: any) => item.courseManagement.type == "Mock"
        )
      );
      res.data.result.forEach((item: any) => {
        if (item.courseManagement.type == "Mock") {
          setisThereAnyPurchasedMocktest(true);
        }
      });
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(mockData,'mockdata');

  console.log(myMockData,"mymockdata")

  const onPress = (text: string) => {
    setRes(text);
    setValue("Buy");
    if (text === "My Mock") {
      GetEnrolloedMockTest();
    }
    if (text == "Upcoming") {
      setColor(true);
      setColor1(false);
    } else {
      setValue("Start");
      setColor(false);
      setColor1(true);
    }
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#F7F7F7" }}>
          <HeaderNav name="Mock Test" navigation={props.navigation} />
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: high / 42.7,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              top: high / 42.7,
              height: high / 17,
              marginBottom: high / 42.7,
              alignSelf: "center",
              alignItems: "center",
              borderRadius: 116,
              borderWidth: 0.5,
              borderColor: "#EEEEEE",
              backgroundColor: "#FAFAFB",
            }}
          >
            <TouchableOpacity
              onPress={() => onPress("Upcoming")}
              style={{
                backgroundColor: color ? "#319EAE" : "#FAFAFB",
                height: "100%",
                width: "50%",
                justifyContent: "center",
                borderRadius: 116,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: color ? "white" : "black",
                  alignSelf: "center",
                  fontFamily: "Poppins-Regular",
                  fontSize: 15,
                }}
              >
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress("My Mock")}
              style={{
                backgroundColor: color1 ? "#319EAE" : "#FAFAFB",
                height: "100%",
                width: "50%",
                justifyContent: "center",
                borderRadius: 116,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: color1 ? "white" : "black",
                  alignSelf: "center",
                  fontFamily: "Poppins-Regular",
                  fontSize: 15,
                }}
              >
                My Mock
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {isLoading == true ? (
          <View style={{ alignSelf: "center", top: high / 4.5 }}>
            <ActivityIndicator size="large" color="#319EAE" />
          </View>
        ) : (
          <View>
            {res == "Upcoming" && (
              <View
                style={{
                  height: high / 1.35,
                }}
              >
                <FlatList
                  data={mockData}
                  renderItem={({ item, index }) => (
                    <MockTestCard
                      key={index}
                      id={item.id}
                      name={item.name}
                      details={
                        item.detail ? item.detail : "No Details Available"
                      }
                      imagePath={item.imagePath}
                      upComingData={upComingData}
                      price={item.price}
                      isFree={item.price == 0 ? true : false}
                      date={item.validateDuration}
                      isBuy={item.isBuy ? true : false}
                    />
                  )}
                />
              </View>
            )}
            {res == "My Mock" && (
              <View style={{ height: high / 1.35 }}>
                {myMockData ? (
                  <FlatList
                    data={myMockData}
                    renderItem={({ item, index }) => (
                      <MockTestCard
                        id={item.courseManagement.id}
                        name={item.courseManagement.name}
                        details={
                          item.courseManagement.detail
                            ? item.courseManagement.detail
                            : "No Details Available"
                        }
                        imagePath={item.courseManagement.imagePath}
                        isFree={item.price == 0 ? true : false}
                        date={item.courseManagement.creationTime}
                        expiry={item.expiryDate}
                        price={item.courseManagement.price}
                        isBuy={"View"}
                      />
                    )}
                  />
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                      top: heightPercentageToDP(-59),
                      width: wid,
                    }}
                  >
                    <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>
                      No Mock Tests
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({});
