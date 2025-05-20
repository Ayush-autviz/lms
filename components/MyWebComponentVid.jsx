import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export const MyWebComponentVid = ({ youtube }) => {
  return (
    <View androidHardwareAccelerationDisabled style={style.webview}>
      <WebView
        androidHardwareAccelerationDisabled
        useOnRenderProcessGone="true"
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={false} // Allows autoplay
        allowsInlineMediaPlayback={true} // Allows video to play inline
        useWebKit={true}
        allowsFullscreenVideo
        source={{
          uri: `
http://app.teachersvision.in/#/account/watch?url=${youtube}
`,
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  webview: { width: "100%", height: 500, opacity: 0.99 },
});
