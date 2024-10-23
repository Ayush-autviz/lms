import React, { useEffect, useState } from "react";
import { ScrollView,  Dimensions  } from "react-native";
import * as SecureStore from "expo-secure-store";
import { baseUrl } from "../utils";
import NotificationBox from "../components/NotificationBox";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function JobNotification(props: any) {
  const [jobData, SetJobData] = useState<any>([]);
  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((value) => {
      if (value != null) {
        Jobnotification(value);
      }
    });
  }, []);
  const Jobnotification = async (token: any) => {
    var axios = require("axios");
    var data = "";
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/JobNotificationService/GetAllJobNotifications`,
      headers: {
        Authorization: `Bearer  ${token}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response: any) {
        console.log(response, "jobres");
        if (response.data.result.course == null)
          SetJobData(response.data.result);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  return (
    <ScrollView
      style={{
        height: high / 1.2,
        marginTop: high / 30,
        position: "relative",
        alignSelf: "center",
        width: wid,
        marginBottom: high / 8.68,
      }}
    >
      {jobData.map((data: any, index: number) => {
        return <NotificationBox data={data} key={index} />;
      })}
    </ScrollView>
  );
}
