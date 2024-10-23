import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import ResultModal from "./modal/Modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
function TestCountDownTimer(props) {
  const [notNumber, setNotNumber] = useState(false);
  const {
    duration,
    quesIndexArray,
    setquesIndexArray,
    currentSection,
    setCurrentSectionId,
    CurrentSectionId,
    SumbitTest,
    nextSection,
    setIndex,
    sectionIdx,
    index,
    sectionLength,
    setDuration
  } = props;
  //const [time, setTime] = useState(duration);

  useEffect(() => {
    let setTimoutId;
  
    // Check if duration is a valid number
    if (isNaN(duration)) {
      // Handle invalid duration
      return;
    }
  
    if (duration <= 1) {
      // Handle when duration is less than or equal to 1
      if (sectionIdx < sectionLength - 1) {
        nextSection(sectionIdx + 1);
      } else {
        SumbitTest("Your Time Is Over");
      }
    } else {
      setTimoutId = setTimeout(() => {
        setDuration((prevtime) => prevtime - 200); // Update duration state
      }, 200);
    }
  
    return () => clearTimeout(setTimoutId); // Clear timeout
  }, [duration, sectionIdx, sectionLength]);

  function getFormattedTime(milliseconds) {
    let totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    let totalMinute = parseInt(Math.floor(totalSeconds / 60));
    let totalHours = parseInt(Math.floor(totalMinute / 60));
    let seconds = parseInt(totalSeconds % 60);
    let minute = parseInt(totalMinute % 60);
    let hours = parseInt(totalHours % 24);
    if (
      typeof hours != "number" ||
      typeof minute != "number" ||
      typeof totalHours != "number" ||
      typeof totalSeconds != "number"
    ) {
      setNotNumber(true);
    }
    return ` ${hours}hr ${minute}min ${seconds}sec`;
  }
  return (
    <View>
      <View style={styles.container}>
        {duration != "resultPage" ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              left: 20,
              backgroundColor: "#F3FBFC",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                backgroundColor: "transparent",
                marginRight: 10,
                justifyContent: "center",
              }}
            >
              <FontAwesome name="clock-o" size={30} />
            </View>

            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins-Medium",
                alignSelf: "center",
                fontSize: 18,
                backgroundColor: "#F3FBFC",
              }}
            >
              {getFormattedTime(duration) && !notNumber
                ? getFormattedTime(duration)
                : "00 : 00 : 00"}
            </Text>
          </View>
        ) : (
          <View>{/* <Text>Correct Answer</Text> */}</View>
        )}

        <View
          style={{
            width: 47,
            height: 47,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 11,
          }}
        >
          <TouchableOpacity
            style={{
              width: 47,
              height: 47,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 11,
            }}
          >
            <ResultModal
              nextSection={nextSection}
              setquesIndexArray={setquesIndexArray}
              quesIndexArray={quesIndexArray}
              currentSection={currentSection}
              setCurrentSectionId={setCurrentSectionId}
              CurrentSectionId={CurrentSectionId}
              SumbitTest={SumbitTest}
              setIndex={setIndex}
              sectionIdx={sectionIdx}
              sectionLength={sectionLength}
              index={index}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default TestCountDownTimer;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3FBFC",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
  },

  profileConatiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3FBFC",
  },
  RectangleMenuContainer: {
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    padding: 8,
  },
  RectangleImgContainer: {
    margin: 2,
  },
});
