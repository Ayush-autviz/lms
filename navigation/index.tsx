import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  ColorSchemeName,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import TabTwoScreen from "../screens/TabTwoScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import HomeScreen from "../screens/HomeScreen";
import FeedScreen from "../screens/FeedScreen";
import Fullscreen from "../screens/FullScreen";
import MockTestScreen from "../screens/MockTestScreen";
import PlayScreen from "../screens/PlayScreen";
import VideosScreen from "../screens/VideosScreen";
import CourseDetails from "../screens/CourseDetails";
import SignInPage from "../screens/SignInPage";
import LoginScreen from "../screens/LoginScreen";
import ProfilePage from "../screens/ProfilePage";
import MockTestSubjectTest from "../screens/MockTestSubjectScreen";
import Purchased from "../screens/Purchased";
import AffairsView from "../screens/AffairsView";
import TestResultScreen from "../screens/TestResultScreen";
import JobNotification from "../screens/JobNotification";
import Password from "../screens/Password";
import Webview from "../screens/Webview";
import ResetPassword from "../screens/ResetPassword";
import SignUpScreen from "../screens/SignUpScreen";
import WebViewInMobile from "../screens/WebViewInMobile";
import EditProfile from "../screens/EditProfile";
import OtpScreen from "../screens/OtpScreen";
import QuizTestScreen from "../screens/QuizTestScreen";

import ViewExplantionScreen from "../screens/ViewExplantionScreen";
import ViewMockTest from "../screens/ViewMockTest";
import QuizTestViewExplantion from "../screens/QuizTestViewExplantion";
import SubjectVideoScreen from "../screens/SubjectVideoScreen";

function Navigation({ colorScheme }: NonNullable<ColorSchemeName> | any) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Test"
        component={MockTestSubjectTest}
        options={{ headerShown: false, navigationBarHidden: false }}
      />
      <Stack.Screen
        name="reset"
        component={ResetPassword}
        options={{
          headerTitle: "Forgot Password",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Purchased"
        component={Purchased}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: "center",
          headerTitle: "My Course",
        }}
      />
      <Stack.Screen
        name="FullScreen"
        component={Fullscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Web"
        component={Webview}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizTest"
        component={QuizTestScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizTestViewExplanationScreen"
        component={QuizTestViewExplantion}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WebViewInMobile"
        component={WebViewInMobile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TestResult"
        component={TestResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MockTestView"
        component={ViewMockTest}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: "center",
          headerTitle: "Course Details",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewExpanation"
        component={ViewExplantionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: "center",
          headerTitle: "Course Details",
        }}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: "center",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Play"
        component={PlayScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Play"
        component={PlayScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Job"
        component={JobNotification}
        options={{
          headerTitle: "Job Notification",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Password"
        component={Password}
        options={{
          headerTitle: "Update Password",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Videos"
        component={VideosScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SubjectVideos"
        component={SubjectVideoScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TestResult"
        component={TestResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Feed() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Affairs"
        component={AffairsView}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: "center",
          headerTitle: "My Feed",
        }}
      />
      <Stack.Screen
        name="TestResult"
        component={TestResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Play"
        component={PlayScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ navigation }: any) {
  const colorScheme = useColorScheme();

  return (
    <React.Fragment>
      <BottomTab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          tabBarShowLabel: true,
          tabBarInactiveTintColor: "#747B84",
          headerShown: false,
          tabBarActiveTintColor: "#498BEA",
          tabBarLabelStyle: {
            fontFamily: "Poppins-Bold",
            marginTop: -6,
            top: -1,
          },
          tabBarStyle: {
            bottom: 0,
            zIndex: 999,
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "#FAFAFB",
            position: "absolute",
            borderTopWidth: 1,
          },
        }}
      >
        <BottomTab.Screen
          name="HomeScreen"
          component={Home}
          listeners={({ navigation }) => ({
            tabPress: (event: { preventDefault: () => void }) => {
              // event.preventDefault();
              console.log("runnnnnnnnnnn");
              navigation.navigate("Home");
            },
          })}
          options={() => ({
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("HomeScreen");
                }}
                style={styles.container}
              >
                <AntDesign
                  name="home"
                  size={24}
                  color={focused ? "#498BEA" : "#747B84"}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <BottomTab.Screen
          name="TabTwoScreen"
          component={TabTwoScreen}
          listeners={({ navigation }) => ({
            tabPress: (event: { preventDefault: () => void }) => {
              event.preventDefault();
              navigation.navigate("TabTwoScreen");
            },
          })}
          options={{
            tabBarLabel: "My Course",
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TabTwoScreen");
                }}
                style={styles.container}
              >
                <Ionicons
                  name="book-outline"
                  size={24}
                  color={focused ? "#498BEA" : "#747B84"}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <BottomTab.Screen
          name="PlayScreen"
          component={PlayScreen}
          listeners={({ navigation }) => ({
            tabPress: (event: { preventDefault: () => void }) => {
              console.log("runnnnnnnnnnn");
              event.preventDefault();
              navigation.navigate("PlayScreen");
            },
          })}
          options={{
            tabBarLabel: "Videos",
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PlayScreen");
                }}
                style={styles.container}
              >
                <Image
                  style={{
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    borderRadius: 10,
                  }}
                  source={require("../assets/images/Nav/play.png")}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <BottomTab.Screen
          name="MockTestScreen"
          component={MockTestScreen}
          options={{
            title: "MockTest",
            tabBarLabel: "MockTest",
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MockTestScreen");
                }}
                style={styles.container}
              >
                <MaterialIcons
                  name="library-books"
                  size={24}
                  color={focused ? "#498BEA" : "#747B84"}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <BottomTab.Screen
          name="FeedScreen"
          component={Feed}
          options={{
            title: "Feed",
            tabBarLabel: "Feed",
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FeedScreen");
                }}
                style={styles.container}
              >
                <MaterialCommunityIcons
                  name="newspaper-variant-outline"
                  size={24}
                  color={focused ? "#498BEA" : "#747B84"}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </BottomTab.Navigator>
    </React.Fragment>
  );
}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={30}
      style={{ marginBottom: -3, backgroundColor: "#FAFAFB" }}
      {...props}
    />
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default Navigation;