import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  View,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";

import { RenderHTML } from "react-native-render-html";
import ExplantionAnwersOption from "./modal/ExplantionAnwersOption";
import HtmlRenderWithMathTag from "./HtmlRenderWithMathTag";

const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;

export default function ExplantionQuestions(props: any) {
  const [answer, setAnswer] = useState("");
  const [viewExplanation, setViewExplanation] = useState<boolean>(false);
  const [buttonValue, setButtonValue] = useState("Next");

  const {
    index,
    setIndex,
    currentSectionTypeQuestoion,

    SumbitTest,
    sectionLength,
    sectionIdx,
    nextSection,
  } = props;
  const source = {
    html: `<b>${index + 1} .</b> ${
      currentSectionTypeQuestoion[index].question.questions
    }`,
  };

  const checkButton = () => {
    if (
      index === currentSectionTypeQuestoion.length - 1 &&
      sectionIdx === sectionLength - 1
    ) {
      setButtonValue("Exit");
    } else if (index == currentSectionTypeQuestoion.length - 1) {
      setButtonValue("Next Section");
    } else {
      setButtonValue("Next");
    }
  };

  let userAnwwer = currentSectionTypeQuestoion[index].userAnswer + "";

  useEffect(() => {
    checkButton();
    setAnswer(userAnwwer != "null" ? userAnwwer.substring(1, 2) : "null");
  }, [index, sectionIdx]);

  const checkIndex = (value: string) => {
    if (value == "increment") {
      if (buttonValue === "Next Section" && sectionIdx + 1 < sectionLength) {
        nextSection(sectionIdx + 1);
      } else if (
        buttonValue === "Next" &&
        value == "increment" &&
        index + 1 < currentSectionTypeQuestoion.length
      ) {
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

  return (
    <>
      {Array.isArray(currentSectionTypeQuestoion) &&
        currentSectionTypeQuestoion?.length > 0 && (
          <ScrollView
            style={{
              backgroundColor: "#FAFAFB",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                right: 10,
                alignSelf: "center",
                marginTop: 2,
                width: wid / 1.2,
                flexDirection: "row",
                backgroundColor: "#FAFBFA",
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
                <View style={{ marginTop: 12, flexDirection: "row" }}>
                  <RenderHTML contentWidth={wid / 1.4} source={source} />
                </View>
              )}
            </View>
            <View style={{ backgroundColor: "#FAFAFB" }}>
              <View
                style={{
                  marginVertical: high / 71.166,
                  backgroundColor: "#FAFAFB",
                  flexDirection: "row",
                }}
              >
                <View>
                  {currentSectionTypeQuestoion[index].question.option1 && (
                    <ExplantionAnwersOption
                      title={"A"}
                      corrctAnswer={
                        currentSectionTypeQuestoion[index].question.answer
                      }
                      userAnswer={userAnwwer}
                      question={
                        currentSectionTypeQuestoion[index].question.option1
                      }
                    />
                  )}
                  {currentSectionTypeQuestoion[index].question.option2 && (
                    <ExplantionAnwersOption
                      title={"B"}
                      corrctAnswer={
                        currentSectionTypeQuestoion[index].question.answer
                      }
                      userAnswer={userAnwwer}
                      question={
                        currentSectionTypeQuestoion[index].question.option2
                      }
                    />
                  )}
                  {currentSectionTypeQuestoion[index].question.option3 && (
                    <ExplantionAnwersOption
                      title={"C"}
                      corrctAnswer={
                        currentSectionTypeQuestoion[index].question.answer
                      }
                      userAnswer={userAnwwer}
                      question={
                        currentSectionTypeQuestoion[index].question.option3
                      }
                    />
                  )}
                  {currentSectionTypeQuestoion[index].question.option4 && (
                    <ExplantionAnwersOption
                      title={"D"}
                      corrctAnswer={
                        currentSectionTypeQuestoion[index].question.answer
                      }
                      userAnswer={userAnwwer}
                      question={
                        currentSectionTypeQuestoion[index].question.option4
                      }
                    />
                  )}
                  {currentSectionTypeQuestoion[index].question.option5 && (
                    <ExplantionAnwersOption
                      title={"E"}
                      corrctAnswer={
                        currentSectionTypeQuestoion[index].question.answer
                      }
                      userAnswer={userAnwwer}
                      question={
                        currentSectionTypeQuestoion[index].question.option5
                      }
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <View
                style={{
                  width: wid / 6,
                  height: high / 21.35,
                }}
              >
                <TouchableOpacity
                  style={styles.previousButton}
                  onPress={() => goBackToPreviousQuestion()}
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

              <View>
                <TouchableOpacity
                  style={{
                    left: wid / 20,
                    alignItems: "center",
                    justifyContent: "center",
                    width: wid / 3,
                    height: high / 20,
                    backgroundColor: "#319EAE",
                    borderStyle: "solid",
                    borderColor: "#E9E9E9",
                    borderRadius: 6,
                  }}
                  onPress={() => setViewExplanation(!viewExplanation)}
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
                    style={styles.sumbitButton}
                    onPress={() => SumbitTest()}
                  >
                    <Text style={styles.textColor}>{buttonValue}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.sumbitButton}
                    onPress={() => {
                      checkIndex("increment");
                    }}
                  >
                    <Text style={styles.textColor}>{buttonValue}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {viewExplanation && (
              <View
                style={{
                  marginTop: -high / 20,
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
                <View
                  style={{
                    alignSelf: "center",
                    width: wid / 1.2,
                    flexDirection: "row",
                    backgroundColor: "#FAFAFB",
                  }}
                >
                  {currentSectionTypeQuestoion[
                    index
                  ].question?.explanations?.includes("<math>") ||
                  currentSectionTypeQuestoion[
                    index
                  ].question?.explanations?.includes("<sup>") ? (
                    <HtmlRenderWithMathTag
                      color={""}
                      source={
                        currentSectionTypeQuestoion[index].question.explanations
                      }
                    />
                  ) : (
                    <View style={{ marginTop: 12 }}>
                      <RenderHTML
                        contentWidth={wid / 1.2}
                        source={{
                          html: `${currentSectionTypeQuestoion[index].question.explanations}`,
                        }}
                      />
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.fontSytle,
                    { marginTop: 2, fontSize: 16, textAlign: "center" },
                  ]}
                >
                  Option
                  {" " +
                    currentSectionTypeQuestoion[
                      index
                    ].question.answer.toUpperCase() +
                    " "}
                  is the correct answer
                </Text>
              </View>
            )}
          </ScrollView>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  upperContainer: {
    width: wid / 1.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fontSytle: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    textAlign: "center",
  },

  textBold: {
    fontFamily: "Poppins-Bold",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    alignSelf: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: wid / 1.1,
    marginBottom: 20,
    backgroundColor: "#fafbfa",
    borderRadius: 20,
    paddingBottom: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    height: high / 25,
    width: wid / 10,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  buttonOpen: {},
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
  previousButton: {
    alignItems: "center",
    justifyContent: "center",
    height: high / 20,
    width: wid / 4,
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 6,
  },
  viewExplButton: {
    left: wid / 20,
    alignItems: "center",
    justifyContent: "center",
    width: wid / 3,
    height: high / 20,
    backgroundColor: "#319EAE",
    borderStyle: "solid",
    borderColor: "#E9E9E9",
    borderRadius: 6,
  },
  sumbitButton: {
    alignItems: "center",
    justifyContent: "center",
    width: wid / 4,
    height: high / 20,
    backgroundColor: "#319EAE",
    borderStyle: "solid",
    borderColor: "#E9E9E9",
    borderRadius: 6,
  },
  buttonContainer: {
    width: wid,
    height: high / 7.16,
    backgroundColor: "#FAFAFB",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: wid / 22,
  },
  textColor: {
    color: "white",
  },
});
