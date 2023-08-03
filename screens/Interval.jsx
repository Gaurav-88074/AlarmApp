import React from "react";
import { useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  Platform,
  SafeAreaView,
  FlatList,
  Dimensions,
  ScrollView,
  Switch,
  Pressable,
} from "react-native";
import { useDispatch } from 'react-redux';
import { dataSliceActions } from '../toolkit/DataSlice';
import IntervalCard from "../components/IntervalCard";

const Interval = ({ navigation,route }) => {
  //-----------------------------------
  // const dispatch = useDispatch();
  //-----------------------------------
  // console.log(navigation);
  const alarm_id = route.params.alarm_id;
  const intervalList = route.params.intervalList;
  // console.log(intervalList);
  // const DATA = [
    // {
    //   id: "bd7acbea-c1b1-46c2-aed5-3ad53bb28ba",
    //   minuteDuration: "25",
    //   secondDuration: "3",
    // },
    // {
    //   id: "3ac68afc-c605-48d3-a4f8-fbd9aa97f63",
    //   minuteDuration: "10",
    //   secondDuration: "15",
    // },
  // ]
  
  const DATA = intervalList;
  function makeItProperNumber(value) {
    if (value < 10) {
      return '0' + String(value);
    }
    return value;
  }
  const Item = (obj) => {
    // console.log(obj.item);
    return <IntervalCard
      minuteDuration={makeItProperNumber(obj.item.minute)}
      secondDuration={makeItProperNumber(obj.item.second)}
      navigation={navigation}
      alarm_id = {alarm_id}
      id = {obj.item.id}
    />;
  };
  return (
    <View style={styles.container} >
      <View style={styles.headContainer}>
        {/* <SafeAreaView> */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          data={DATA}
          renderItem={Item}
          keyExtractor={(obj) => obj.id}
        />
        {/* </SafeAreaView> */}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonSpecialSection}
          onPress={() => {
            // console.log("I'm hit again");
            navigation.navigate('AddIntervalScreen', {
              minuteDuration: '0',
              secondDuration: '0',
              alarm_id : alarm_id,
            });
          }}
        >
          <Icon name="pluscircle" size={65} color="#242423" />
        </Pressable>
      </View>
    </View>
  )
}

export default Interval
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    // justifyContent:'center',
    // alignItems: "center",
    // flexDirection: "column",
    // backgroundColor: 'black',
  },
  headContainer: {
    height: "75%",
    width: "100%",
    // borderWidth: 2,
    // borderColor: 'red',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: "25%",
    width: "100%",
    // borderWidth: 2,
    // borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    backgroundColor: 'black'
  },
  buttonSpecialSection: {
    // borderWidth: 2,
    // borderColor: 'red',
    backgroundColor: '#186fd6',
    borderRadius: 50,
  }
});

