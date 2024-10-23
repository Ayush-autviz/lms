const unsubscribe = NetInfo.addEventListener((state) => {
  if (state.isConnected === false) {
    Alert.alert("No Internet!", "Please reconnect!", [
      {
        text: "Reload App",
        onPress: () => RNRestart.restart(),
      },
    ]);
  } else if (state.isConnected === true) {
    console.log("Connected");
  }
});