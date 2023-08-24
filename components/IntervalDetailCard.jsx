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
const IntervalDetailCard = ({ index, obj }) => {
  // console.log(obj);
  return (
    <View style={styles.card} >
      <Text style={styles.intervalHeading}>
        {`Interval : ${index + 1}`}
      </Text>
      <View style={styles.durationText}>
        <Text>
          {` ${obj.minute} MIN : ${obj.second} SEC`}
        </Text>
      </View>
    </View>
  )
}

export default IntervalDetailCard

const styles = StyleSheet.create({
  alarmCard: {
    // height: Dimensions.get('window').height * 0.13, //mentioned above
    width: Dimensions.get('window').width * 0.94,
    marginVertical: 7,
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor :'#242424',
    borderRadius: 15,
    overflow: 'hidden',
    
  },
  card: {
    height: Dimensions.get('window').width * 0.20,
    // borderRightColor: 'grey',
    // borderRightWidth: 1,
    width: Dimensions.get('window').width * 0.3,
    flexDirection: 'column',
    paddingLeft: 15,
  },
  intervalHeading: {
    height:'50%',
    color:'#ffff',
    textAlign:'center',
    textAlignVertical:'center',
  },
  durationText: {
    height:'50%',
    width:'95%',
    flexDirection:'row',
    textAlign:'center',
    textAlignVertical:'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
})