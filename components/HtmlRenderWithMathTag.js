import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator } from "react-native-paper";
const wid = Dimensions.get("window").width;
const defaultOptions = {
  messageStyle: "none",
  extensions: ["tex2jax.js"],
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: [
      "AMSmath.js",
      "AMSsymbols.js",
      "noErrors.js",
      "noUndefined.js",
      "autobold.js",
      "action.js",
    ],
  },
};

const MathJax = ({ html, color, mathJaxOptions }) => {
  const [height, setHeight] = useState(1);

  const [wrappedHtml, setWrappedHtml] = useState();

  function handleMessage(message) {
    setHeight(Number(message.nativeEvent.data));
  }
  useEffect(() => {
    setWrappedHtml(wrapMathjax(html));
  }, [html]);
  function wrapMathjax(content) {
    const options = JSON.stringify(
      Object.assign({}, defaultOptions, mathJaxOptions)
    );
    return `
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<script type="text/x-mathjax-config">
				MathJax.Hub.Config(${options});

				MathJax.Hub.Queue(function() {
					var height = document.documentElement.scrollHeight;
					window.ReactNativeWebView.postMessage(String(height));
					document.getElementById("formula").style.visibility = '';
				});
			</script>

			<script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
			<div id="formula" style="font-size:12px;visibility: hidden;top:0,background-color:"red">
				${content}
			</div>
		`;
  }

  const newThn = html;

  const source = {
    html: `<b> ${2 + 1} . </b>${wrappedHtml}`,
  };
  // Create new props without `props.html` field. Since it's deprecated.
  const props = { ...{ color }, ...{ mathJaxOptions }, html: undefined };

  return (
    <View
      style={{
        padding: 0,
        margin: 0,
        height: height,
        // backgroundColor: color ? `${color}` : "#fffff",
      }}
    >
      {!wrappedHtml ? (
        <ActivityIndicator />
      ) : (
        <WebView
          style={{
            backgroundColor: color ? `${color}` : "#FAFAFB",
          }}
          // onLoad={() => setIsLoading(false)}
          // onLoadEnd={setIsLoading(false)}
          // onLoadProgress={setIsLoading(false)}
          // scrollEnabled={false}
          onMessage={handleMessage}
          source={{ html: wrappedHtml }}
          {...props}
        />
      )}

      {/* <RenderHTML contentWidth={wid / 1.2} source={source} /> */}
    </View>
  );
};

const HtmlRenderWithMathTag = ({ source, color }) => {
  return (
    <View style={styles.container}>
      <MathJax html={source} color={color} />
    </View>
  );
};
export default HtmlRenderWithMathTag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#FAFAFB",
  },
});
