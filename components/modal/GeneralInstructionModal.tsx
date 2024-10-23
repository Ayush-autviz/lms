import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { widthPercentageToDP } from "../../lib/ResonsiveDimesions";
const high = Dimensions.get("window").height;

const wid = Dimensions.get("window").width;

const GeneralInstructionModal = ({
  onPressFunction,
  name,
  buttonTitle,
}: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.modalView}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View style={styles.upperContainer}>
              <Text
                style={[
                  styles.fontSytle,
                  {
                    fontSize: 20,
                    width: widthPercentageToDP(63),
                  },
                ]}
                numberOfLines={1}
              >
                {name}
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>X</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            </View>
            <View style={{ marginTop: 4 }}>
              <Text style={[styles.fontSytle, { fontSize: 16 }]}>
                Please read the following instructions carefully
              </Text>
              <Text style={[styles.fontSytle, { fontSize: 20 }]}>
                General Instructions:
              </Text>
              <View>
                <Text style={styles.fontSytle}>
                  <Text style={[styles.fontSytle, styles.textBold]}>1</Text>
                  The clock has been set at the server and the countdown timer
                  at the top right corner of your screen will display the time
                  remaining for you to complete the exam. When the clock runs
                  out the exam ends by default - you are not required to end or
                  submit your exam.
                </Text>
              </View>
              <View></View>
              <View>
                <View
                  style={{
                    height: high / 3.8,
                    justifyContent: "space-between",
                    paddingVertical: high / 60,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "#ddd",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: wid / 40,
                      }}
                    >
                      <Text style={styles.fontSytle}>1</Text>
                    </View>
                    <Text style={[styles.fontSytle]}>
                      You have not visited the question yet.
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "#f52020",
                        alignItems: "center",
                        backgroundColor: "#f52020",
                        justifyContent: "center",
                        marginRight: wid / 40,
                      }}
                    >
                      <Text style={[styles.fontSytle, { color: "white" }]}>
                        3
                      </Text>
                    </View>
                    <Text style={[styles.fontSytle]}>
                      You have not answered the question.
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "#06af00",
                        alignItems: "center",
                        backgroundColor: "#06af00",
                        justifyContent: "center",
                        marginRight: wid / 40,
                      }}
                    >
                      <Text style={[styles.fontSytle, { color: "white" }]}>
                        5
                      </Text>
                    </View>
                    <Text style={[styles.fontSytle]}>
                      You have answered the question.
                    </Text>
                  </View>
                  <View
                    style={{
                      maxWidth: wid / 1.4,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "#8c20d5",
                        alignItems: "center",
                        backgroundColor: "#8c20d5",
                        justifyContent: "center",
                        marginRight: wid / 40,
                      }}
                    >
                      <Text style={[styles.fontSytle, { color: "white" }]}>
                        7
                      </Text>
                    </View>
                    <Text style={[styles.fontSytle]}>
                      You have NOT answered the question but have marked the
                      question for review.
                    </Text>
                  </View>
                  <View
                    style={{
                      maxWidth: wid / 1.5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "#8c20d5",
                        alignItems: "center",
                        backgroundColor: "#8c20d5",
                        justifyContent: "center",
                        marginRight: wid / 40,
                      }}
                    >
                      <Text style={[styles.fontSytle, { color: "white" }]}>
                        9
                      </Text>
                    </View>
                    <Text style={[styles.fontSytle]}>
                      You have answered the question but marked it for review.
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.fontSytle}>
                  The Marked for Review status simply acts as a reminder that
                  you have set to look at the question again{" "}
                  <Text style={[styles.fontSytle, , { color: "red" }]}>
                    If an answer is selected for a question that is Marked for
                    Review, the answer will be considered in the final
                    evaluation.
                  </Text>
                </Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.fontSytle}>
                  <Text style={[styles.fontSytle, styles.textBold]}>3 </Text>
                  To select a question to answer, you can do one of the
                  following: a. Click on the question number on the question
                  palette at the right of your screen to go to that numbered
                  question directly. Note that using this option does NOT save
                  your answer to the current question. b.Click on Save and Next
                  to save answer to current question and to go to the next
                  question in sequence. c.Click on Mark for Review to save
                  answer to current question, mark it for review, and to go to
                  the next question in sequence.
                </Text>
              </View>
              <View>
                <Text style={styles.fontSytle}>
                  <Text style={[styles.fontSytle, styles.textBold]}>4 </Text>
                  You can view the entire paper by clicking on the
                  <Text style={[styles.fontSytle, styles.textBold]}>
                    {" "}
                    Question Paper{" "}
                  </Text>
                  button.
                </Text>
              </View>
              <View>
                <Text style={[styles.fontSytle, { fontSize: 16 }]}>
                  Answering questions:
                </Text>
                <View>
                  <Text style={styles.fontSytle}>
                    <Text style={[styles.fontSytle, styles.textBold]}>5 </Text>
                    For multiple choice type question: a.To select your answer,
                    click on one of the option buttons b.To change your answer,
                    click the another desired option button c.To save your
                    answer, you MUST click on{" "}
                    <Text style={[styles.fontSytle, styles.textBold]}>
                      Save & Next{" "}
                    </Text>
                    . d.To deselect a chosen answer, click on the chosen option
                    again or click on the{" "}
                    <Text style={[styles.fontSytle, styles.textBold]}>
                      Clear Response{" "}
                    </Text>{" "}
                    Clear Response button. e.To mark a question for review click
                    on{" "}
                    <Text style={[styles.fontSytle, styles.textBold]}>
                      Mark for Review.{" "}
                    </Text>{" "}
                    <Text style={[styles.fontSytle, { color: "red" }]}>
                      If an answer is selected for a question that is Marked for
                      Review, the answer will be considered in the final
                      evaluation.
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text style={styles.fontSytle}>
                    <Text style={[styles.fontSytle, styles.textBold]}>6 </Text>
                    To change an answer to a question, first select the question
                    and then click on the new answer option followed by a click
                    on the{" "}
                    <Text style={[styles.fontSytle, styles.textBold]}>
                      Save & Next
                    </Text>{" "}
                    button.
                  </Text>
                </View>
                <View>
                  <Text style={styles.fontSytle}>
                    <Text style={[styles.fontSytle, styles.textBold]}>7 </Text>
                    Questions that are saved or marked for review after
                    answering will ONLY be considered for evaluation.
                  </Text>
                </View>
              </View>
              <View>
                <Text style={[styles.fontSytle, { fontSize: 16 }]}>
                  Navigating through section:
                </Text>
                <View>
                  <Text style={styles.fontSytle}>
                    <Text style={[styles.fontSytle, styles.textBold]}>8 </Text>
                    Sections in this question paper are displayed on the top bar
                    of the screen. Questions in a section can be viewed by
                    clicking on the section name. The section you are currently
                    viewing is highlighted.
                  </Text>
                </View>
                <View>
                  <Text style={styles.fontSytle}>
                    <Text style={[styles.fontSytle, styles.textBold]}>9 </Text>
                    After clicking the{" "}
                    <Text style={[styles.fontSytle, styles.textBold]}>
                      Save & Next
                    </Text>{" "}
                    button on the last question for a section, you will
                    automatically be taken to the first question of the next
                    section.
                  </Text>
                </View>
                <View>
                  <Text style={styles.fontSytle}>
                    <Text style={[styles.fontSytle, styles.textBold]}>10 </Text>
                    10. You can move the mouse cursor over the section names to
                    view the status of the questions for that section.
                  </Text>
                  <Text style={styles.fontSytle}>
                    <Text style={[styles.fontSytle, styles.textBold]}>11 </Text>
                    10. You can move the mouse cursor over the section names to
                    view the status of the questions for that section.
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  marginBottom: 50,
                  marginTop: 20,
                  backgroundColor: "#319EAE",
                  width: wid / 3,
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  height: high / 22.5,
                  borderRadius: 4,
                }}
                onPress={() => {
                  setModalVisible(false), onPressFunction();
                }}
              >
                <Text style={[styles.fontSytle, { color: "#fff" }]}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          backgroundColor: "#319EAE",
          width: wid / 4,
          justifyContent: "center",
          alignContent: "center",
          height: high / 25.5,
          borderRadius: 4,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.textStyle]}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  },
  textBold: {
    fontFamily: "Poppins-Bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
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
});

export default GeneralInstructionModal;
