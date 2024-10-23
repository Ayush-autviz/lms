/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UnsafeObject } from "react-native/Libraries/Types/CodegenTypes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
type SUCESS = String;
type FAILED = String;
export type Status = SUCESS | FAILED;

let quesData = {
  mockTestId: 123,
  mockTest: {
    title: "Percentage test",
    courseManagementId: 71,
    courseManagement: null,
    courseName: null,
    duration: 0,
    uploadFile:
      "https://lmsnotesstore.s3.ap-south-1.amazonaws.com/202304050545128879_instruction pdf.pdf",
    isNegativeMarking: true,
    eachQuestionNumber: 1,
    eachQuestionNegativeMarking: 0.25,
    isFree: false,
    isBuy: false,
    sectionDuration: null,
    fileName: null,
    topicsName: null,
    subjectName: null,
    index: 0,
    tenantId: 1,
    isDeleted: false,
    deleterUserId: null,
    deletionTime: null,
    lastModificationTime: null,
    lastModifierUserId: null,
    creationTime: "2023-04-05T05:47:04.1055744",
    creatorUserId: 2,
    id: 123,
  },
  questionId: 3791,
  question: {
    subjectId: 10,
    subjectName: null,
    subject: {
      subjectName: "Mathemactic Aptitude",
      details: null,
      topics: [],
      isDisableDelete: false,
      tenantId: 1,
      isDeleted: false,
      deleterUserId: null,
      deletionTime: null,
      lastModificationTime: "2023-04-04T10:27:19.3345811",
      lastModifierUserId: null,
      creationTime: "2023-03-23T07:13:37.9327599",
      creatorUserId: 2,
      id: 10,
    },
    courseManagementId: 71,
    courseManagement: null,
    topicsId: null,
    topicsName: null,
    topics: null,
    fileName: "Math Test 23- percentage.docx",
    questions:
      "A person donated 4% of his income to charity and deposited 10% of the rest in a bank. If now he has <b> Rs</b><b>  864</b>0 left with him, then his income is:",
    option1: "12500",
    option2: "12000",
    option3: "10500",
    option4: "10,000",
    option5: null,
    explanations:
      "Let income be <math><mml:math xmlns:mml='http://www.w3.org/1998/Math/MathML' xmlns:m='http://schemas.openxmlformats.org/officeDocument/2006/math'><mml:mi>'</mml:mi><mml:mi>x</mml:mi><mml:mi>'</mml:mi></mml:math></math>           96x100×90100=8640 ⇒x=10000",
    answer: "d",
    report: null,
    isMarkDelete: false,
    selectedSubjects: null,
    selectedTopics: null,
    index: 0,
    tenantId: 1,
    isDeleted: false,
    deleterUserId: null,
    deletionTime: null,
    lastModificationTime: null,
    lastModifierUserId: null,
    creationTime: "2023-04-05T05:45:47.702",
    creatorUserId: 2,
    id: 3791,
  },
  userAnswer: "c",
  skip: false,
  isMarkUp: false,
  index: 9,
  tenantId: 1,
  isDeleted: false,
  deleterUserId: null,
  deletionTime: null,
  lastModificationTime: null,
  lastModifierUserId: null,
  creationTime: "2023-04-12T05:33:22.630Z",
  creatorUserId: 97,
  id: 66739,
};
let section = {
  mockTestId: 123,
  mockTest: null,
  duration: 9,
  subjectId: 10,
  subject: {
    subjectName: "Mathemactic Aptitude",
    details: null,
    topics: [],
    isDisableDelete: false,
    tenantId: 1,
    isDeleted: false,
    deleterUserId: null,
    deletionTime: null,
    lastModificationTime: "2023-04-04T10:27:19.3345811",
    lastModifierUserId: null,
    creationTime: "2023-03-23T07:13:37.9327599",
    creatorUserId: 2,
    id: 10,
  },
  isDeleted: false,
  deleterUserId: null,
  deletionTime: null,
  lastModificationTime: null,
  lastModifierUserId: null,
  remainingTimeInSec :123,
  creationTime: "2023-04-05T05:47:04.2061497",
  creatorUserId: 2,
  id: 265,
};
export type TestSection = typeof section;
// export type TestSection = {
//   mockTestId: number;
//   mockTest: null;
//   duration: number;
//   subjectId: number;
//   subject: {
//     subjectName: string;
//     details: null;
//     topics: [];
//     isDisableDelete: boolean;
//     tenantId: number;
//     isDeleted: boolean;
//     deleterUserId: null;
//     deletionTime: null;
//     lastModificationTime: string;
//     lastModifierUserId: null;
//     creationTime: string;
//     creatorUserId: number;
//     id: number;
//   };
//   isDeleted: boolean;
//   deleterUserId: null;
//   deletionTime: null;
//   lastModificationTime: null;
//   lastModifierUserId: null;
//   creationTime: string;
//   creatorUserId: number;
//   id: number;
// };
export type Question = typeof quesData;
export type RootStackParamList = {
  Splash: NavigatorScreenParams<RootTabParamList> | undefined;
  Root: undefined;
  Home: undefined;
  Modal: undefined;
  TabTwo: undefined;
  Test: undefined;
  FullScreen: undefined;
  LoginScreen: undefined;
  SignIn: undefined;
  TestResult: undefined;
  TestInfo: undefined;
  MockTest: undefined;
  Play: undefined;
  Job: undefined;
  login: undefined;
  reset: undefined;
  Rooot: undefined;
  Purchased: undefined;
  Affairs: undefined;
  CourseDetails: undefined;
  Feed: undefined;
  Password: undefined;
  ProfilePage: undefined;
  Web: undefined;
  Profile: undefined;
  Videos: undefined;
  NotFound: undefined;
  TestTypeScreen: undefined;
  SignUp: undefined;
  WebViewInMobile: undefined;
  EditProfile: undefined;
  Otp: undefined;
  QuizTest: undefined;
  ViewExpanation: undefined;
  MockTestView: undefined;
  QuizTestViewExplanationScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  HomeScreen: undefined;
  PlayScreen: undefined;
  MockTestScreen: undefined;
  FeedScreen: undefined;
  TabTwoScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
