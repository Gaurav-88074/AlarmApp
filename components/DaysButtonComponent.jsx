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
// import { useState } from 'react';
const DaysButtonComponent = (obj) => {
    // const [isActive, setIsActive] = useState(false);
    // function toggleHandler() {
    //     setIsActive((isActive)=>!isActive);
    // }
    return (
        <Pressable
            style={styles.daysButton}
            // android_ripple={{ 'color': '#ffff' }}
            onPress={()=>{
                // toggleHandler()
                console.log("hit");
            }}
        >
            <Text
                style={styles.daysButtonText}
            >
                {obj.item}
            </Text>
        </Pressable>
    )

}

export default DaysButtonComponent
const styles = StyleSheet.create({
    
    daysSection : {
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
    daysButton : {
        height : '90%',
        width :  Dimensions.get('window').width * 0.20,
        borderRadius:10,
        marginHorizontal : 5,
        // borderColor: "blue",
        // borderWidth: 1,
        backgroundColor : '#ffff',
    },
    daysButtonText :{
        height : '100%',
        width : '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight :'bold',
        // backgroundColor : '#272727',
        // color : '#FFFF',
        color : '#272727',
    }
});
