import {  useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useStateContext } from "../screens/Context/ContextProvider";
import { baseUrl } from "../utils";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function Quiz(props: any) {
  const { access_token } = useStateContext();
  const navigation = useNavigation();
  const { title, data } = props;
  const [result, setResult] = useState(false);
  const [resultData, setResutlData] = useState({});
  const headers: any = {
    "Abp-TenantId": "1",
    Authorization: `Bearer ${access_token}`,
  };
  const getResult = async () => {
    try {
      var config = {
        method: "get",
        url: `${baseUrl}/api/services/app/BlogResult/GetBlogResult?id=${data.id}`,
        headers: headers,
      };

      const res = await axios(config);
      setResult(res.data.result != null);
      setResutlData(resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResult();
  }, []);
  return (
    <View
      style={{
        alignSelf: "center",
        width: "92%",
        borderStyle: "dashed",
        borderColor: "#C9C17F",
        borderWidth: 1,
        borderRadius: 11,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: "2%",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 15,
      }}
    >
      <View style={{ width: wid / 2.6, backgroundColor: "transparent" }}>
        <Text
          allowFontScaling={false}
          style={{ fontSize: 14, fontFamily: "Poppins-Bold" }}
        >
          {title}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#319EAE",
            justifyContent: "center",
            alignContent: "center",
            width: wid / 4.5,
            height: high / 25.5,
            borderRadius: 4,
          }}
          onPress={() => {
            navigation.navigate("QuizTest", { id: data.id } as never);
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: "white",
              fontFamily: "Poppins-Regular",
              fontSize: 12,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            Take Test
          </Text>
        </TouchableOpacity>
        {result && (
          <TouchableOpacity
            style={{
              backgroundColor: "#319EAE",
              justifyContent: "center",
              alignContent: "center",
              width: wid / 4.3,
              marginLeft: wid / 40,
              height: high / 25.5,
              borderRadius: 4,
            }}
            onPress={() => {
              navigation.navigate("TestResult", {
                id: data.id,
                type: "quiz",
              } as never);
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: "white",
                fontFamily: "Poppins-Regular",
                fontSize: 12,
                alignSelf: "center",
              }}
            >
              View Result
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MockTestCard: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paddingInContainer: {
    paddingHorizontal: wid / 19.2,
  },
  fontColor: {
    color: "#8A8A8A",
    fontFamily: "Poppins-Regular",
  },
});

