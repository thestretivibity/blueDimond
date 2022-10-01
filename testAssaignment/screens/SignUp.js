import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SignUp({navigation}) {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.headerWrappr}>
      <Text style={{color: '#000'}}>Test From SignUp</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrappr: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
