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
    ToastAndroid,
} from 'react-native';
const IntervalDetailCard = () => {
  return (
    <View>
        
    </View>
  )
}

export default IntervalDetailCard

const styles = StyleSheet.create({
    alarmCard : {
        // height: Dimensions.get('window').height * 0.13, //mentioned above
        width: Dimensions.get('window').width * 0.94,
        marginVertical: 7,
        flexDirection : 'column',
        alignItems: 'center',
        // backgroundColor :'#242424',
        borderRadius: 15,
        overflow: 'hidden',
    },
})