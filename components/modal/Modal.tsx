import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { memo } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import FinishButtonTest from "../FinishTestButton";
import QuestionNoContainer from "../QuestionNoContainer";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
const ResultModal = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    SumbitTest,
    setIndex,
    index,
    nextSection,
    sectionIdx,
    sectionLength,
  } = props;
  const nextSetionButtonHandler = () => {
    if (sectionIdx < sectionLength - 1) {
      nextSection(sectionIdx + 1);
    }
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        style={{ flex: 1 }}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#ffff",
            height: high / 1.13,
            width: "85%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#319EAE",
              height: high / 10,
              paddingHorizontal: "10%",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 26,
                color: "white",
              }}
            >
              {props.currentSection ? props.currentSection : "Daily Quiz"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                backgroundColor: "white",
              }}
            >
              <MaterialCommunityIcons name="close" size={35} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexWrap: "wrap",
              flexDirection: "row",
              paddingBottom: high / 9,
              width: wid / 1.2,
              alignItems: "center",
              paddingHorizontal: 15,
            }}
          >
            {props?.quesIndexArray.map((e: any, idx: any) => {
              return index == idx ? (
                <QuestionNoContainer
                  setModalVisible={setModalVisible}
                  key={idx}
                  setIndex={setIndex}
                  quesno={idx + 1}
                  color={"#319EAE"}
                  setquesIndexArray={props.setquesIndexArray}
                  quesIndexArray={props.quesIndexArray}
                />
              ) : (
                <QuestionNoContainer
                  setModalVisible={setModalVisible}
                  key={idx}
                  quesno={idx + 1}
                  color={
                    e.userAnswer
                      ? "#63a461"
                      : e.skip == true
                      ? "#d94646"
                      : e.isMarkUp == true
                      ? "#8c20d5"
                      : null
                  }
                  setIndex={setIndex}
                  setquesIndexArray={props.setquesIndexArray}
                  quesIndexArray={props.quesIndexArray}
                />
              );
            })}
            {sectionIdx < sectionLength - 1 && (
              <FinishButtonTest
                SumbitTest={nextSetionButtonHandler}
                name={"Next Section"}
                setCurrentSectionId={props.setCurrentSectionId}
                key={"Next Section"}
              />
            )}

            <FinishButtonTest
              SumbitTest={SumbitTest}
              setCurrentSectionId={props.setCurrentSectionId}
              key={2}
            />
          </ScrollView>
        </View>
      </Modal>
      <Pressable
        style={{
          width: 47,
          height: 47,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 11,
        }}
        onPress={() => setModalVisible(true)}
      >
        <SimpleLineIcons name="equalizer" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default memo(ResultModal);
