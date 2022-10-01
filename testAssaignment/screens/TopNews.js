import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BigTitle} from '../components/textBase';

export default function TopNews({navigation}) {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.headerWrappr}>
      <BigTitle text={'WORLD'} />
      <Text style={{color: '#000'}}>Test From TopNews</Text>
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
