import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
    Platform,
    Dimensions,
    Pressable,
    Switch,
    ToastAndroid
} from 'react-native';
import { AlarmModel } from '../models/AlarmModel';
import { useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';
import { updateOneAlarm } from '../database/databaseSetup';
import { dataSliceActions } from '../toolkit/DataSlice';
//-------------
import { computeScheduleDate } from '../logic/TimeLogic';
import { computeDifferenceStatement } from '../logic/TimeLogic';
import { convertTo12HourFormat } from '../logic/TimeLogic';
import { scheduleAlarmById} from '../logic/ScheduleNotification';
//-----------
const AlarmCard = ({ alarmObj, navigation }) => {
    // console.log("rendered");
    const dispatch = useDispatch()
    const alarmModelObj = new AlarmModel(alarmObj);
    // console.log(alarmModelObj);
    //=================================================================
    //=================================================================
    
    async function scheduleNotificationHandler(params) {
        Notifications.cancelScheduledNotificationAsync(alarmModelObj.id);
        async function performSchedulingComputation(params) {
            return new Promise((resolve, reject) => {
                resolve(computeScheduleDate(alarmModelObj.hour, alarmModelObj.minute));
            })
        }
        performSchedulingComputation().then((schedule_date) => {
            // console.log(schedule_date);
            setAlarmInStatement(computeDifferenceStatement(new Date(Date.now()), new Date(schedule_date)));
           
            Notifications.scheduleNotificationAsync({
                content: {
                    title: "Alarm",
                    body: "I'm ringing right now",
                    data: {
                        username: "Gaurav"
                    },
                    // sound: "brown",
                    vibrate: [1, 2, 1],
                },
                // trigger : null
                trigger: {
                    'seconds': (schedule_date.getTime() - new Date(Date.now()).getTime()) / 1000
                },
                // channelId: 'special'
                identifier : alarmModelObj.id

            })
            // console.log(alarmModelObj);
            let triggerSeconds = (schedule_date.getTime() - new Date(Date.now()).getTime()) / 1000
            alarmModelObj.intervalList.forEach(async(obj)=>{
                triggerSeconds+=Number(obj.minute) * 60 + Number(obj.second);
                Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Alarm Interval",
                        body: "I'm ringing right now",
                        data: {
                            username: "Gaurav"
                        },
                        // sound: "brown",
                        vibrate: [1, 2, 1],
                    },
                    // trigger : null
                    trigger: {
                        'seconds': triggerSeconds
                    },
                    // channelId: 'special'
                    identifier : obj.id
    
                })
            })
        })
    }
    //=================================================================
    async function cancelNotificationHandler(params){
        Notifications.cancelScheduledNotificationAsync(alarmModelObj.id);
        alarmModelObj.intervalList.forEach(async(obj)=>{
            Notifications.cancelScheduledNotificationAsync(obj.id);
        })
    }
    //=================================================================
    const [isEnabled, setIsEnabled] = useState(alarmModelObj.active_status == "1" ? true : false);
    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
        if (!isEnabled) {
            alarmModelObj.active_status = true;
            updateOneAlarm(alarmModelObj).then(async() => {
                scheduleNotificationHandler();
                ToastAndroid.show(alarmInStatement, ToastAndroid.SHORT);
            })
        }
        else {
            alarmModelObj.active_status = false;
            updateOneAlarm(alarmModelObj).then(() => {
                ToastAndroid.show("disabled", ToastAndroid.SHORT);
                cancelNotificationHandler();
            })
            // setAlarmInStatement("");
        }
    }
    //----------------------------------------------------------------
    function makeItProperNumber(value) {
        if (value < 10) {
            return '0' + String(value);
        }
        return value;
    }
    //------------------------------------------

    const [alarmInStatement, setAlarmInStatement] = useState("");
    async function statementPromise() {
        return new Promise((resolve, reject) => {
            resolve(
                computeDifferenceStatement(
                    new Date(Date.now()),
                    new Date(computeScheduleDate(alarmModelObj.hour, alarmModelObj.minute))
                )
            );
        })
    }

    useEffect(() => {
        async function performSchedulingComputation(params) {
            return new Promise((resolve, reject) => {
                resolve(computeScheduleDate(alarmModelObj.hour, alarmModelObj.minute));
            })
        }
        const x = setInterval(() => {
            performSchedulingComputation().then((schedule_date) => {
                // console.log(schedule_date);
                setAlarmInStatement(computeDifferenceStatement(new Date(Date.now()), new Date(schedule_date)));
            })
        }, 1000);
        return () => {
            clearInterval(x);
        }
    }, [alarmModelObj])
    //---------------------------
    function displayTimeInText(alarmModelObj) {
        const [hourIn12Format,minuteIn12Format]=convertTo12HourFormat(
            alarmModelObj.hour,
            alarmModelObj.minute
        );
        return `${makeItProperNumber(hourIn12Format)}:${makeItProperNumber(minuteIn12Format)}`
    }
    //---------------------------
    //------------------------------------------------------------------
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    navigation.navigate('AlarmSettings', {
                        alarmModelObj: alarmModelObj,
                    });
                    // console.log("I'm hit");
                }}
                android_ripple={{
                    color: '#505050',
                }}
                style={{
                    ...styles.pressableContainer,
                }}>
                <View style={styles.leftContainer}>
                    <View style={styles.leftTop}>
                        <Text style={styles.timeString1}>
                            {
                                displayTimeInText(alarmModelObj)
                            }
                        </Text>
                        <Text style={styles.timeString2}>
                            {alarmModelObj.mode}
                        </Text>
                        <Text style={styles.alarmLabel}>
                            {alarmModelObj.label}
                        </Text>
                    </View>
                    <View style={styles.leftBottom}>
                        <Text style={styles.alarmDays}>
                            Daily
                        </Text>
                        <Text style={styles.alarmIn}>
                            {/* Alarm in 8 hours 58 minutes */}
                            {isEnabled ? alarmInStatement : ""}
                        </Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>

                    <Switch
                        style={{ 'height': "100%", 'width': "100%" }}
                        trackColor={{ false: '#505050', true: '#0073dd' }}
                        thumbColor={isEnabled ? '#FFFF' : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </Pressable>
        </View>
    );
};

export default AlarmCard;
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: Dimensions.get('window').width * 0.94,

        height: Dimensions.get('window').height * 0.13, //mentioned above
        backgroundColor: '#242424',
        // flexDirection : 'column',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 15,
        marginVertical: 7,
        overflow: 'hidden',
        // position :position
    },
    pressableContainer: {
        // flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        height: '100%',
        width: '100%',
        // backgroundColor :'grey',
        // borderColor : 'red',
        // borderWidth : 2,
        borderRadius: 20,
        flexDirection: 'row',
    },
    cardText: {
        color: '#e8e8e8',
        fontSize: 30,
    },
    leftContainer: {
        width: '80%',
        height: '100%',
        // backgroundColor :'grey',
    },
    leftTop: {
        width: '100%',
        height: '50%',
        // backgroundColor: 'grey',
        flexDirection: 'row',
        // justifyContent :'left'
        alignItems: 'baseline',
        paddingLeft: 15,
        paddingTop: 5,
    },
    timeString1: {
        // justifyContent :'
        // height  :'100%',
        textAlignVertical: 'bottom',

        fontSize: 30,
        color: '#ffff',
        marginHorizontal: 2,
        // fontWeight:'bold',
        // borderWidth : 1,
        // borderColor : 'white',

    }
    ,
    timeString2: {
        // height  :'100%',
        textAlignVertical: 'bottom',
        fontSize: 20,
        color: '#ffff',
        marginHorizontal: 2,
        // textAlign :'center'
        // borderWidth : 1,
        // borderColor : 'white',
    }
    ,
    alarmLabel: {
        // height  :'100%',
        textAlignVertical: 'bottom',
        fontSize: 14,
        marginHorizontal: 2,
        // textAlign :'center'
        // borderWidth : 1,
        // borderColor : 'white',
    }
    ,
    leftBottom: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        alignItems: 'top',
        // backgroundColor :'grey',
    },
    alarmDays: {
        fontSize: 14,
        marginHorizontal: 2,
    },
    alarmIn: {
        fontSize: 14,
        marginHorizontal: 2,
    },
    rightContainer: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor :'grey',
    },
});
