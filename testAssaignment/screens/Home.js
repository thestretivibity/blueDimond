import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../components/searchBar';
import {BigTitle, ContentText} from '../components/textBase';
import {COLORS} from '../constants/theme';

export default function Home({navigation}) {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.headerWrappr}>
      {/* search bar  */}
      <SearchBar navigation={navigation}></SearchBar>
      <View>
        <BigTitle text={'Welcome Aboard Salah'} />
        <ContentText text={'Please choose a category to continue'} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled={false}
        style={styles.categoryContainer}>
        {/* sience category */}
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('TopNews')}>
          <BigTitle text={'WORLD'}></BigTitle>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <BigTitle text="SCIENCE"></BigTitle>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
