import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

const Rough = () => {
    

    return (
        <View style={styles.screen}>
            <Text>
                I'm on
            </Text>
            <Button title='Schedule' onPress={()=>{
                console.log("I'm hit");
        
            }}></Button>
        </View>
    )
}

export default Rough
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        margin: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
});