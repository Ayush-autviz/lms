import React, { useContext, useState } from "react";

const StateContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [ansResultIdx, SetAnsResultIdx] = useState([{ color: "red" }]);
  const [userDetail, setUserDetail] = useState({});
  const [access_token, setAccess_token] = useState("");
  const [refresh, setRefresh] = useState("");
  const [userImage, setuserImage] = useState();
  const [user_Id, setUser_id] = useState(null);
  const [questionLength, setQuestionLength] = useState();
  const [freeVideoData, setFreeVideoData] = useState([]);
  const [onGoingCourse, setOnGoingCourse] = useState([]);
  const [allCourseData, setAllCourseData] = useState([]);
  const [allMockTestData, setAllMockTestData] = useState([]);

  return (
    <StateContext.Provider
      value={{
        allMockTestData,
        setAllMockTestData,
        allCourseData,
        setAllCourseData,
        freeVideoData,
        setFreeVideoData,
        setOnGoingCourse,
        onGoingCourse,
        refresh,
        setRefresh,
        questionLength,
        setQuestionLength,
        userImage,
        freeVideoData,
        setFreeVideoData,
        setuserImage,
        setUser_id,
        user_Id,
        access_token,
        setAccess_token,
        userDetail,
        setUserDetail,
        SetAnsResultIdx,
        ansResultIdx,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
