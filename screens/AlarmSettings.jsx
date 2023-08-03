import React from 'react';
import { useState } from 'react';
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
//C:\Users\Gaurav\AppData\Local\Android\Sdk
import Icon from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataSliceActions } from '../toolkit/DataSlice';
//-----------------------------------------------------
import { AlarmModel } from '../models/AlarmModel';
import { updateOneAlarm, deleteOneAlarm } from '../database/databaseSetup';
import { DeleteIntervalByAlarmID } from '../database/databaseSetup';
//-----------------------------------------------------------
import { convertTo24HourFormat } from '../logic/TimeLogic';
import { convertTo12HourFormat } from '../logic/TimeLogic';
//-----------------------------------------------------------
const AlarmSettings = ({ navigation, route }) => {
    const dispatch = useDispatch();
    // console.log(route);
    let alarmModelObj = route.params.alarmModelObj;
    //-----------------------------------------------------
    //well done Gaurav
    const [id, setId] = useState(alarmModelObj.id)
    const [label, setLabel] = useState(alarmModelObj.label)
    const [hour, setHour] = useState(alarmModelObj.hour);
    const [minute, setMinute] = useState(alarmModelObj.minute);
    const [mode, setMode] = useState(alarmModelObj.mode);
    const [ringtone, setRingtone] = useState(alarmModelObj.ringtone);
    const [ringtone_location, setRingtone_location] = useState(alarmModelObj.ringtone_location);
    const [vibrate, setVibrate] = useState(alarmModelObj.vibrate === "1" ? true : false);
    const [active_status, setActive_status] = useState(alarmModelObj.active_status === "1" ? true : false);
    const [ends_after, setEnds_after] = useState(alarmModelObj.ends_after);
    const [intervalList, setIntervalList] = useState(alarmModelObj.intervalList);
    // console.log(intervalList);
    //-----------------------------------------------------
    function makeItProperNumber(value) {
        if (value < 10) {
            return '0' + String(value);
        }
        return value;
    }
    const [isEnabled, setIsEnabled] = useState(vibrate);
    const toggleSwitch = () => setIsEnabled((previousState) => {
        setVibrate(!previousState);
        return !previousState;
    });
    //-----------------------------------------------------------------------
    //-----------------------------------------------------
    useEffect(() => {
        setActive_status(false);
        navigation.setOptions({
            headerRight: () => {
                return <>
                    <Pressable
                        onPress={() => {
                            // console.log(hour,minute,vibrate);
                            //------------
                            alarmModelObj.id = id;
                            alarmModelObj.label = label;
                            alarmModelObj.hour = hour;
                            alarmModelObj.minute = minute;
                            alarmModelObj.mode = mode;
                            alarmModelObj.ringtone = ringtone;
                            alarmModelObj.ringtone_location = ringtone_location;
                            alarmModelObj.vibrate = vibrate;
                            alarmModelObj.active_status = active_status;
                            alarmModelObj.ends_after = ends_after;
                            alarmModelObj.intervalList = intervalList;
                            //------------
                            async function getComputationDone(){
                                return new Promise((resolve,reject)=>{
                                    resolve(convertTo24HourFormat(hour,minute,mode));
                                })
                            }
                            getComputationDone().then(([hoursIn24FormatTemp, minutesIn24FormatTemp])=>{
                                alarmModelObj.hour =hoursIn24FormatTemp;
                                alarmModelObj.minute=minutesIn24FormatTemp;
                                alarmModelObj.active_status=false;
                                // console.log(alarmModelObj);
                                updateOneAlarm(alarmModelObj).then(() => {
                                    navigation.goBack();
                                    dispatch(dataSliceActions.toggleRefresh());
                                })
                            })
                        }}
                    >
                        <Icon name="check" size={30} color="#FFF" />
                    </Pressable>
                </>
            },
        })
    }, [id, label, hour, minute,
        mode, ringtone, ringtone_location,
        vibrate, active_status, ends_after, intervalList])
    //-----------------------------------------------------------------------
    function displayTimeInText(hour,minute,mode) {
        const [hourIn12Format,minuteIn12Format]=convertTo12HourFormat(hour,minute,mode);
        return `${makeItProperNumber(hourIn12Format)} : ${makeItProperNumber(minuteIn12Format)} ${mode}`
    }
    //-----------------------------------------------------------------------
    return (
        <View style={styles.container}>
            <View style={styles.dateSection}>
                <View style={styles.firstSection}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{
                            flex: 1,
                        }}
                        initialNumToRender={2}
                        data={['AM', 'PM']}
                        renderItem={obj => {
                            return <Pressable
                                onPress={() => {
                                    setMode(obj.item);
                                }}
                                android_ripple={{ 'color': '#ffff' }}
                            >
                                <Text
                                    style={styles.number}
                                >
                                    {makeItProperNumber(obj.item)}
                                </Text>
                            </Pressable>;
                        }}
                        keyExtractor={obj => obj}
                    />
                </View>
                <View style={styles.secondSection}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{
                            flex: 1,
                        }}
                        initialNumToRender={6}
                        data={[...Array(13).keys()]}
                        renderItem={obj => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        setHour(obj.item)
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
                        data={[...Array(60).keys()]}
                        renderItem={obj => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        setMinute(obj.item)
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
            <View style={styles.optionSection}>
                <Text style={styles.optionTextSpecial}>
                    {displayTimeInText(hour,minute,mode)}
                </Text>
            </View>
            <View style={styles.optionSection}>
                <Text style={styles.optionTextLeft}>Ringtone</Text>
                <Text style={styles.optionTextRight}>{ringtone}</Text>
                <Icon name="right" size={16} color="#505050" />
            </View>
            <Pressable
                style={styles.optionSection}
                onPress={() => {
                    navigation.navigate('IntervalScreen', {
                        alarm_id: id,
                        intervalList: intervalList
                    });
                }}>
                <Text style={styles.optionTextLeft}>Interval</Text>
                <Icon name="right" size={16} color="#505050" />
            </Pressable>
            <View style={styles.optionSection}>
                <Text style={styles.optionTextLeft}>Vibrate</Text>
                <Switch
                    trackColor={{ false: '#505050', true: '#0073dd' }}
                    thumbColor={isEnabled ? '#FFFF' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={styles.optionSection}>
                <Text style={styles.optionTextLeft}>Ends After</Text>
                <Text style={styles.optionTextRight}>{`${ends_after} hrs`}</Text>
                <Icon name="right" size={16} color="#505050" />
            </View>
            <View style={styles.delButtonSection}>
                <Pressable
                    onPress={() => {
                        // console.log("I'm hit");
                        DeleteIntervalByAlarmID(id).then(() => {
                            deleteOneAlarm(id).then(() => {
                                dispatch(dataSliceActions.toggleRefresh())
                                navigation.goBack();
                            })
                        })

                    }}>
                    <Icon name="delete" size={30} color="#e62e00" />
                </Pressable>

                {/* <Button title='Delete' color={'black'} ></Button> */}
            </View>
        </View>
    );
};

export default AlarmSettings;

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
        color: '#505050',
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
    optionSection: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderColor: '#ffff',
        // borderWidth: 2,
        height: Dimensions.get('window').height * 0.08,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
        paddingLeft: 20,
        paddingRight: 20,
        verticalAlign: 'middle',
    },
    optionTextSpecial: {
        fontSize: 30,
        textAlign: 'center',
        verticalAlign: 'middle',
        // height : '100%',
        width: '100%',
        // borderWidth: 2,
        // borderColor: '#ffff',
    },
    optionTextLeft: {
        fontSize: 20,
        width: '40%',
        textAlignVertical: 'center',
        textAlign: 'left',
        color: '#ffff',
        fontWeight: '600',
        borderColor: "blue",
        // borderWidth: 2,
    },
    optionTextRight: {
        fontSize: 16,
        width: '55%',
        textAlignVertical: 'center',
        textAlign: 'right',
        color: '#505050',
        fontWeight: '600',
        marginRight: 3,
        // borderColor: "blue",
        // borderWidth: 2,
    },
    delButtonSection: {

        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.16,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
        // borderWidth: 2,
        // borderColor: '#ffff',
    }
});
