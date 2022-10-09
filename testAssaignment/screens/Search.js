import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BigTitle} from '../components/textBase';
import ApiCall from '../API/ApiCall';
import useApi from '../hooks/ApiUsage';
import SearchItem from '../components/search_Item';
import {COLORS} from '../constants/theme';

export default function Search({route, navigation}) {
  const {query} = route.params;
  const [refrech, setRefrech] = useState(true);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(0);
  const {
    data,
    error,
    loading,
    request: searchArticles,
  } = useApi(ApiCall.searchArticles, query, page);
  useEffect(() => {
    if (refrech) {
      searchArticles(query, page);
      setPage(page + 1);
    }
    setRefrech(false);
  }, [refrech]);
  useEffect(() => {
    if (error) navigation.navigate('Home');
    if (!loading && !error) {
      setResult([...result, ...data?.response?.docs]);
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
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={styles.headerWrappr}>
      <View style={styles.title}>
        <BigTitle text={`"${query}"`} />
      </View>
      <View>
        {(!loading || page > 0) && (
          <FlatList
            style={{marginTop: 20, marginBottom: 10}}
            data={result}
            renderItem={renderResult}
            keyExtractor={item => item.web_url}
            onEndReached={() => setRefrech(true)}
            onEndReachedThreshold={0.5}
            bounces={true}
            ListFooterComponent={
              loading && <ActivityIndicator size="large" color={COLORS.black} />
            }
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
    alignItems: 'center',
  },
  title: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
});
