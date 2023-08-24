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
    ToastAndroid
} from 'react-native';
//C:\Users\Gaurav\AppData\Local\Android\Sdk
import Icon from 'react-native-vector-icons/AntDesign';
import uuid from 'react-native-uuid';
// import DaysButtonComponent from '../components/DaysButtonComponent';
import { useEffect } from 'react';
//-----------------------------------------------------------
import { useDispatch } from "react-redux";
import { buttonSliceActions } from '../toolkit/ButtonSlice';
//-----------------------------------------------------------
import { AlarmModel } from '../models/AlarmModel';
import { insertOneAlarm } from '../database/databaseSetup';
import { dataSliceActions } from '../toolkit/DataSlice';
//-----------------------------------------------------------
import { convertTo24HourFormat } from '../logic/TimeLogic';
import { convertTo12HourFormat } from '../logic/TimeLogic';
import { computeScheduleDate } from '../logic/TimeLogic';
import { computeDifferenceStatement } from '../logic/TimeLogic';
import { giveAnswer } from '../logic/TimeLogic';
import EndsAfterSection from '../components/EndsAfterSection';
//-----------------------------------------------------------
const AddAlarmScreen = ({ navigation, route }) => {
    // console.log(navigation);
    // console.log(route);
    //-----------------------------------------------------
    const dispatch = useDispatch();
    //-----------------------------------------------------
    function makeItProperNumber(value) {
        if (value < 10) {
            return '0' + String(value);
        }
        return value;
    }
    const [isEnabled, setIsEnabled] = useState(true);
    //-----------------------------------------------------------------
    const [currentDate, setCurrentDate] = useState(new Date(Date.now()))
    const [schedule_date, setScheduleDate] = useState(
        computeScheduleDate(currentDate.getHours(), currentDate.getMinutes())
    );
    //--------------------------------------------------
    const [changeState, setChangeState] = useState(false);
    //--------------------------------------------------
    const [id, setId] = useState(uuid.v4())
    const [label, setLabel] = useState("Alarm")
    //--------
    const [hour, setHours] = useState(currentDate.getHours()%12);
    const [minute, setMinutes] = useState(currentDate.getMinutes());
    //--------
    const [mode, setMode] = useState(currentDate.getHours() >= 12 ? "PM" : "AM");
    const [ringtone, setRingtone] = useState("Default")
    const [ringtone_location, setRingtone_location] = useState("random_location")
    const [vibrate, setVibrate] = useState(true);
    const [active_status, setActive_status] = useState(false);
    const [ends_after, setEnds_after] = useState(10);
    //-----------------------------------------------------------------------
    const toggleSwitch = () => setVibrate(previousState => !previousState);
    //-----------------------------------------------------------------------
    const saveHeaderButtonHandler = () => {
        //-------------------
        async function getComputationDone(){
            // return new Promise((resolve,reject)=>{
            //     resolve(convertTo24HourFormat(hour,minute,mode));
            // })
            return [hour,minute]
        }
        getComputationDone().then(([hour, minute])=>{
            // console.log(hour,minute);
            const alarmObj = new AlarmModel({
                id, label, hour, minute,
                mode, ringtone, ringtone_location,
                vibrate, active_status, ends_after, schedule_date
            })
            return alarmObj;
        }).then((alarmObj)=>{
            // console.log(alarmObj);
            insertOneAlarm(alarmObj).then(() => {
                dispatch(dataSliceActions.toggleRefresh());
                // dispatch(dataSliceActions.addAlarmByAlarmId({
                //     alarmId : alarmObj.id,
                //     alarmObj : alarmObj
                // }))
                navigation.goBack();
            }).catch(()=>{
                console.log("we got issue");
            })
        })
        .catch((e)=>{
            console.log(e);
        })
        //-------------------------------

    }

    //-----------------------------------------------------
    useEffect(() => {
        //------------------------------------------------------
        navigation.setOptions({
            headerRight: () => {
                return <>
                    <Pressable
                        style={{
                            // backgroundColor:'red',
                        }}
                        android_ripple={{ 'color': '#ffff' }}
                        onPress={saveHeaderButtonHandler}
                    >
                        <Icon name="check" size={32} color="#FFF" />
                    </Pressable>
                </>
            },
        })
    },
        [
            hour, minute, mode,
            isEnabled, vibrate,
            ringtone , ringtone_location,
            active_status,ends_after,
            label
        ]
    )
    //-------------------------------------------------------------------
    const dayStateArray = new Array();
    for (let i = 0; i < 8; i++) {
        dayStateArray.push(useState(false));
    }


    // const [today, settoday] = useState(second)
    const DaysButtonComponent = (obj) => {
        const [isActive, setIsActive] = dayStateArray[obj.index];
        function toggleHandler() {
            setIsActive((isActive) => !isActive);
        }
        return (
            <Pressable
                style={{ ...styles.daysButton, 'backgroundColor': isActive ? "#FFFF" : "#272727" }}
                // android_ripple={{ 'color': '#ffff' }}
                onPress={() => {
                    toggleHandler()
                    // console.log("hit");
                }}
            >
                <Text
                    style={{ ...styles.daysButtonText, 'color': isActive ? "#272727" : "#FFFF" }}
                >
                    {obj.item}
                </Text>
            </Pressable>
        )

    }
    //-----------------------------------------------------------------------
    function displayTimeInText(hour,minute,mode) {
        // const [hourIn12Format,minuteIn12Format]=convertTo12HourFormat(hour,minute,mode);
        // return `${makeItProperNumber(hourIn12Format)} : ${makeItProperNumber(minuteIn12Format)} ${mode}`
        return `${makeItProperNumber(hour)} : ${makeItProperNumber(minute)} ${mode}`
    }
    const [endAfterShow, setEndAfterShow] = useState(false);
    function onEndsAfterHandler(params) {
        setEndAfterShow(prevState=>!prevState);
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
                                    setChangeState(changeState => !changeState);
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
                        data={[...Array(13).keys()].slice(1)}
                        renderItem={obj => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        setHours(obj.item)
                                        setChangeState(changeState => !changeState);
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
                                        setMinutes(obj.item)
                                        setChangeState(changeState => !changeState);
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
                <Text style={styles.optionTextRight}>Default ringtone</Text>
                <Icon name="right" size={16} color="#505050" />
            </View>
            <View style={styles.daysSection}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                    }}
                    // initialNumToRender={6}
                    data={["Sun", "Mon", "Tue", "Wed", "Thru", "Fri", "Sat"]}
                    renderItem={DaysButtonComponent}
                    keyExtractor={obj => obj}
                />
            </View>
            <View style={styles.optionSection}>
                <Text style={styles.optionTextLeft}>Vibrate</Text>
                <Switch
                    //vibrate=isenabled
                    trackColor={{ false: '#505050', true: '#0073dd' }}
                    thumbColor={vibrate ? '#FFFF' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={vibrate}
                />
            </View>
            <Pressable style={styles.optionSection}
                onPress={onEndsAfterHandler}
            >
                <Text style={styles.optionTextLeft}>Ends After</Text>
                <Text style={styles.optionTextRight}>{`${ends_after} hrs`}</Text>
                <Icon name="right" size={16} color="#505050" />
            </Pressable>
            {/* <View style={styles.optionSection}>
                <Text style={styles.optionTextLeft}>Label</Text>
                <Text style={styles.optionTextRight}>Alarm</Text>
                <Icon name="edit" size={16} color="#505050" />
            </View> */}
            {
                endAfterShow
                &&
                <EndsAfterSection 
                    onEndsAfterHandler={onEndsAfterHandler}
                    setEnds_after = {setEnds_after}
                >

                </EndsAfterSection>
            }
        </View>
    );
};

export default AddAlarmScreen;

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
        borderColor: 'black',
        borderWidth: 2,
        height: Dimensions.get('window').height * 0.075,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
        paddingLeft: 20,
        paddingRight: 20,
        verticalAlign: 'middle',

        // borderWidth: 2,
        // borderColor: '#ffff',
    },
    daysSection: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.08,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
        paddingLeft: 20,
        paddingRight: 20,
        // borderColor: 'blue',
        // borderWidth: 2,
    },
    daysButton: {
        height: '90%',
        width: Dimensions.get('window').width * 0.20,
        borderRadius: 10,
        marginHorizontal: 5,
        // borderColor: "blue",
        // borderWidth: 1,
        // backgroundColor : '#ffff',
    },
    daysButtonText: {
        height: '100%',
        width: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        // backgroundColor : '#272727',
        // color : '#FFFF',
        // color : '#272727',
    }
    ,
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
        // borderColor: "blue",
        // borderWidth: 2,
    },
    optionTextRight: {
        fontSize: 16,
        width: '55%',
        textAlignVertical: 'center',
        textAlign: 'right',
        color: '#505050',
        // fontWeight: '600',
        marginRight: 3,
        // borderColor: "blue",
        // borderWidth: 2,
    },
});
