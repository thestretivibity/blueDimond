import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  AsyncStorage,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BigTitle} from '../components/textBase';
import ApiCall from '../API/ApiCall';
import useApi from '../hooks/ApiUsage';
import SearchItem from '../components/search_Item';
import {COLORS} from '../constants/theme';

export default function Search({route, navigation}) {
  const {query} = route.params;

  const {
    data,
    error,
    loading,
    request: searchArticles,
  } = useApi(ApiCall.searchArticles, query);
  useEffect(() => {
    searchArticles(query);
  }, []);
  useEffect(() => {
    if (error) navigation.navigate('Home');
    if (!loading) {
      console.log('yes');
    }
  }, [loading, error]);

  //redering the Item
  const renderResult = ({item}) => (
    <SearchItem
      lead_paragraph={item.lead_paragraph}
      abstract={item.abstract}
      web_url={item.web_url}
      byline={item.byline}
      pub_date={item.pub_date}
      multimedia={item.multimedia}
      navigation={navigation}
    />
  );
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.headerWrappr}>
      <BigTitle text={`"${query}"`} />
      <Text style={{color: '#000'}}>Test From Search</Text>
      <View>
        {!loading && (
          <FlatList
            style={{marginTop: 20, marginBottom: 10}}
            data={data?.response?.docs}
            renderItem={renderResult}
            keyExtractor={item => item.web_url}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrappr: {
    padding: 20,
    flex: 1,
    backgroundColor: COLORS.creme,
    alignItems: 'flex-start',
  },
});
