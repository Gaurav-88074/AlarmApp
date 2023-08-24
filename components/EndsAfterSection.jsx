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
  FlatList,
  ToastAndroid
} from 'react-native';

const EndsAfterSection = (props) => {
  function makeItProperNumber(value) {
    if (value < 10) {
      return '0' + String(value);
    }
    return value;
  }
  return (
    <View style={styles.optionSection}>
      <Text style={styles.endAfterHeading}>
        Pick one
      </Text>
      <View style={styles.scrollTimeSection}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
          initialNumToRender={2}
          data={[...Array(25).keys()].slice(1)}
          renderItem={obj => {
            return <Pressable
              onPress={() => {
                props.onEndsAfterHandler();
                props.setEnds_after(parseInt(obj.item))
              }}
              // android_ripple={{ 'color': '#ffff' }}
              style ={styles.numberButton}
            >
              <Text
                style={styles.numberButtonText}
              >
                {makeItProperNumber(obj.item)}
              </Text>
            </Pressable>;
          }}
          keyExtractor={obj => obj}
        />
      </View>
    </View>
  )
}

export default EndsAfterSection
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
  optionSection: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // borderColor: '#ffff',
    // borderWidth: 2,
    height: Dimensions.get('window').height * 0.10,
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    verticalAlign: 'middle',
  },
  endAfterHeading: {
    height: '30%',
    width: '100%',
    fontWeight :'bold',
    color :'#ffff',
    textAlign :'center',
    // borderColor: '#ffff',
    // borderWidth: 2,
  },
  scrollTimeSection: {
    height: '70%',
    width: '100%',
    // borderColor: '#ffff',
    // borderWidth: 2,
  },
  numberButton: {
    height: '100%',
    width: Dimensions.get('window').width * 0.14,
    borderRadius: 100,
    marginHorizontal: 5,
    overflow :'hidden',
    // borderColor: "blue",
    // borderWidth: 1,
    // backgroundColor: '#ffff',
  },
  numberButtonText: {
    height: '100%',
    width: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor : '#272727',
    color : '#FFFF',
    // color: '#272727',
  }
});
