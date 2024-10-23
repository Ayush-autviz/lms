import React, { useEffect } from "react";
import {
  
  Dimensions,
  View,
  Linking,
  StyleSheet,
} from "react-native";
import { BackHandler, Text } from "react-native";
import axios from "axios";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";

const { width  } = Dimensions.get("window");

export default function Webview(props: any) {
  const { access_token } = useStateContext();
  const header: any = {
    Authorization: `Bearer ${access_token}`,
    "Abp-TenantId": 1,
  };
  const getPdfLink = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/ContentManagementService/getContentNotesData?id=${props.route.params.id}`,
        header
      );
      Linking.openURL(res.data.result.notesUrl);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPdfLink();
  }, []);
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  useEffect(() => {
    setTimeout(() => {
      props.navigation.goBack();
    }, 1000);
  });
  return (
    <View style={styles.loadingOrErrorView}>
      <Text>Veiw PDF</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  loadingOrErrorView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  loader: {
    left: width / 3.1,
  },
});
