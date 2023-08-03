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
import Home from './screens/Home';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
//-----------------------------------------------
import BackgroundTask from './screens/BackgroundTask';
import Rough from './screens/Rough';
//-----------------------------------------------
import store from './toolkit/Store';
import { Provider } from 'react-redux';

//------------------------------------------------
function App() {
  
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  //----------------------------
  // return <BackgroundTask/>
  return (
    <>
      <Provider store={store} >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Home />
        {/* <Text>hello</Text> */}
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
