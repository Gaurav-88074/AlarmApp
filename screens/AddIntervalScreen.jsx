import React from 'react'
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
} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { insertOneAlarmInterval } from '../database/databaseSetup';
import { IntervalModel } from '../models/IntervalModel';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { dataSliceActions } from '../toolkit/DataSlice';
const AddIntervalScreen = (props) => {
    const alarm_id = props.route.params.alarm_id;
    // console.log(alarm_id);
    //--------------------------------------------------
    const dispatch = useDispatch();

    //-----------------------------------------------------
    // console.log(props.route);
    const minuteDuration = props.route.params.minuteDuration;
    const secondDuration = props.route.params.secondDuration;
    // const minuteDuration = "0";
    // const secondDuration = "0";
    // console.log(value);
    // const value = props.naviagtion.params.value 
    const [minutes, setMinutes] = useState(minuteDuration);
    const [seconds, setSeconds] = useState(secondDuration);
    //-----------------------------------------------------
    function makeItProperNumber(value) {
        if (value < 10) {
            return '0' + String(Number(value));
        }
        return value;
    }
    //-------------------------------------------
    //-----------------------------------------------------
    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return <>
                    <Pressable
                        onPress={() => {
                            // console.log("got hit",minutes,seconds);
                            const intervalObj = new IntervalModel(
                                uuid.v4(),
                                alarm_id,
                                minutes,
                                seconds,
                                true
                            );
                            insertOneAlarmInterval(intervalObj).then(()=>{
                                dispatch(dataSliceActions.toggleRefresh());
                                props.navigation.popToTop();
                            })
                        }}
                    >
                        <Icon name="check" size={26} color="#FFF" />
                    </Pressable>
                </>
            },
        })
    }, [minutes,seconds])
    //-----------------------------------------------------
    return (
        <View style={styles.container}>
            <View style={styles.dateSection}>
                <View style={styles.firstSection}>
                    <Text style={styles.timeString1}>
                        {makeItProperNumber(minutes)}
                    </Text>
                    <Text style={styles.timeString2}>
                        MIN
                    </Text>
                    <Text style={styles.timeString1}>
                        {makeItProperNumber(seconds)}
                    </Text>
                    <Text style={styles.timeString2}>
                        SEC
                    </Text>
                </View>
                <View style={styles.secondSection}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{
                            flex: 1,
                        }}
                        initialNumToRender={10}
                        data={[...Array(60).keys()]}
                        renderItem={obj => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        setMinutes(obj.item)
                                    }}
                                    android_ripple={{ 'color': '#ffff' }}
                                >
                                    <Text
                                        style={styles.number}
                                    >
                                        {makeItProperNumber(obj.item)}
                                    </Text>
                                </Pressable>
                            );
                        }}
                        keyExtractor={obj => obj}
                    />
                </View>
                <View style={styles.thirdSection}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{
                            flex: 1,
                        }}
                        initialNumToRender={6}
                        data={[...Array(61).keys()]}
                        renderItem={obj => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        setSeconds(obj.item)
                                    }}
                                    android_ripple={{ 'color': '#ffff' }}
                                >
                                    <Text
                                        style={styles.number}
                                    >
                                        {makeItProperNumber(obj.item)}
                                    </Text>
                                </Pressable>
                            );
                        }}
                        keyExtractor={obj => obj}
                    />
                </View>
            </View>
        </View>
    )
}

export default AddIntervalScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    dateSection: {
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.34,
        width: Dimensions.get('window').width,
        backgroundColor: '#000000',
    },
    firstSection: {
        height: '50%',
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        // borderColor: "yellow",
        // borderWidth: 2,
    },
    secondSection: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        // alignItems: 'center',
        // borderColor: "yellow",
        // borderWidth: 2,
    },
    number: {
        fontSize: 40,
        width: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#505050',//dynamic
        // borderColor: "blue",
        // borderWidth: 2,
    },
    thirdSection: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        // alignItems: 'center',
        // borderColor: "yellow",
        // borderWidth: 2,
    },
    timeString1: {
        // justifyContent :'
        // height  :'100%',
        textAlignVertical: 'bottom',

        fontSize: 30,
        color: '#ffff',
        marginHorizontal: 4,
        // fontWeight:'bold',
        // borderWidth : 1,
        // borderColor : 'white',

    }
    ,
    timeString2: {
        // height  :'100%',
        textAlignVertical: 'bottom',
        fontSize: 15,
        color: '#ffff',
        marginHorizontal: 4,
        // textAlign :'center'
        // borderWidth : 1,
        // borderColor : 'white',
    }
});