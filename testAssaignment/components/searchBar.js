import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  Keyboard,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../constants/theme';

const SearchBar = ({navigation}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsSearching(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsSearching(false);
      inputRef.current?.blur();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={[styles.mainView]}>
        <TextInput
          ref={inputRef}
          style={{flex: 1}}
          //   onBlur={() => setIsSearching(false)}
          //   onFocus={() => setIsSearching(true)}
          //   onPointerCancel={() => setIsSearching(false)}
          fontSize={SIZES.underTitle}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={() =>
            searchQuery.length > 0 && navigation.navigate('Search')
          }
          placeholder={'Search for articles...'}></TextInput>
        <TouchableOpacity style={styles.searchButton}></TouchableOpacity>
      </View>
      {isSearching && (
        <View style={{marginBottom: 2000}}>
          {/* Alert: here will go the previous searched query(last 5) */}
          {/* suggestion to make asynch storage with key being the user name + searchHistory */}
          <View style={{}}>
            <Text>Microsoft</Text>
            <Text>Microsoft</Text>
            <Text>Microsoft</Text>
            <Text>Microsoft</Text>
            <Text>Microsoft</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    borderRadius: 25,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: COLORS.white,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
  },
});
export default SearchBar;
