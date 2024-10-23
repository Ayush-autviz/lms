import {
  
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  
  
  BackHandler,
  Platform,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import HeaderNav from "../components/HeaderNav";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { baseUrl } from "../utils";
import { getVideoId } from "../utils/Logics";
import { horizontalScale } from "../utils/metrics";
import { MyWebComponentVid } from "../components/MyWebComponentVid";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function VideosScreen(props: any) {
  const [res, setRes] = useState("All");
  const { videoUrl: url } = props.route.params;
  const [color, setColor] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);
  const [videoUrl, setVideoUrl] = useState<String>(
    url ? url : "https://www.youtube.com/watch?v=O1Nx1ksLoNc"
  );
  const [freeVideoData, SetFreeVideoData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((value: any) => {
      if (value != null) {
        getVideoContent(value);
      }
    });
  }, []);

  const getVideoContent = async (access_token: any) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/ContentManagementService/getAllContentVideos`,
        config
      );

      SetFreeVideoData(res.data.result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const onPress = (text: string) => {
    setRes(text);
    if (text == "All") {
      setColor(true);
      setColor1(false);
      setColor2(false);
    } else if (text == "Latest") {
      setColor(false);
      setColor1(true);
      setColor2(false);
    } else {
      setColor(false);
      setColor1(false);
      setColor2(true);
    }
  };
  const onStateChange = React.useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  const togglePlaying = React.useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#F7F7F7",
        flex: 1,
      }}
    >
      <HeaderNav name="Videos List" navigation={props.navigation} />
      
      <MyWebComponentVid youtube={getVideoId(videoUrl)} />
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#FAFAFB",
        }}
      >
     

        <TouchableOpacity
          style={{
            height: high / 14.233,

            width: "100%",
          }}
        />
        <TouchableOpacity
          style={{
            height: high / 19.488,
            width: "14%",
            left: wid / 1.4,
            position: "absolute",
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "#FAFAFB",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "81%",
            height: high / 17,
            marginBottom: high / 62.7,
            alignSelf: "center",
            alignItems: "center",
            borderRadius: 116,
            borderWidth: 1,
            borderColor: "#EEEEEE",
            backgroundColor: "#FAFAFB",
          }}
        >
          <TouchableOpacity
            onPress={() => onPress("All")}
            style={{
              backgroundColor: color ? "#319EAE" : "#FAFAFB",
              height: "100%",
              width: "33%",
              justifyContent: "center",
              borderRadius: 116,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: color ? "white" : "black",
                alignSelf: "center",
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress("Latest")}
            style={{
              backgroundColor: color1 ? "#319EAE" : "#FAFAFB",
              borderRadius: 116,
              height: "100%",
              width: "33%",
              justifyContent: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: color1 ? "white" : "black",
                alignSelf: "center",
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
              Latest
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress("Favourite")}
            style={{
              backgroundColor: color2 ? "#319EAE" : "#FAFAFB",
              height: "100%",
              borderRadius: 116,
              left: 3,
              width: "33%",
              justifyContent: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: color2 ? "white" : "black",
                alignSelf: "center",
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
              Favourite
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{
          backgroundColor: "#FAFAFB",
          marginBottom: 50,
          width: wid,

          alignSelf: "center",
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {freeVideoData?.map((video: any, index: number) => {
          if (["Latest", "All", "Favourite"].includes(res)) {
            return (
              <TouchableOpacity
                key={index}
                style={{ marginBottom: 10 }}
                onPress={() => setVideoUrl(video.videoUrl)}
              >
                <ImageBackground
                  style={styles.imageStyle}
                  imageStyle={{ borderRadius: 11 }}
                  source={{
                    uri: `https://img.youtube.com/vi/${getVideoId(
                      video.videoUrl
                    )}/hqdefault.jpg`,
                  }}
                >
                  <Text numberOfLines={1} style={styles.TextStyle}>
                    {video.title}
                  </Text>
                  <AntDesign
                    style={{ alignSelf: "center" }}
                    name="youtube"
                    size={100}
                    color="red"
                  />
                </ImageBackground>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topicCntr: {
    height: high / 4.47,
    flexDirection: "row",
    marginBottom: high / 190.4,
    borderRadius: 11,
    justifyContent: "center",
    // borderWidth : 1,
    alignSelf: "center",
    alignItems: "center",
    borderColor: "#F1F1F1",
    width: "95%",
    backgroundColor: "#FAFAFB",
  },
  TextStyle: {
    marginTop: 5,
    paddingHorizontal: horizontalScale(13),
    top: 1,
    color: "#fafafa",
    opacity: 0.8,
    borderWidth: 1,
    borderRadiusTop: 11,
    backgroundColor: "#000000",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  imageStyle: {
    borderRadiusTop: 11,
    borderWidth: 1,
    height: high / 5,
    width: wid / 1.35,
    borderRadius: 11,
    marginRight: 11,
  },
  textContainer: {
    opacity: 0.8,
    borderWidth: 1,
    borderRadiusTop: 11,

    backgroundColor: "#000000",
  },
});
