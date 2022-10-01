import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BigTitle} from '../components/textBase';

export default function Search({navigation}) {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.headerWrappr}>
      <BigTitle text={'"Microsoft"'} />
      <Text style={{color: '#000'}}>Test From Search</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrappr: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
});
