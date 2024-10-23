import {
  
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { FC, useState } from "react";
import {
  
  Modal,
  StyleSheet,
  Text,
  
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { generateBoxShadowStyle } from "../lib/generateBoxShadow";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../lib/ResonsiveDimesions";
const shadow = generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");

const high = Dimensions.get("window").height;
type props = {
  filterCatory: any[];
  setFilterQuery: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;
};
const FilterModal: FC<props> = ({ filterCatory, setFilterQuery }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        style={{ alignSelf: "center" }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={[styles.modalView, {}]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: widthPercentageToDP(70),
              marginBottom: 4,
            }}
          >
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: heightPercentageToDP(3),
                  marginLeft: widthPercentageToDP(5),
                  fontFamily: "Poppins-Bold",
                },
              ]}
            >
              Categories
            </Text>
            <TouchableOpacity
              style={{ ...shadow }}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome5 name="window-close" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {filterCatory?.map((ctg: any, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setFilterQuery(ctg.id), setModalVisible(false);
                  }}
                  style={{
                    paddingHorizontal: 2,
                    backgroundColor: "#fff",
                    width: widthPercentageToDP(60),
                    borderWidth: 2,
                    borderColor: "grey",
                    marginBottom: 3,
                    borderRadius: 4,
                    ...generateBoxShadowStyle(
                      -2,
                      4,
                      "#171717",
                      0.1,
                      0.1,
                      2,
                      "#171717"
                    ),
                  }}
                  key={index}
                >
                  <Text style={styles.textStyle}>{ctg.categoryName}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible((prev) => !prev)}
        style={{
          backgroundColor: "#ECECEC",
          width: high / 19.35,
          height: high / 20.35,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          marginBottom: high / 142.33,
          ...shadow,
        }}
      >
        <MaterialCommunityIcons name="sort-variant" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginTop: heightPercentageToDP(20),
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: heightPercentageToDP(3),
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(60),
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default FilterModal;
