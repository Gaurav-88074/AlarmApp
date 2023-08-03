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
            FetchAllAlarm()
            .then((data)=>{
                const array = Array.from(data.rows._array);
                return array;
            })
            .then((array)=>{
                let n = array.length;
                const pc = [];
                for (let i = 0; i < n; i++) {
                    const obj = array[i];
                    pc.push(FetchOneAlarmInterval(obj.id));//promise
                    // .then((idata)=>{
                    //     obj['intervalList'] = idata;
                    // })                    
                }
                return new Promise.all(pc)
                .then((idata)=>{
                    let n = idata.length;
                    // console.log(n);
                    for (let i = 0; i < n; i++) {
                        const intervalArrayOfThis = idata[i].rows._array;
                        // console.log(intervalArrayOfThis);
                        array[i]['intervalList'] = intervalArrayOfThis;
                    }
                    return array;//hehe I'm genius
                });
            })
            .then((array)=>{
                // console.log(array);
                FetchAndSetRedux(array,dispatch);
            })
            .catch((error)=>{
                console.log(error);
            })
            // insertOneAlarm(
            //   roughobj
            // ).then((message)=>{
            //   console.log(message);
            // })
        })
        .catch((error) => {
            console.log(error);
            console.log('some error in db');
        });
    }, [refresh]);
    return <View></View>;
};

export default DBcomputation;
