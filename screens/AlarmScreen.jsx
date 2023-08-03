import React from "react";
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
    Pressable
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
//-----------------------------------------
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
//-----------------------------------------
import AlarmCard from "../components/AlarmCard";
//-----------------------------------------
const AlarmScreen = ({ navigation,route }) => {
    // console.log(navigation);
    // console.log(route);
    // console.log("main rendered");
    const reduxHasData = useSelector((state) => {
        return state.dataReducer.reduxHasData;
    })
    const DATA = useSelector((state) => {
        // console.log(state.dataReducer.AllVocabData);
        return state.dataReducer.allData;
    })
    const Item = (obj) => {
        // console.log(obj.item);
        return <AlarmCard alarmObj={obj.item} navigation={navigation} key={obj.item.id} />;
    };
    return (
        <View style={styles.container}>
            {
                reduxHasData
                &&
                <SafeAreaView style={styles.headContainer}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        data={DATA}
                        renderItem={Item}
                        keyExtractor={(obj) => obj.id}
                    />
                </SafeAreaView>
            }
            <View style={styles.buttonContainer}>
                <Pressable style={styles.buttonSpecialSection}
                    android_ripple={{'color':"#242423"}}
                    onPress={() => {
                        // console.log("I'm hit again");
                        navigation.navigate('AddAlarmScreen', {
                            hourDuration: '12',
                            minuteDuration: '0',
                            timeModeV: 'PM'
                        });
                    }}
                >
                    <Icon name="pluscircle" size={60} color="#242423" />
                </Pressable>
            </View>
        </View>
    );
};

export default AlarmScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width : "100%",
        // height : "100%",
        backgroundColor: "#000000",
        // backgroundColor: "#FFF",
        alignItems: "center",
        // justifyContent: "center",
        // paddingTop: 20,
        // marginTop: Dimensions.get('window').height * 0.12,
    },
    headContainer: {
        height: "75%",
        width: "100%",
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        // borderColor: 'red',
    },
    buttonContainer: {
        height: "25%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        backgroundColor: 'black',
        // borderWidth: 2,
        // borderColor: 'red',
        
    },
    buttonSpecialSection: {
        // borderWidth: 2,
        // borderColor: 'red',
        backgroundColor: '#186fd6',
        borderRadius: 50,
        // overflow:'hidden'
    }
});
