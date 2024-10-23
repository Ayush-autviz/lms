import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import HeaderNav from "../components/HeaderNav";
import TestCountDownTimer from "../components/TestCountDownTimer";
import { Dimensions } from "react-native";
import axios from "axios";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ExplantionQuestions from "../components/ExplantionQuestions";

const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function ViewExplantionScreen(props: any) {
  const mockTestId = props.route.params.mockTestId;
  const navigation = useNavigation();
  const { goBack } = useNavigation();
  const [quesIndexArray, setquesIndexArray] = useState<any>();
  const { access_token, userDetail } = useStateContext();
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [CurrentSectionId, setCurrentSectionId] = useState("");
  const [testSections, setTestSections] = useState<any>([]);
  const [quesData, setQuestionData] = useState<any>([]);
  const [isSection, setSectionsTrue] = useState(false);
  const [sectionLength, setSectionLength] = useState<number>();
  const [sectionIdx, setSectionIdx] = useState<any>(0);
  const [currentSectionTypeQuestoion, SetCurrentSectionTypeQuestoion] =
    useState<any>([]);
  const config: any = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  useEffect(() => {
    getDataForTest();
  }, []);

  const updateUserMockTestSection = async (element: any): Promise<void> => {};
  const nextSection = (upcomingSection: number) => {
    filterTheQuestionOnUpcomingSection(quesData, upcomingSection, testSections);
    setCurrentSection(testSections[upcomingSection].subject.subjectName);
    setCurrentSectionId(testSections[upcomingSection].subjectId);
    setSectionIdx(upcomingSection);
  };
  const filterTheQuestionOnUpcomingSection = (
    ALlQuestion: any,
    upcomingSection: number,
    AllTestSection: any[]
  ) => {
    ALlQuestion.map((e: any) => console.log("fdsaflkasjfsadjf", e));
    let FilterQuestion: any = ALlQuestion?.filter(
      (ques: any) =>
        ques.question.subjectId == AllTestSection[upcomingSection].subjectId
    );
    if (FilterQuestion.length === 0) {
      nextSection(upcomingSection + 1);
    }
    SetCurrentSectionTypeQuestoion(FilterQuestion);
  };
  const getQuestions = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": " application/json",
        "Abp-TenantId": "1",
      },
    };
    return axios.get(
      `${baseUrl}/api/services/app/MockTestResultService/GetResultById?id=${mockTestId}`,
      config
    );
  };

  const getTestSections = async () => {
    return axios.get(
      `${baseUrl}/api/services/app/MockTest/GetMockTestSection?mockTestId=${mockTestId}`,
      config
    );
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
  const Exit = () => {
    goBack();
  };
  const getDataForTest = async () => {
    try {
      const [GetUserMockTestSectionResponse, getQuestionsResponse] =
        await Promise.all([getTestSections(), getQuestions()]);

      let comingSectionFromQuestion = new Set(
        getQuestionsResponse.data.result.map(
          (value: any) => value.question?.subject?.subjectName
        )
      );

      const seenSubject = new Set();

      let uniqueTestSection: any = [];

      GetUserMockTestSectionResponse.data.result.forEach((element: any) => {
        if (
          !seenSubject.has(element.subject.subjectName) &&
          comingSectionFromQuestion.has(element.subject.subjectName)
        ) {
          seenSubject.add(element.subject.subjectName);
          uniqueTestSection.push(element);
        }
      });

      await new Promise((resolve) => {
        setTestSections(uniqueTestSection);
        resolve("setting state Async");
      });

      setSectionLength(uniqueTestSection.length);
      setQuestionData(getQuestionsResponse.data.result);

      setIndex(0);
      setSectionIdx(0);
      setCurrentSection(uniqueTestSection[0].subject.subjectName);
      filterTheQuestionOnUpcomingSection(
        getQuestionsResponse.data.result,
        0,
        uniqueTestSection
      );
      setCurrentSectionId(uniqueTestSection[0].subjectId);


      setSectionsTrue(true);
      setLoading(false);
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  return (
    <>
      {loading || !Array.isArray(currentSectionTypeQuestoion) || !isSection ? (
        <View style={{ backgroundColor: "#F7F7F7", flex: 1 }}>
          <HeaderNav name="Explanation" navigation={props.navigation} />
          <View style={{ alignSelf: "center", top: high / 4.5 }}>
            <ActivityIndicator size="large" color="#319EAE" />
          </View>
        </View>
      ) : isSection ? (
        <View
          style={{
            backgroundColor: "#FAFAFB",
            height: "100%",
            marginBottom: 50,
          }}
        >
          <>
            <View style={{ backgroundColor: "#F7F7F7" }}>
              <HeaderNav name="Explanation" navigation={props.navigation} />
            </View>
            <View style={{ backgroundColor: "#FAFAFB" }}>
              <TestCountDownTimer
                SumbitTest={Exit}
                index={index}
                setIndex={setIndex}
                quesIndexArray={currentSectionTypeQuestoion}
                duration={"resultPage"}
                sectionIdx={sectionIdx}
                sectionLength={sectionLength}
                nextSection={nextSection}
                setquesIndexArray={setquesIndexArray}
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
                        onPress={() => nextSection(idx)}
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
            {currentSectionTypeQuestoion?.length != 0 && (
              <ExplantionQuestions
                setCurrentSection={setCurrentSection}
                setCurrentSectionId={setCurrentSectionId}
                setquesIndexArray={setquesIndexArray}
                CurrentSectionId={CurrentSectionId}
                quesData={quesData}
                mockid={mockTestId}
                index={index}
                setIndex={setIndex}
                nextSection={nextSection}
                SumbitTest={Exit}
                SetCurrentSectionTypeQuestoion={SetCurrentSectionTypeQuestoion}
                currentSectionTypeQuestoion={currentSectionTypeQuestoion}
                testSections={testSections}
                setSectionIdx={setSectionIdx}
                sectionLength={sectionLength}
                sectionIdx={sectionIdx}
                updateUserMockTestSection={updateUserMockTestSection}
                paramsData={props.route.params.data}
                studentId={userDetail.id}
              />
            )}
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
    bottom: 10,
    borderTopColor: "#EFEFEF",
    flexDirection: "row",

    font: { marginLeft: 3, fontFamily: "Poppins-Regular", fontSize: 12 },
  },
});
