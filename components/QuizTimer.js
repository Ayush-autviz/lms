import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { View, Text } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";
import ResultModal from "./modal/Modal";
function QuizTimer({
  duration,
  quesIndexArray,
  setquesIndexArray,
  SumbitTest,
  index,
  setIndex,
}) {
  const [time, setTime] = useState(duration);
  useEffect(() => {
    if (time <= 1000) {
      Alert.alert("Your Time  is Over", "", [
        {
          text: "Ok",
          onPress: () => {
            SumbitTest();
          },
        },
      ]);
    }
    setTimeout(() => {
      setTime((prevtime) => prevtime - 1000);
    }, 1000);
  }, [time]);
  function getFormattedTime(milliseconds) {
    let totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    let totalMinute = parseInt(Math.floor(totalSeconds / 60));
    let totalHours = parseInt(Math.floor(totalMinute / 60));
    let seconds = parseInt(totalSeconds % 60);
    let minute = parseInt(totalMinute % 60);
    let hours = parseInt(totalHours % 24);
    return ` ${hours}hr ${minute}min ${seconds}sec `;
  }
  return (
    <View>
      <View style={styles.container}>
        {duration !== "viewExpalanationPage" && (
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

              {getFormattedTime(time) && getFormattedTime(time)}

            </Text>
          </View>
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
              setquesIndexArray={setquesIndexArray}
              quesIndexArray={quesIndexArray}
              index={index}
              setIndex={setIndex}
              SumbitTest={SumbitTest}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default QuizTimer;
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
