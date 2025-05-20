import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderNav from "../components/HeaderNav";
import VideoCard from "../components/VideoCard";
import { getVideoId } from "../utils/Logics";
import { baseUrl } from "../utils";

// Interfaces for type safety
interface Video {
  title: string;
  url: string;
  subjectName: string;
  topicName: string;
  isFree?: boolean;
}

interface Topic {
  topicName: string;
  videos: { title: string; url: string }[];
}

interface Subject {
  subjectName: string;
  topics: Topic[];
}

const SubjectVideoScreen = ({ route, navigation }: any) => {
  // State
  const [videos, setVideos] = useState<Subject[]>([]);
  const { id } = route.params;

  // API Configuration
  const apiConfig = {
    headers: {
      Accept: "text/plain",
      Authorization: "null",
      "X-XSRF-TOKEN": "CfDJ8BVzyND0hxRJmEfaHaGKISxEz4L5Pv-KHynukX9tGb-k8Zbi7o-WTX-HIi7defLS454dUDEarRhSyISqQIscs2P7OrEGp3cad3lQ6T0aC2olAR84tIJMJWUjavCWLI-u6zdXtEN12--jBDZeeo3XWbo",
    },
  };

  // Data fetching and transformation
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/services/app/VideoGalleryServices/GetSubjectbasedVideo`,
        {
          params: { subjectId: id },
          ...apiConfig,
        }
      );

      const transformedData: Subject[] = transformVideoData(response.data.result);
      setVideos(transformedData);
      console.log(transformedData, "transformed data");

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Transform raw API data into structured format
  const transformVideoData = (data: Video[]): Subject[] => {
    const transformedData: Subject[] = [];

    data.forEach((video) => {
      let subject = transformedData.find((s) => s.subjectName === video.subjectName);
      if (!subject) {
        subject = { subjectName: video.subjectName, topics: [] };
        transformedData.push(subject);
      }

      let topic = subject.topics.find((t) => t.topicName === video.topicName);
      if (!topic) {
        topic = { topicName: video.topicName, videos: [] };
        subject.topics.push(topic);
      }

      topic.videos.push({ title: video.title, url: video.url });
    });

    return transformedData;
  };

  // Effects
  useEffect(() => {
    fetchData();
  }, [id]);

  // Render topic item
  const renderTopicItem = ({ item }: { item: Topic }) => (
    <View style={styles.topicContainer}>
      <Text style={styles.topicTitle}>{item?.topicName}</Text>
      <FlatList
        data={item?.videos}
        renderItem={renderVideoItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );

  // Render video item
  const renderVideoItem = ({ item, index }: { item: { title: string; url: string }; index: number }) => (
    <VideoCard
      key={index}
      videoUrl={item.url}
      title={item.title}
      isBuy={true}
      onCourseDetailPage={true}
      videoId={getVideoId(item.url)}
      navigation={navigation}
    />
  );

  const emptyListComponent = ()=>{
    return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text
          allowFontScaling={false}
          style={{
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          No vedios Found
        </Text>
    </View>
  }

  // Main render
  return (
    <View style={styles.container}>
      <HeaderNav navigation={navigation} name="Videos" />
      <FlatList
        data={videos[0]?.topics}
        renderItem={renderTopicItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={emptyListComponent}
      />
      <View style={styles.bottomSpacer} />
    </View>
  );
};

// Styles
const styles = {
  container: {
    backgroundColor: "#F7F7F7",
    flex: 1,
  },
  topicContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  bottomSpacer: {
    height: 90,
  },
};

export default SubjectVideoScreen;