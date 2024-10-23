import axios from "axios";
import qs from "qs";
import * as SecureStore from "expo-secure-store";

export const getToken = async (token: any) => {
  const headers = new Headers();
  headers.append("Content-type", "application/x-www-form-urlencoded");
  var data = qs.stringify({
    client_id: "3ce11584-9291-4711-b31e-af033b41aad6",
    grant_type: "refresh_token",
    scope: "openid",
    refresh_token: `${token}`,
  });
  var config: any = {
    method: "post",
    url: "http://lmsbackend-env.eba-ugatpcy9.ap-south-1.elasticbeanstalk.com/api/TokenAuth/Authenticate",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  await axios(config)
    .then((res) => {
      const { refresh_token, access_token }: any = res.data;
      SecureStore.setItemAsync("refresh_token", JSON.stringify(refresh_token));
      SecureStore.setItemAsync("access_token", JSON.stringify(access_token));
    })
    .catch((err) => {
      throw err;
    });
};

export const getRefreshToken = async () => {
  try {
    SecureStore.getItemAsync("refresh_token").then(async (value) => {
      if (value != null) {
        await getToken(value);
      }
    });
  } catch (err) {
    throw err;
  }
};
