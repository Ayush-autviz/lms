import React, { useEffect } from "react";

import {
  Image,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  View,
  Text,
} from "react-native";
import axios from "axios";
import { baseUrl } from "../utils";
import { useStateContext } from "./Context/ContextProvider";
import { ActivityIndicator } from "react-native-paper";

const high = Dimensions.get("window").height;
const TestResultScreen = (props: any) => {
  const { access_token } = useStateContext();
  const [resutlData, SetResultData] = React.useState<any>();
  const [isLoading, SetisLoading] = React.useState<boolean>(true);

  const getMockTestResult = async () => {
    try {
      let data = "";
      const config = {
        method: "GET",
        url:
          props.route.params.type == "quiz"
            ? `${baseUrl}/api/services/app/BlogResult/GetBlogResult?id=${props.route.params.id}`
            : `${baseUrl}/api/services/app/MockTestResultService/GetMockTestResult?id=${props.route.params.id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Abp-TenantId": "1",
        },
        data: data,
      };
      await axios(config)
        .then(function async(response: any) {
          SetResultData(response.data.result);
        })
        .catch(function (error: any) {
          console.log(error);
        });
    } catch (error) {
    } finally {
      SetisLoading(false);
    }
  };

  useEffect(() => {
    getMockTestResult();
  }, []);
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  const handleViewExplanation = () => {
    !props.route.params.type
      ? props.navigation.navigate("ViewExpanation", {
        mockTestId: props.route.params.id,
      })
      : props.navigation.navigate("QuizTestViewExplanationScreen", {
        mockTestId: props.route.params.id,
      });
  };

  return (

    <>
      {isLoading ? (<>
        <View style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" color="#319EAE" />
        </View>
      </>) : (<>
        {resutlData && !isLoading && (
          <View
            style={{
              top: high / 12,
              width: "90%",
              height: "75%",
              display: "flex",
              alignSelf: "center",
              borderRadius: 22,
              padding: "2%",
            }}
          >
            <View
              style={{
                display: "flex",
                height: "6%",
                alignItems: "flex-end",
                marginRight: "6%",
                marginTop: "4%",
                borderRadius: 25,
              }}
            >
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  style={{ height: "70%", padding: 15 }}
                  resizeMode="cover"
                  source={require("../assets/images/close.png")}
                ></Image>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ margin: 10 }}
                resizeMode="cover"
                source={require("../assets/images/Trophy.png")}
              ></Image>
              <Text
                style={{
                  fontSize: 25,
                  marginTop: "1%",
                  fontFamily: "Poppins-Bold",
                }}
              >
                Mocktest Result
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                marginTop: "6%",
              }}
            >
              <View
                style={{
                  backgroundColor: "transparent",
                  marginRight: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "4.5%",
                }}
              >
                <Image
                  style={{ margin: 10 }}
                  resizeMode="cover"
                  source={require("../assets/images/StarTropphy.png")}
                ></Image>
                <Text
                  style={{ fontSize: 17, marginTop: "1%", fontWeight: "500" }}
                >
                  {resutlData.correct ? resutlData.correct : "0"}
                </Text>
                <Text
                  style={{
                    color: "#B0B0B0",
                    fontSize: 16,
                    marginTop: "1%",
                    fontWeight: "700",
                  }}
                >
                  Correct
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "transparent",
                  marginRight: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "4.5%",
                }}
              >
                <Image
                  style={{ margin: 10 }}
                  resizeMode="cover"
                  source={require("../assets/images/ScoreMeter.png")}
                ></Image>
                <Text
                  style={{ fontSize: 17, marginTop: "1%", fontWeight: "500" }}
                >
                  {resutlData.attempted ? resutlData.attempted : "0"}
                </Text>
                <Text
                  style={{
                    color: "#B0B0B0",
                    fontSize: 16,
                    marginTop: "1%",
                    fontWeight: "700",
                  }}
                >
                  Attempted
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "transparent",
                  marginRight: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "4.5%",
                }}
              >
                <Image
                  style={{ margin: 10 }}
                  resizeMode="cover"
                  source={require("../assets/images/GreenCheck.png")}
                ></Image>
                <Text
                  style={{ fontSize: 17, marginTop: "1%", fontWeight: "500" }}
                >
                  {resutlData.unattempted ? resutlData.unattempted : "0"}
                </Text>
                <Text
                  style={{
                    color: "#B0B0B0",
                    fontSize: 16,
                    marginTop: "1%",
                    fontWeight: "700",
                  }}
                >
                  Unattempted
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "transparent",
                  marginRight: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "4.5%",
                }}
              >
                <Image
                  style={{ margin: 10 }}
                  resizeMode="cover"
                  source={require("../assets/images/Wrongmark.png")}
                ></Image>
                <Text
                  style={{ fontSize: 17, marginTop: "1%", fontWeight: "500" }}
                >
                  {resutlData.attempted - resutlData.correct
                    ? resutlData.attempted - resutlData.correct
                    : "0"}
                </Text>
                <Text
                  style={{
                    color: "#B0B0B0",
                    fontSize: 16,
                    marginTop: "1%",
                    fontWeight: "700",
                  }}
                >
                  Wrong
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "transparent",
                  marginRight: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "4.5%",
                }}
              >
                <Image
                  style={{ margin: 10 }}
                  resizeMode="cover"
                  source={require("../assets/images/NoData.png")}
                ></Image>
                <Text
                  style={{ fontSize: 17, marginTop: "1%", fontWeight: "500" }}
                >
                  {resutlData.correct ? resutlData.correct : "0"}
                </Text>
                <Text
                  style={{
                    color: "#B0B0B0",
                    fontSize: 16,
                    marginTop: "1%",
                    fontWeight: "700",
                  }}
                >
                  Score
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <View
                style={{
                  width: "55%",
                  height: 40,
                  margin: 7,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "110%",
                    backgroundColor: "#319EAE",
                    borderRadius: 4,
                  }}
                  onPress={() => handleViewExplanation()}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Poppins-Regular",
                      fontSize: 15,
                    }}
                  >
                    {"View Explanation"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </>)}

    </>
  );
};

export default TestResultScreen;