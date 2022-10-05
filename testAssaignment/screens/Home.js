import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../components/searchBar';
import {BigTitle, ContentText, Title} from '../components/textBase';
import {COLORS} from '../constants/theme';
import {useDispatch} from 'react-redux';
import {signOut} from '../redux/actions/authenticationAction';
import Router from './Router';
import {StackActions} from '@react-navigation/native';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const [logOut, setLogOut] = useState(false);

  useEffect(() => {
    if (logOut) {
      //navigation.dispatch(StackActions.replace('LogIn'));
      dispatch(signOut());
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'LogIn',
            params: {someParam: ''},
          },
        ],
      });
    }
  }, [logOut]);

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.headerWrappr}>
      {/* search bar  */}
      <SearchBar navigation={navigation}></SearchBar>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.categoryContainer}>
        <View>
          <BigTitle text={'Welcome aboard!'} />
          <ContentText text={'Please choose a category to continue'} />
        </View>
        {/* science category */}
        {/* world */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.category}
          onPress={() => navigation.navigate('TopNews', {category: 'world'})}>
          <ImageBackground
            source={require('../assets/images/worldNews.png')}
            style={{flex: 1, padding: 10}}>
            <BigTitle _color={COLORS.creme} text={'WORLD'}></BigTitle>
          </ImageBackground>
        </TouchableOpacity>
        {/* sience */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.category}
          onPress={() => navigation.navigate('TopNews', {category: 'science'})}>
          <ImageBackground
            source={require('../assets/images/science.jpg')}
            style={{flex: 1, padding: 10}}>
            <BigTitle _color={COLORS.creme} text={'SCIENCE'}></BigTitle>
          </ImageBackground>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <TouchableOpacity hitSlop={50} onPress={() => setLogOut(true)}>
        <Title text={'Sign out'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrappr: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  category: {
    height: 100,
    backgroundColor: COLORS.creme,
    width: '100%',
    marginVertical: 20,
  },
  categoryContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
