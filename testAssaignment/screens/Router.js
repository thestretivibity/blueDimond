import React, {useEffect, useState} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getToken,
  saveToken,
  signIn,
  signOut,
} from '../redux/actions/authenticationAction';
export default function Router({navigation}) {
  const dispatch = useDispatch();
  const authentication = useSelector(
    state => state.Athentications?.authentication,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedOut, setIsSignedOut] = useState(true);
  const handleInitialRouting = () => {
    if (authentication) {
      setIsSignedOut(authentication[0]?.isSignedOut);
      console.log(isSignedOut);
    }
    if (isSignedOut) {
      navigation.dispatch(StackActions.replace('LogIn'));
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (isLoading) {
      dispatch(getToken());
      handleInitialRouting();
    }
  }, [setIsLoading]);

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.headerWrappr}>
      <Text style={{color: '#000'}}></Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrappr: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 30,
  },
});
