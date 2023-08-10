import React from 'react';
import { StyleSheet, Text, View, Alert, Button, Platform, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
//--------------------------------------------------------------
import AlarmScreen from './AlarmScreen';
import AlarmSettings from './AlarmSettings';
import Interval from './Interval';
import AddIntervalScreen from './AddIntervalScreen';
import AddAlarmScreen from './AddAlarmScreen';
//--------------------------------------------------------------
import { buttonSliceActions } from '../toolkit/ButtonSlice';
//--------------------------------------------------------------
import DBcomputation from '../database/DBcomputation';
//--------------------------------------------------------------
Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldPlaySound: true,
            shouldSetBadge:  false,
            shouldShowAlert: true,
        };
    },
});
//-------------------------------------
const Stack = createNativeStackNavigator();
const Home = () => {
    //----------------------------------------------------------
    DBcomputation();
    //------------------------------------------------------------
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AlarmScreen">
                <Stack.Screen
                    name="AlarmScreen"
                    component={AlarmScreen}
                    options={{
                        title: 'Alarm',
                        headerTintColor: '#FFFF',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                    }}
                />
                <Stack.Screen
                    name="AlarmSettings"
                    component={AlarmSettings}
                    options={{
                        title: 'Edit alarm',
                        headerTintColor: '#FFFF',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTitleAlign: 'center',
                        animation: 'slide_from_bottom',
                    }}
                />
                <Stack.Screen
                    name="IntervalScreen"
                    component={Interval}
                    options={{
                        title: 'Intervals',
                        headerTintColor: '#FFFF',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTitleAlign: 'center',
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name="AddIntervalScreen"
                    component={AddIntervalScreen}
                    options={{
                        title: 'Add New Interval',
                        headerTintColor: '#FFFF',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTitleAlign: 'center',
                        animation: 'fade_from_bottom'
                    }}
                />
                <Stack.Screen
                    name="AddAlarmScreen"
                    component={AddAlarmScreen}
                    options={{
                        title: 'Add New Alarm',
                        headerTintColor: '#FFFF',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTitleAlign: 'center',
                        animation: 'fade_from_bottom',
                    }}
                />
            </Stack.Navigator >
        </NavigationContainer>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
