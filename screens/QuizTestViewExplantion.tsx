import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { ActivityIndicator } from "react-native-paper";
import HeaderNav from "../components/HeaderNav";

import { Dimensions } from "react-native";
import axios from "axios";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";
import { StackActions, useNavigation } from "@react-navigation/native";
import QuizTimer from "../components/QuizTimer";

import Toast from "react-native-toast-message";
import HtmlRenderWithMathTag from "../components/HtmlRenderWithMathTag";

import RenderHTML from "react-native-render-html";
import { FontAwesome } from "@expo/vector-icons";
import ExplantionAnwersOption from "../components/modal/ExplantionAnwersOption";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../lib/ResonsiveDimesions";

const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function QuizTestViewExplantion(props: any) {
  const { mockTestId: quizId } = props.route.params;
  const navigation = useNavigation();
  const [index, setIndex] = useState<number>(0);
  const [quesIndexArray, setquesIndexArray] = useState<any>([]);
  const { access_token, userDetail } = useStateContext();
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewExplanation, setViewExplanation] = useState<boolean>(false);
  const [buttonValue, setButtonValue] = useState("Next");

  let headers = {
    "Abp-TenantId": "1",
    Authorization: `Bearer ${access_token}`,
  };

  const checkButton = () => {
    if (index === quesIndexArray.length - 1) {
      setButtonValue("Exit");
    } else {
      setButtonValue("Next");
    }
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.goBack() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  const GetQuestionsById = async () => {
    try {
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${baseUrl}/api/services/app/BlogResult/GetResultById?id=${quizId}`,
        headers: headers,
      };
      const res = await axios(config);

      setquesIndexArray(res.data.result);
      setAnswer(
        res.data.result[0].userAnswer
          ? res.data.result[0].userAnswer.substring(1, 2)
          : "null"
      );
      setAnswer(res.data.result[0].userAnswer + "");
      setLoading(false);
    } catch (error) {
      Alert.alert("", "Something Went Wrong ...", [
        {
          text: "Ok",
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
      ]);
      console.log("GetResultById API Hit Failed", quizId, error);
    }
  };

  const SaveResult = async () => {
    var data = JSON.stringify(quesIndexArray);
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/BlogUserAns/SaveResult`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "Abp-TenantId": "1",
      },
      data: data,
    };
    await axios(config)
      .then(function (response: any) {
        Alert.alert("", "Your Test is Submitted", [
          {
            text: "Ok",
            onPress: () => {
              navigation.dispatch(StackActions.replace("Feed"));
            },
          },
        ]);

        Toast.show({
          type: "success",
          text1: "Saved",
          position: "top",
        });
      })

      .catch(function (error: any) {
        console.log("grtResultApi Failed", error);
      });
  };

  useEffect(() => {
    checkButton();
  }, [index]);

  useEffect(() => {
    GetQuestionsById();
  }, []);
  const handleButtons = (upcomingIndex: number) => {
    if (upcomingIndex < quesIndexArray.length) {
      let UpcomingIndexQuestion = quesIndexArray[upcomingIndex];
      setAnswer(
        UpcomingIndexQuestion.userAnswer
          ? UpcomingIndexQuestion.userAnswer.substring(1, 2)
          : "null"
      );
      setIndex(upcomingIndex);
    }
  };

  return (
    <>
      {/* <ErrorBoundary> */}
      {loading && (
        <View style={{ alignSelf: "center", top: high / 4.5 }}>
          <ActivityIndicator size="large" color="#319EAE" />
        </View>
      )}
      <Toast position="top" topOffset={20} />
      {Array.isArray(quesIndexArray) && !loading && (
        <View
          style={{
            backgroundColor: "#FAFAFB",
            height: "100%",
            marginBottom: 50,
          }}
        >
          <>
            <View style={{ backgroundColor: "#F7F7F7" }}>
              <HeaderNav
                name="Quiz Explanation"
                navigation={props.navigation}
              />
            </View>
            <View style={{ backgroundColor: "#FAFAFB" }}>
              <QuizTimer
                duration={"viewExpalanationPage"}
                index={index}
                setIndex={setIndex}
                quesIndexArray={quesIndexArray}
                setquesIndexArray={setquesIndexArray}
                SumbitTest={SaveResult}
              />
            </View>
            <ScrollView
              style={{
                backgroundColor: "#FAFAFB",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: high / 100,
                  paddingHorizontal: wid / 19.2,
                  backgroundColor: "#FAFAFB",
                }}
              >
                {quesIndexArray[index].question?.questions?.includes(
                  "<math>"
                ) ? (
                  <HtmlRenderWithMathTag
                    color={"#FAFAFB"}
                    source={`<b> ${index + 1} . </b>${
                      quesIndexArray[index].question.questions
                    }`}
                  />
                ) : (
                  <View style={{ marginTop: 12 }}>
                    <RenderHTML
                      contentWidth={wid / 1.2}
                      source={{
                        html: `<b> ${index + 1} . </b>${
                          quesIndexArray[index].question?.questions
                        }`,
                      }}
                    />
                  </View>
                )}
              </View>
              <View style={{ backgroundColor: "#FAFAFB" }}>
                <View>
                  {quesIndexArray[index].question.option1 && (
                    <ExplantionAnwersOption
                      title={"A"}
                      corrctAnswer={quesIndexArray[index]?.question?.answer}
                      userAnswer={answer}
                      question={quesIndexArray[index].question.option1}
                    />
                  )}
                  {quesIndexArray[index]?.question?.option2 && (
                    <ExplantionAnwersOption
                      title={"B"}
                      corrctAnswer={quesIndexArray[index]?.question?.answer}
                      userAnswer={answer}
                      question={quesIndexArray[index]?.question?.option2}
                    />
                  )}
                  {quesIndexArray[index].question.option3 && (
                    <ExplantionAnwersOption
                      title={"C"}
                      corrctAnswer={quesIndexArray[index].question.answer}
                      userAnswer={answer}
                      question={quesIndexArray[index].question.option3}
                    />
                  )}
                  {quesIndexArray[index].question.option4 && (
                    <ExplantionAnwersOption
                      title={"D"}
                      corrctAnswer={quesIndexArray[index].question.answer}
                      userAnswer={answer}
                      question={quesIndexArray[index].question.option4}
                    />
                  )}
                  {quesIndexArray[index].question.option5 && (
                    <ExplantionAnwersOption
                      title={"E"}
                      corrctAnswer={quesIndexArray[index].question.answer}
                      userAnswer={answer}
                      question={quesIndexArray[index].question.option5}
                    />
                  )}
                </View>
              </View>

              <View
                style={{
                  width: wid,
                  height: high / 7.16,
                  backgroundColor: "#FAFAFB",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: widthPercentageToDP(7),
                }}
              >
                <View
                  style={{
                    width: widthPercentageToDP(15),
                    height: high / 21.35,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: "110%",
                      backgroundColor: "white",
                      borderStyle: "solid",
                      borderColor: "lightgrey",
                      borderWidth: 1,
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      handleButtons(index - 1);
                    }}
                  >
                    <Text
                      style={{
                        color: "grey",
                      }}
                    >
                      Previous
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: widthPercentageToDP(20),
                    height: high / 21.35,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      marginLeft: widthPercentageToDP(-4),
                      width: wid / 3,
                      height: high / 20,
                      backgroundColor: "#319EAE",
                      borderStyle: "solid",
                      borderColor: "#E9E9E9",
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      setViewExplanation((prev: any) => !prev);
                    }}
                  >
                    <Text style={[styles.textStyle]}>View Explanation</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    height: high / 21.35,
                  }}
                >
                  {buttonValue == "Exit" ? (
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: widthPercentageToDP(20),
                        height: "110%",
                        backgroundColor: "#319EAE",
                        borderStyle: "solid",
                        borderColor: "#E9E9E9",
                        borderRadius: 6,
                      }}
                      onPress={() => navigation.goBack()}
                    >
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        {buttonValue}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: widthPercentageToDP(20),
                        height: "110%",
                        backgroundColor: "#319EAE",
                        borderStyle: "solid",
                        borderColor: "#E9E9E9",
                        borderRadius: 6,
                      }}
                      onPress={() => {
                        handleButtons(index + 1);
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        {buttonValue}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {viewExplanation && (
                <View
                  style={{
                    marginTop: heightPercentageToDP(-2),
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    paddingHorizontal: wid / 20,
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={[
                      styles.fontSytle,
                      { fontSize: 20, textAlign: "center" },
                    ]}
                  >
                    Explanation
                  </Text>

                  <RenderHTML
                    contentWidth={wid / 1.28}
                    source={{
                      html: `${quesIndexArray[index].question.explanations}`,
                    }}
                  />
                  <Text
                    style={[
                      styles.fontSytle,
                      { marginTop: 2, fontSize: 16, textAlign: "center" },
                    ]}
                  >
                    Option
                    {" " +
                      quesIndexArray[index].question.answer.toUpperCase() +
                      " "}
                    is the correct answer
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
          <View style={styles.bottomInfoContainer}>
            <View style={styles.bottomContainer}>
              <FontAwesome name="circle" size={10} color="#63a461" />
              <Text style={styles.bottomInfoContainer.font}>Correct</Text>
            </View>
            <View style={styles.bottomContainer}>
              <FontAwesome name="circle-thin" size={10} color="black" />
              <Text style={styles.bottomInfoContainer.font}>Not Attempted</Text>
            </View>
            <View style={styles.bottomContainer}>
              <FontAwesome name="circle" size={10} color="red" />
              <Text style={styles.bottomInfoContainer.font}>Wrong</Text>
            </View>
          </View>
        </View>
      )}
      {/* </ErrorBoundary> */}
    </>
  );
}
const styles = StyleSheet.create({
  bottomContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textStyle: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  fontSytle: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    textAlign: "center",
  },

  bottomInfoContainer: {
    height: high / 25,
    backgroundColor: "#FAFAFB",
    borderTopWidth: 1,
    paddingHorizontal: wid / 15,
    justifyContent: "space-between",

    borderTopColor: "#EFEFEF",
    flexDirection: "row",

    font: { marginLeft: 3, fontFamily: "Poppins-Regular", fontSize: 12 },
  },
});
