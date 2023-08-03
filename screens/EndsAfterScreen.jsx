import React from 'react'
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
    ToastAndroid
} from 'react-native';
const EndsAfterScreen = () => {
  return (
    <View>

    </View>
  )
}

export default EndsAfterScreen

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
    }
});
