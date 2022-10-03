import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../constants/theme';

//REDUX STUFF TO MAKE SURE THAT WE'VE REGESTRED THE ENTRED QUERY
import {useSelector, useDispatch} from 'react-redux';
import {addQuery} from '../redux/actions/searchAction';
import {UnderTitle} from './textBase';

const SearchBar = ({navigation}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const queryList = useSelector(state => state.queries);
  const dispatchQuery = useDispatch();

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

  // WHEN THE SEARCH BUTTON OR ONE OF THE HISTORY SEARCHES IS CLICKED
  const HandleSearch = element => {
    if ((searchQuery.length > 0) | (element?.length > 0)) {
      navigation.navigate('Search', {query: element || searchQuery});
      dispatchQuery(addQuery(searchQuery));
      inputRef.current;
    }
  };
  //GETTING THE SEARCH HISTORY
  const getQueriesHistory = list => {};

  return (
    <SafeAreaView>
      <View style={[styles.mainView]}>
        <TextInput
          ref={inputRef}
          style={{flex: 1}}
          fontSize={SIZES.underTitle}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={() => HandleSearch()}
          placeholder={'Search for articles...'}></TextInput>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => HandleSearch()}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/images/search.png')}
          />
        </TouchableOpacity>
      </View>
      {isSearching && (
        <View style={{marginBottom: 2000}}>
          {/* DISPLAYING THE HISTORY OF LAST 5 SERCHED QUERIES */}
          {[...new Set(queryList.map(e => e.query))]
            .slice(0, 5)
            .map((element, index) => {
              return (
                <View key={index} style={{margin: 10}}>
                  <TouchableOpacity onPress={() => HandleSearch(element)}>
                    <UnderTitle text={element} />
                  </TouchableOpacity>
                </View>
              );
            })}
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
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SearchBar;
