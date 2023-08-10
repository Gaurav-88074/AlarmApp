import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
//----------------------------------------
import { init } from './databaseSetup';
import { FetchAllAlarm } from './databaseSetup';
import { insertOneAlarm} from './databaseSetup';
import { useEffect, useState, } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { AlarmModel } from '../models/AlarmModel';
import { IntervalModel } from '../models/IntervalModel';
import { FetchAndSetRedux } from '../logic/ReduxMgmt';
import { FetchOneAlarmInterval } from './databaseSetup';
import {intervalSliceActions} from '../toolkit/IntervalSlice';
//----------------------------------------
const DBcomputation = () => {
    const dispatch = new useDispatch();
    const refresh = useSelector((state) => {
        return state.dataReducer.refresh;
    })
    //creating here because we can create this only in function components
    // const roughobj = new AlarmModel(
    //     new Date().toISOString(),
    //     'leetcode',
    //     'PM',
    //     '10',
    //     '50',
    //     'vt.mp3',
    //     'mars',
    //     'no',
    //     'off',
    //     '3',
    // );
    useEffect(() => {
        init().then(() => {
            console.log('intialization task done!!');
        })
        .then(() => {
            // console.log("wtf is happening");
            return FetchAllAlarm()
        })
        .then((data)=>{
            // const array = Array.from(data.rows._array);
            // return array;
            return JSON.parse(JSON.stringify(data.rows._array))
        })
        .then((arrayOfAlarms)=>{
            // console.log(arrayOfAlarms);
            const length = arrayOfAlarms.length;
            const pc = [];
            for (let i = 0; i < length; i++) {
                const obj = arrayOfAlarms[i];
                pc.push(FetchOneAlarmInterval(obj.id));//promise
            }
            return new Promise.all(pc)
            .then((idata)=>{
                let n = idata.length;
                // console.log(n);
                for (let i = 0; i < n; i++) {
                    const intervalArrayOfThis = idata[i].rows._array;
                    // console.log(intervalArrayOfThis);
                    arrayOfAlarms[i].intervalList = intervalArrayOfThis;
                    dispatch(intervalSliceActions.setIntervalListOfThisAlarmId({
                        alarmId : arrayOfAlarms[i].id,
                        intervalList :  intervalArrayOfThis
                    }))

                }
                return arrayOfAlarms;//hehe I'm genius
            });
        })
        .then((arrayOfAlarmsWithInterval)=>{
            return JSON.parse(JSON.stringify(arrayOfAlarmsWithInterval))
        })
        .then((arrayOfAlarmsWithInterval)=>{
            FetchAndSetRedux(arrayOfAlarmsWithInterval,dispatch);
        })
        .catch((error) => {
            console.log(error);
            console.log('some error in db');
        });
    }, [refresh]);
    return <View></View>;
};

export default DBcomputation;
