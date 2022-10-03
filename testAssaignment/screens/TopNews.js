import React, {useEffect} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BigTitle} from '../components/textBase';
import TopNewsItem from '../components/top_news';
import {COLORS} from '../constants/theme';
import ApiCall from '../API/ApiCall';
import useApi from '../hooks/ApiUsage';
export default function TopNews({route, navigation}) {
  const {category} = route.params;
  const {
    data,
    error,
    loading,
    request: getArticles,
  } = useApi(ApiCall.getArticles, category);
  useEffect(() => {
    getArticles(category);
  }, []);
  useEffect(() => {
    if (error) navigation.navigate('Home');
    if (!loading) {
      console.log('yes');
    }
  }, [loading, error]);

  const renderNew = ({item}) => (
    <TopNewsItem
      title={item.title}
      abstract={item.abstract}
      url={item.url}
      byline={item.byline}
      created_date={item.created_date}
      multimedia={item.multimedia}
      category={category}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={styles.headerWrappr}>
      <View style={styles.title}>
        <BigTitle text={`${category}`.toUpperCase()} />
        <Text style={{color: '#000'}}>Test From TopNews</Text>
      </View>
      <View
        style={{
          alignSelf: 'stretch',
          justifyContent: 'center',
          paddingBottom: 15,
        }}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.black} />
        ) : (
          <FlatList
            style={{marginTop: 20, marginBottom: 10, paddingBottom: 5}}
            data={data?.results?.filter(
              c => c?.multimedia && c?.section.length > 0,
            )}
            renderItem={renderNew}
            keyExtractor={item => item.url}
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
