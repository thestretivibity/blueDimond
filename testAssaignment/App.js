import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
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
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import TopNews from './screens/TopNews';
import Search from './screens/Search';
import Article from './screens/Articles';
const Stack = createStackNavigator();
const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  // };

  return (
    <NavigationContainer theme={{colors: {background: '#fff'}}}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <StackNavigator />
    </NavigationContainer>
  );
};

function StackNavigator({navigation}) {
  const config = {
    animation: 'timing',
    config: {
      stiffness: 1000,
      damping: 1000,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: 19},
        headerBackTitleStyle: {fontSize: 19},
        headerTitleStyle: {color: '#000'},
        headerStyle: {backgroundColor: '#fff', elevation: 5},
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
          headerShown: false,
          headerTitle: 'Home',
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="Article"
        component={Article}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
          headerShown: true,
          headerTitle: '',
          animationEnabled: true,
        }}
      />

      <Stack.Screen
        name="TopNews"
        component={TopNews}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: true,
          headerTitle: 'Top News',
          animationEnabled: true,
        }}
      />

      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: false,
          animationEnabled: true,
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: true,
          headerTitle: 'Search Result',
          animationEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
