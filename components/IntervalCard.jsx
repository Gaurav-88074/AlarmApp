import React from 'react';
import { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { DeleteIntervalByIntervalID } from '../database/databaseSetup';
import { useDispatch } from 'react-redux';
import { dataSliceActions } from '../toolkit/DataSlice';
const IntervalCard = ({ minuteDuration,secondDuration, navigation,id,alarm_id}) => {
    const dispatch = useDispatch();
    //--------------------------------------------------------------------
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // console.log(id);
    //------------------------------------------------------------------
    
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    navigation.navigate("AddIntervalScreen",{
                        minuteDuration ,
                        secondDuration 
                    })
                    // console.log("I'm not going anywhere");
                }}
                android_ripple={{
                    color: '#505050',
                }}
                style={{
                    ...styles.pressableContainer,
                }}>
                <View style={styles.leftContainer}>
                    <Text style={styles.timeString1}>
                        {`${minuteDuration} : ${secondDuration}`}
                    </Text>
                </View>
                <View style={styles.midContainer}>
                    {/* <Pressable onPress={() => {
                        console.log("UP");
                    }}>
                        <Icon name="arrowup" size={30} color="#ffff" />
                    </Pressable>
                    <Pressable onPress={() => {
                        console.log("DOWN");
                    }}>
                        <Icon name="arrowdown" size={30} color="#ffff" />
                    </Pressable> */}
                    <Pressable onPress={() => {
                        // console.log("delete");
                        DeleteIntervalByIntervalID(id).then((message)=>{
                            console.log(message);
                            dispatch(dataSliceActions.toggleRefresh());
                            navigation.popToTop();
                        })
                    }}>
                        <Icon name="delete" size={30} color="red" />
                    </Pressable>
                </View>
                {/* <View style={styles.rightContainer}>
                    <Switch
                        trackColor={{ false: '#505050', true: '#0073dd' }}
                        thumbColor={isEnabled ? '#FFFF' : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View> */}
            </Pressable>
        </View>
    );
};

export default IntervalCard;
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
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        // backgroundColor :'grey',
    },
    midContainer: {
        width: '40%',
        height: '100%',
        // borderWidth : 1,
        // borderColor : 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    timeString1: {
        // justifyContent :'
        height: '100%',
        width: "100%",
        textAlignVertical: 'center',

        fontSize: 30,
        color: '#ffff',
        marginHorizontal: 2,
        // fontWeight:'bold',
        // borderWidth : 1,
        // borderColor : 'white',

    }

    ,
    rightContainer: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        // flexDirection:'row',
        justifyContent: 'center',
        // backgroundColor :'grey',
    },
});
