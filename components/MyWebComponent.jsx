import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export const MyWebComponent = ({ youtube }) => {
  return (
    <View androidHardwareAccelerationDisabled style={style.webview}>
      <WebView
        androidHardwareAccelerationDisabled
        useOnRenderProcessGone="true"
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={false} 
        allowsInlineMediaPlayback={true} 
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
  webview: { width: 330, height: 200, opacity: 0.99 },
});
