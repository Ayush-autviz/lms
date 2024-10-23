import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const useValideImage = (URL: string, defaultImage: any) => {
  fetch(URL)
    .then((res) => {
      console.log(res);
      if (res.status == 404) {
        return <Image source={defaultImage} />;
      } else {
        return <Image source={{ uri: `${url}` }} />;
      }
    })
    .catch((err) => {
      console.log(err);
      return <Image source={require("./Images/default.png")} />/;
    });
  useEffect(() => {
    fetch;
  }, [defaultImage, URL]);
  return fetch;
};

export default useValideImage;

const styles = StyleSheet.create({});
