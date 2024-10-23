import React, { Fragment, useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import useColorScheme from "../hooks/useColorScheme";
import useDebounce from "../shared/Debounce";
import { FontAwesome } from "@expo/vector-icons";

import HeaderNav from "../components/HeaderNav";
import { getData } from "../api/SubjectService/sever";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function PlayScreen(props: any) {
  const colorScheme = useColorScheme();
  const [allSubject, setAllSubjects] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [resultFound, setResultFound] = useState(false);
  const [searchedData, setSearchData] = useState<any[]>([]);
  const debouncedSearchTerm = useDebounce(searchQuery, 0);

  const handleChangeText = async (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
    }
  };
  const onClear = async () => {
    setSearchQuery("");
    setResultFound(false);
    setSearchData([]);
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      filterData();
      setResultFound(true);
    } else {
      setSearchData([]);
      setResultFound(false);
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      onClear();
    });
  }, [props.navigation]);
  const filterData = async () => {
    let filterRes = await allSubject.filter((result: any) => {
      return (
        result.subjectName.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
      );
    });

    if (filterRes.length) {
      setSearchData([...filterRes]);
    }
    setResultFound(true);
  };

  const fetchAllSubject = async () => {
    try {
      const { data, status } = await getData(
        "/api/services/app/SubjectService/GetAll"
      );

      setAllSubjects(data.items);
      setIsLoading(false);
    } catch (error) {}
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAllSubject();
  }, []);
  return (
    <View style={{ backgroundColor: "#F7F7F7", flex: 1 }}>
      <HeaderNav navigation={props.navigation} name="Videos" />

      <View style={styles.searchBarContainer}>
        <TextInput
          allowFontScaling={false}
          value={searchQuery}
          onChangeText={handleChangeText}
          style={[styles.searchBar, styles.placeholder1]}
          placeholder="Try out a course.."
          placeholderTextColor={colorScheme === "dark" ? "#D1D0D0" : "black"}
        />
        {searchQuery ? (
          <AntDesign
            name="close"
            size={20}
            color={colorScheme === "dark" ? "white" : "black"}
            onPress={onClear}
            style={styles.clearIcon}
          />
        ) : (
          <FontAwesome name="search" size={20} style={styles.clearIcon2} />
        )}
        <View
          style={{
            alignSelf: "center",
            left: wid / 15,
            backgroundColor: "#ECECEC",
            width: high / 21.35,
            height: high / 21.35,
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 60,
          }}
        >
          <Image
            style={{ alignSelf: "center", width: 15, height: 15 }}
            source={require("../assets/images/filter.png")}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#FAFAFB",
          height: high / 17.08,
          alignContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            left: wid / 12.8,
            fontSize: 20,
            fontFamily: "Poppins-Medium",
            fontWeight: "600",
            top: 10,
          }}
        >
          Subject-Wise
        </Text>
      </View>
      {isLoading ? (
        <View></View>
      ) : (
        <Fragment>
          {searchedData.length > 0 ? (
            <>
              <SafeAreaView
                style={{
                  flex: 1,
                  bottom: high / 85.4,
                  alignSelf: "center",
                  width: wid,
                  backgroundColor: "#FAFAFB",
                }}
              >
                <FlatList
                  data={searchedData}
                  style={{ width: wid }}
                  renderItem={({ item }) => (
                    <>
                      <TouchableOpacity
                        style={styles.topicCntr}
                        onPress={() =>
                          props.navigation.navigate("Videos", {
                            id: item.id,
                          })
                        }
                      >
                        <View style={styles.image}>
                          <Image
                            source={require("../assets/images/bigEnglish.png")}
                            style={{
                              width: wid / 5.4,
                              height: wid / 5.4,
                              borderRadius: 10,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            backgroundColor: "#FAFAFB",
                            width: wid / 3,
                            height: high / 15,
                            alignItems: "flex-start",
                            right: wid / 10,
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={styles.cardText}
                          >
                            {item.subjectName}
                          </Text>
                        </View>
                        <Image
                          source={require("../assets/images/arow.png")}
                          style={{ left: high / 12.8 }}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                />
              </SafeAreaView>
            </>
          ) : (
            <>
              <SafeAreaView
                style={{
                  flex: 1,
                  bottom: high / 85.4,
                  alignSelf: "center",
                  width: wid,
                  backgroundColor: "#FAFAFB",
                }}
              >
                <FlatList
                  data={allSubject}
                  style={{ width: wid }}
                  renderItem={({ item }) => (
                    <>
                      <TouchableOpacity
                        style={styles.topicCntr}
                        onPress={() =>
                          props.navigation.navigate("Videos", {
                            id: item.id,
                          })
                        }
                      >
                        <View style={styles.image}>
                          <Image
                            source={require("../assets/images/bigEnglish.png")}
                            style={{
                              width: wid / 5.4,
                              height: wid / 5.4,
                              borderRadius: 10,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            backgroundColor: "#FAFAFB",
                            width: wid / 3,
                            height: high / 15,
                            right: wid / 12,
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={styles.cardText}
                          >
                            {item.subjectName}
                          </Text>
                        </View>
                        <Image
                          source={require("../assets/images/arow.png")}
                          style={{ left: wid / 12.8 }}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                />
              </SafeAreaView>
            </>
          )}
        </Fragment>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  searchBarContainer: {
    paddingTop: high / 59,
    backgroundColor: "#FAFAFB",
    flexDirection: "row",
  },
  image: {
    width: wid / 5.4,
    height: wid / 5.4,
    borderRadius: 10,
    alignSelf: "center",
    right: wid / 6.8,
  },
  number: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    left: wid / 75,
  },
  cardText: {
    fontFamily: "Poppins-Medium",
    fontSize: 17,
  },
  topicCntr: {
    height: high / 7.87,
    flexDirection: "row",
    marginBottom: high / 85.4,
    borderRadius: 11,
    justifyContent: "center",
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    borderColor: "#F1F1F1",
    width: "90%",
    backgroundColor: "#FAFAFB",
  },
  searchBar: {
    width: "70%",
    height: high / 21.35,
    alignSelf: "flex-start",
    marginLeft: wid / 15,
    paddingLeft: wid / 42.66,
    paddingBottom: high / 106.75,
    paddingTop: high / 122,
    backgroundColor: "#ECECEC",
    flexDirection: "row",
    borderRadius: 16,
    marginBottom: high / 142.33,
  },
  placeholder1: {
    fontFamily: "Poppins-Medium",
    fontStyle: "normal",
    fontSize: 13,
  },

  clearIcon: {
    position: "absolute",
    right: "28%",
    bottom: 13,
    color: "#8A8A8A",
    justifyContent: "center",
    alignSelf: "center",
    width: wid / 19.2,
    height: high / 42.7,
  },
  clearIcon2: {
    position: "absolute",
    bottom: 13,
    color: "#8A8A8A",
    right: "27%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
});
