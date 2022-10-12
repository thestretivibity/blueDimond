import React, {useEffect, useState} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getToken} from '../redux/actions/authenticationAction';
export default function Router({navigation}) {
  const dispatch = useDispatch();
  const authentication = useSelector(
    state => state?.Authentications?.authentication,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedOut, setIsSignedOut] = useState('');
  const handleInitialRouting = () => {
    if (authentication.length > 0 && !authentication[0]?.isSignedOut) {
      setIsSignedOut(authentication[0]?.isSignedOut);
      navigation.dispatch(StackActions.replace('Home'));
      return;
    }

    setIsLoading(false);
    navigation.dispatch(StackActions.replace('LogIn'));
  };
  useEffect(() => {
    if (isLoading) {
      if (!authentication[0]?.isSignedOut) dispatch(getToken());
      handleInitialRouting();
    }
  }, [isLoading]);

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
