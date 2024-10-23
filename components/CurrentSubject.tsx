import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  View,
} from "react-native";
import React, { FC, Fragment, useEffect, useState } from "react";
import { useStateContext } from "../screens/Context/ContextProvider";
import AnswerOption from "./AnswerOption";
import moment from "moment";
import { Storage } from "../utils/LocalStorage";
import HtmlRenderWithMathTag from "./HtmlRenderWithMathTag";
import { putData } from "../api/SubjectService/sever";
import RenderHTML from "react-native-render-html";
import {
  widthPercentageToDP,
} from "../lib/ResonsiveDimesions";

const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
const CurrentSectionQuestion: FC<any> = ({
  currentSectionTypeQuestoion,
  sectionLength,
  sectionIdx,
  SumbitTest,
  nextSection,
  studentId,
  index,
  setIndex,
}) => {
  const { access_token } = useStateContext();
  const [answer, setAnswer] = useState("");
  const [buttonValue, setButtonValue] = useState("Next");
  const userAnweredThisQuestion = (currIndex: number) => {
    if (currentSectionTypeQuestoion[currIndex]?.userAnswer) {
      setAnswer(currentSectionTypeQuestoion[currIndex]?.userAnswer);
    }
  };
  const changeValue = (actionType: any) => {
    currentSectionTypeQuestoion[index].creationTime = moment();
    currentSectionTypeQuestoion[index].userAnswer = answer ? answer : "";
    currentSectionTypeQuestoion[index].skip =
      actionType == "skip" ? true : false;
    currentSectionTypeQuestoion[index].isMarkUp =
      actionType == "markup" ? true : false;
  };
  const updateUserAnswer = async (actionType: string) => {
    changeValue(actionType);
    try {
      const res = putData(
        "/api/services/app/MockTestUserAns/UpdateMockUserAns",
        currentSectionTypeQuestoion[index]
      );
      setAnswer("");
      Storage.setItem(
        `${studentId}${currentSectionTypeQuestoion[index].mockTestId}`,
        JSON.stringify(index)
      );
      res?.then((value: any) => console.log("Anser Updated", value));
    } catch (error) {
      console.log("Error");
    }
  };

  const checkButton = () => {
    if (
      index === currentSectionTypeQuestoion.length - 1 &&
      sectionIdx === sectionLength - 1
    ) {
      setButtonValue("Submit");
    } else if (index == currentSectionTypeQuestoion.length - 1) {
      setButtonValue("Next Section");
    } else {
      setButtonValue("Next");
    }
  };
  const checkHaveToUpdateAnswer = () => {
    return currentSectionTypeQuestoion[index].userAnswer !== answer
      ? true
      : false;
  };

  const checkIndex = (value: string) => {
    if (value == "increment") {
      if (buttonValue === "Next Section" && sectionIdx + 1 < sectionLength) {
        if (checkHaveToUpdateAnswer()) updateUserAnswer("");

        nextSection(sectionIdx + 1);
      } else if (
        buttonValue === "Next" &&
        value == "increment" &&
        index + 1 < currentSectionTypeQuestoion.length &&
        answer
      ) {
        if (checkHaveToUpdateAnswer()) updateUserAnswer("");
        userAnweredThisQuestion(index + 1);
        setIndex((prev: number) => prev + 1);
      }
    }
  };
  const goBackToPreviousQuestion = () => {
    if (index - 1 >= 0) {
      setIndex((prev: number) => prev - 1);
      setAnswer(currentSectionTypeQuestoion[index - 1].userAnswer);
    }
  };
  const skip = () => {
    if (index + 1 < currentSectionTypeQuestoion.length) {
      updateUserAnswer("skip");
      userAnweredThisQuestion(index + 1);
      setIndex((prev: number) => prev + 1);
    }
  };
  const submitMockTest = () => {
    updateUserAnswer(access_token);

    SumbitTest();
  };
  const onMarkUpClick = () => {
    if (answer != "") updateUserAnswer("");
    updateUserAnswer("markup");
    userAnweredThisQuestion(index + 1);
    if (index < currentSectionTypeQuestoion.length - 1) {
      setIndex(index + 1);
    }
  };
  const source = {
    html: `<b> ${index + 1} . </b>${
      currentSectionTypeQuestoion[index].question?.questions
    }`,
  };
  console.log(
    "currentQUetsion",
    currentSectionTypeQuestoion[index].question?.questions
  );
  useEffect(() => {
    checkButton();
  }, [index, sectionIdx]);
  return (
    <>
      {Array.isArray(currentSectionTypeQuestoion) &&
        currentSectionTypeQuestoion?.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: "#FAFAFB",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                right: 10,
                alignSelf: "center",
                width: wid / 1.2,
                flexDirection: "row",
                backgroundColor: "#FAFAFB",
              }}
            >
              {currentSectionTypeQuestoion[index].question?.questions?.includes(
                "<math>"
              ) ||
              currentSectionTypeQuestoion[index].question?.questions?.includes(
                "<sup>"
              ) ? (
                <Fragment>
                  <HtmlRenderWithMathTag
                    color={""}
                    source={`<b> ${index + 1} . </b>${
                      currentSectionTypeQuestoion[index].question.questions
                    }`}
                  />
                </Fragment>
              ) : (
                <View style={{ marginTop: 12 }}>
                  <RenderHTML contentWidth={wid / 1.2} source={source} />
                </View>
              )}
            </View>
            <View style={{ backgroundColor: "#FAFAFB" }}>
              <View
                style={{
                  marginVertical: high / 71.166,
                  backgroundColor: "#FAFAFB",
                }}
              >
                <TouchableOpacity onPress={() => {
    if (answer === 'a') {
      setAnswer('');
    } else {
      setAnswer('a');
    }}}>
                  {answer == "a" ? (
                    <AnswerOption
                      key={1}
                      title={"A"}
                      text={currentSectionTypeQuestoion[index].question.option1}
                      isSelected={"isSelected"}
                    />
                  ) : (
                    <AnswerOption
                      key={2}
                      title={"A"}
                      text={currentSectionTypeQuestoion[index].question.option1}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
    if (answer === 'b') {
      setAnswer('');
    } else {
      setAnswer('b');
    }}}>
                  {answer == "b" ? (
                    <AnswerOption
                      key={3}
                      title={"B"}
                      text={currentSectionTypeQuestoion[index].question.option2}
                      isSelected={"isSelected"}
                    />
                  ) : (
                    <AnswerOption
                      key={4}
                      title={"B"}
                      text={currentSectionTypeQuestoion[index].question.option2}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
    if (answer === 'c') {
      setAnswer('');
    } else {
      setAnswer('c');
    }}}>
                  {answer == "c" ? (
                    <AnswerOption
                      key={5}
                      title={"C"}
                      text={currentSectionTypeQuestoion[index].question.option3}
                      isSelected={"isSelected"}
                    />
                  ) : (
                    <AnswerOption
                      key={6}
                      title={"C"}
                      text={currentSectionTypeQuestoion[index].question.option3}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
    if (answer === 'd') {
      setAnswer('');
    } else {
      setAnswer('d');
    }}}>
                  {answer == "d" ? (
                    <AnswerOption
                      key={8}
                      title={"D"}
                      text={currentSectionTypeQuestoion[index].question.option4}
                      isSelected={"isSelected"}
                    />
                  ) : (
                    <AnswerOption
                      key={9}
                      title={"D"}
                      text={currentSectionTypeQuestoion[index].question.option4}
                    />
                  )}
                </TouchableOpacity>
                {currentSectionTypeQuestoion[index].question.option5 && (
                  <TouchableOpacity onPress={() => {
                    if (answer === 'e') {
                      setAnswer('');
                    } else {
                      setAnswer('e');
                    }}}>
                    {answer == "e" ? (
                      <AnswerOption
                        key={10}
                        title={"E"}
                        text={
                          currentSectionTypeQuestoion[index].question.option5
                        }
                        isSelected={"isSelected"}
                      />
                    ) : (
                      <AnswerOption
                        key={11}
                        title={"E"}
                        text={
                          currentSectionTypeQuestoion[index].question.option5
                        }
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View
              style={{
                width: wid,
                height: high / 7.16,
                backgroundColor: "#FAFAFB",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "flex-start",
                paddingHorizontal: wid / 19.2,
              }}
            >
              <View
                style={{
                  top: "5%",
                  width: "18%",
                  height: high / 21.35,
                  margin: 7,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "110%",
                    width: widthPercentageToDP(18),
                    backgroundColor: "white",
                    borderStyle: "solid",
                    borderColor: "lightgrey",
                    borderWidth: 1,
                    borderRadius: 6,
                  }}
                  onPress={() => goBackToPreviousQuestion()}
                >
                  <Text
                    style={{
                      ...styles.buttonFont,
                      color: "grey",
                    }}
                  >
                    Previous
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  top: "5%",
                  width: "18%",
                  height: high / 21.35,
                  margin: 7,
                  marginRight: wid / 19,
                  alignSelf: "flex-start",
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
                    skip();
                  }}
                >
                  <Text
                    style={{
                      ...styles.buttonFont,
                      color: "grey",
                    }}
                  >
                    Skip
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  top: "5%",
                  width: "18%",
                  height: high / 21.35,
                  margin: 7,
                }}
              >
                <TouchableOpacity
                  onPress={() => onMarkUpClick()}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",

                    height: "110%",
                    backgroundColor: "#319EAE",
                    borderStyle: "solid",
                    borderColor: "#E9E9E9",
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      ...styles.buttonFont,
                      color: "white",
                    }}
                  >
                    Markup
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  top: "5%",
                  width: "18%",
                  height: high / 21.35,
                  margin: 7,
                }}
              >
                {buttonValue == "Submit" ? (
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: widthPercentageToDP(23.7),
                      height: "110%",
                      backgroundColor: "#319EAE",
                      borderStyle: "solid",
                      borderColor: "#E9E9E9",
                      borderRadius: 6,
                    }}
                    onPress={() => submitMockTest()}
                  >
                    <Text
                      style={{
                        ...styles.buttonFont,
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
                      width: widthPercentageToDP(23.7),
                      height: "110%",
                      backgroundColor: "#319EAE",
                      borderStyle: "solid",
                      borderColor: "#E9E9E9",
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      checkIndex("increment");
                    }}
                  >
                    <Text
                      style={{
                        ...styles.buttonFont,
                        color: "white",
                      }}
                    >
                      {buttonValue}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        )}
    </>
  );
};

export default CurrentSectionQuestion;

const styles = StyleSheet.create({
  buttonFont: {
    fontFamily: "Poppins-Regular",
    fontSize: widthPercentageToDP(3.2),
  },
});
