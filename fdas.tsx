import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  View,
  StyleSheet,
} from "react-native";
import moment from "moment-timezone";
import { ActivityIndicator } from "react-native-paper";
import HeaderNav from "../components/HeaderNav";
import TestCountDownTimer from "../components/TestCountDownTimer";
import { Text } from "../components/Themed";
import { Dimensions } from "react-native";
import axios from "axios";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl, KEYS } from "../utils";
import { StackActions, useNavigation } from "@react-navigation/native";
import CurrentSectionQuestion from "../components/CurrentSubject";
import { Storage } from "../utils/LocalStorage";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function MockTestSubjectTest(props: any) {
  const { id, isReattempt, isDeleted, mockTestId, studentId } =
    props.route.params.data;
  const navigation = useNavigation();
  const [quesIndexArray, setquesIndexArray] = useState<any>();
  const [duration, setDuration] = useState<any>();
  const { index, setIndex, access_token, userDetail, questionLength } =
    useStateContext();
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState("");
  const [CurrentSectionId, setCurrentSectionId] = useState("");
  const [testSections, setTestSections] = useState<any>([]);
  const [quesData, setQuestionData] = useState<any>([]);
  const [isSection, setSectionsTrue] = useState(false);
  const [sectionLength, setSectionLength] = useState<number>();
  const [timeSectionData, settimeSectionData] = useState<any>([]);
  const [sectionIdx, setSectionIdx] = useState<any>(0);
  const [currentSectionTypeQuestoion, SetCurrentSectionTypeQuestoion] =
    useState<any | any[]>(null);

  const config: any = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const nextSection = (upcomingSection: number): void => {
    Storage.setItem(
      `${KEYS.TAB}${mockTestId}`,
      JSON.stringify(upcomingSection)
    );
    Storage.setItem(
      `${userDetail.id}${currentSectionTypeQuestoion[index].mockTestId}`,
      JSON.stringify(0)
    );

    SetCurrentSectionTypeQuestoion(
      quesData.filter(
        (e: any) =>
          e?.question?.subjectId == testSections[upcomingSection].subjectId
      )
    );
    setIndex(0);
    setCurrentSection(testSections[upcomingSection].subject.subjectName);
    if (
      testSections[upcomingSection].duration != 0 &&
      testSections[upcomingSection].duration
    ) {
      setDuration(testSections[upcomingSection].duration * 60000);
    }
    setCurrentSectionId(testSections[upcomingSection].subjectId);
    setSectionIdx(upcomingSection);
    updateUserMockTestSection(testSections[upcomingSection]);
  };

  const getQuestions = async (sectionId: any): Promise<void> => {
    setLoading(true);
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": " application/json",
          "Abp-TenantId": "1",
        },
      };
      let url = `${baseUrl}/api/services/app/MockTestUserAns/GetMockTestById?Id=${mockTestId}`;
      if (isReattempt == "isReattempt") {
        url = `${baseUrl}/api/services/app/MockTestUserAns/GetMockTestById?Id=${mockTestId}&isReattempt=true`;
      } else if (isDeleted == "isResume") {
        url = `${baseUrl}/api/services/app/MockTestUserAns/GetMockTestById?Id=${mockTestId}&isResume=true`;
      }
      const res = await axios.get(url, config);
      console.log("QuetionApi", res);
      SetCurrentSectionTypeQuestoion(
        res.data.result.filter((e: any) => e.question.subjectId == sectionId)
      );

      if (res.data.result) {
        await setQuestionData(res.data.result);
      }
      setLoading(false);
    } catch (error) {
      console.log("Quetion Api", error);
    }
  };

  const GetUserMockTestSection = async (): Promise<void> => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTestUserAns/GetUserMockTestSection?mocktestId=${mockTestId}&userId=${studentId}`,
        config
      );
      settimeSectionData(res.data.result);
      if (res.data?.result[0]?.duration && res.data.result[0].duration != 0) {
        if (isDeleted != "isResume")
          timerStart(res.data.result[0].duration, res.data.result[0]);
        else {
          let tabIdx: any = await Storage.getItem(`${KEYS.TAB}${mockTestId}`);
          timerStart(res.data.result[tabIdx].duration, res.data.result[tabIdx]);
        }
      }

      console.log("GetUserMockTestSection 3333", res);
    } catch (error) {
      console.log(error, "GetUserMockTestSection");
    }
  };
  const timerStart = (duration: any, data: any): void => {
    const startTime = moment().subtract(5, "hours").subtract(30, "minutes");
    let endTime = moment(data.creationTime).add(duration, "minute");
    let diff = endTime.diff(startTime, "millisecond");

    console.log("duff", diff);
    console.log("startTime", startTime.format());
    console.log("endTime", endTime.format());
    setDuration(diff);
    if (isReattempt == "isReattempt") {
      setDuration(duration * 60000);
    }
  };
  const updateUserMockTestSection = async (element: any): Promise<void> => {
    element.creationTime = moment();
    var config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": " application/json",
        "Abp-TenantId": "1",
      },
    };
    console.log("element", element);
    const data = JSON.stringify(element);
    try {
      const res = await axios.put(
        `${baseUrl}/api/services/app/MockTestUserAns/UpdateUserMockTestSection`,
        data,
        config
      );
      console.log("upated the Time", res);
    } catch (error) {
      console.log("failer to update the time");
    }
  };
  const getTestSections = async (): Promise<void> => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTest/GetMockTestSection?mockTestId=${mockTestId}`,
        config
      );
      if (res.data.result != null && testSections.length < 1) {
        if (isDeleted == "isResume") {
          let idx: any = await Storage.getItem(`${studentId}${mockTestId}`);
          let tabIdx: any = await Storage.getItem(`${KEYS.TAB}${mockTestId}`);
          setTestSections(res.data.result);
          setSectionLength(res.data.result.length);
          setCurrentSection(
            res.data.result[parseInt(tabIdx ? tabIdx : 0)].subject.subjectName
          );
          setCurrentSectionId(
            res.data.result[parseInt(tabIdx ? tabIdx : 0)].subjectId
          );
          setSectionsTrue(true);
          setIndex(parseInt(idx));
          getQuestions(res.data.result[sectionIdx].subjectId);
        } else {
          setTestSections(res.data.result);
          setSectionLength(res.data.result.length);
          setCurrentSection(res.data.result[sectionIdx].subject.subjectName);
          setCurrentSectionId(res.data.result[sectionIdx].subjectId);
          setSectionsTrue(true);
          setIndex(0);
          getQuestions(res.data.result[sectionIdx].subjectId);
        }
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  const SumbitTest = async (title: any): Promise<void> => {
    if (title) {
      await GetResultById(), await afterSubmit(title);
    } else {
      Alert.alert(
        "Are you sure...",
        "Do you want to Submit the Mocktest...!!",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              GetResultById(), afterSubmit(null);
            },
          },
        ]
      );
    }
  };
  const afterSubmit = (title: any): void => {
    Alert.alert(
      title ? title : "Congratulation...!!",
      "Your Test is Submitted",
      [
        {
          text: "View Result",
          onPress: () => {
            navigation.dispatch(
              StackActions.replace("TestResult", { id: mockTestId })
            );
          },
        },
      ]
    );
  };
  const GetResultById = async (): Promise<void> => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": " application/json",
          "Abp-TenantId": "1",
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTestResultService/GetResultById?id=${mockTestId}`,
        config
      );
      console.log("GoTResult", res.data.result);

      Storage.removeItem(`${studentId}${mockTestId}`);
      if (res.data.result) SaveResult(res.data.result);
    } catch (error) {
      console.log("GetResultById API Hit Failed", error);
    }
  };
  const SaveResult = async (payload: any): Promise<void> => {
    console.log("payload", payload);
    var data = JSON.stringify(payload);
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/MockTestUserAns/SaveResult`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "Abp-TenantId": "1",
      },
      data: data,
    };

    await axios(config)
      .then(function (response: any) {
        console.log(response, "getResult");
        MarkIsSubmitted(id);
      })
      .catch(function (error: any) {
        console.log("grtResultApi Failed", error);
      });
  };
  const MarkIsSubmitted = async (id: any): Promise<void> => {
    let config: any = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": " application/json",
        "Abp-TenantId": "1",
      },
    };
    try {
      const res = await axios.post(
        `${baseUrl}/api/services/app/EnrollMockTest/MarkIsSubmitted?id=${id}`,
        config
      );
      Storage.removeItem(`${studentId}${mockTestId}`);
      Storage.removeItem(`${KEYS.TAB}${mockTestId}`);
      console.log("MarkIsSubmitted Api Hit Sucees");
    } catch (error) {
      console.log("MarkIsSubmitted", error);
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
  useEffect(() => {
    GetUserMockTestSection();
    getTestSections();
  }, []);
  return (
    <>
      {loading || !currentSectionTypeQuestoion ? (
        <View style={{ backgroundColor: "#F7F7F7", flex: 1 }}>
          <HeaderNav name="Test" navigation={props.navigation} />
          <View style={{ alignSelf: "center", top: high / 4.5 }}>
            <ActivityIndicator size="large" color="#319EAE" />
          </View>
        </View>
      ) : currentSectionTypeQuestoion && isSection ? (
        <View
          style={{
            backgroundColor: "#FAFAFB",
            height: "100%",
            marginBottom: 50,
          }}
        >
          <>
            <View style={{ backgroundColor: "#F7F7F7" }}>
              <HeaderNav name="Test" navigation={props.navigation} />
            </View>
            <View style={{ backgroundColor: "#FAFAFB" }}>
              <TestCountDownTimer
                SumbitTest={SumbitTest}
                quesIndexArray={currentSectionTypeQuestoion}
                duration={
                  duration
                    ? duration
                    : timerStart(
                        quesData[0].mockTest.duration,
                        timeSectionData[0]
                      )
                }
                sectionIdx={sectionIdx}
                sectionLength={sectionLength}
                nextSection={nextSection}
                currentSection={currentSection}
                CurrentSectionId={CurrentSectionId}
                setCurrentSectionId={setCurrentSectionId}
              />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{
                  width: wid,
                  height: high / 20,
                  left: 10,
                  backgroundColor: "#FAFAFB",
                }}
                contentContainerStyle={{
                  alignContent: "flex-start",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {testSections?.map((data: any, idx: number) => {
                  return (
                    <View key={idx}>
                      <TouchableOpacity
                        style={{
                          marginHorizontal: 6,
                          paddingHorizontal: 10,
                          backgroundColor:
                            currentSection === data.subject.subjectName
                              ? "#498BEA"
                              : "lightgrey",
                          flexDirection: "row",
                          height: "100%",
                          borderRadius: 15,
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              currentSection === data.subject.subjectName
                                ? "white"
                                : "black",
                            alignSelf: "center",
                            height: "100%",
                            fontFamily: "Poppins-Medium",
                            fontSize: 12,
                            textAlignVertical: "center",
                          }}
                        >
                          {data.subject.subjectName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>

            <CurrentSectionQuestion
              setquesIndexArray={setquesIndexArray}
              CurrentSectionId={CurrentSectionId}
              mockid={mockTestId}
              nextSection={nextSection}
              SumbitTest={SumbitTest}
              currentSectionTypeQuestoion={currentSectionTypeQuestoion}
              sectionLength={sectionLength}
              sectionIdx={sectionIdx}
              updateUserMockTestSection={updateUserMockTestSection}
              paramsData={props.route.params.data}
              studentId={studentId}
            />
          </>
          {/* <View style={styles.bottomInfoContainer}>
            <View style={styles.bottomContainer}>
              <FontAwesome name="circle" size={10} color="#63a461" />
              <Text style={styles.bottomInfoContainer.font}>Answered</Text>
            </View>
            <View style={styles.bottomContainer}>
              <FontAwesome name="circle-thin" size={10} color="black" />
              <Text style={styles.bottomInfoContainer.font}>Not Attempted</Text>
            </View>
            <View style={styles.bottomContainer}>
              <FontAwesome name="circle" size={10} color="#DA9F2C" />
              <Text style={styles.bottomInfoContainer.font}>Not Answered</Text>
            </View>
          </View> */}
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  bottomContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomInfoContainer: {
    height: high / 25,
    backgroundColor: "#FAFAFB",
    borderTopWidth: 1,
    paddingHorizontal: wid / 15,
    justifyContent: "space-between",
    bottom: 50,
    borderTopColor: "#EFEFEF",
    flexDirection: "row",

    font: { marginLeft: 3, fontFamily: "Poppins-Regular", fontSize: 12 },
  },
});
