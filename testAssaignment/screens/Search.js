import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
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

const DATA = [
  {
    abstract:
      'The commentator, who is no stranger to controversy, claimed he had declined several times to have the former president on his influential podcast on Spotify.',
    web_url:
      'https://www.nytimes.com/2022/07/06/business/joe-rogan-donald-trump.html',
    snippet:
      'The commentator, who is no stranger to controversy, claimed he had declined several times to have the former president on his influential podcast on Spotify.',
    lead_paragraph:
      'Joe Rogan, whose contrarian views on vaccines and political conspiracy theories have made him popular with many supporters of former President Donald J. Trump, revealed that he had declined to host Mr. Trump on his influential podcast several times.',
    source: 'The New York Times',
    multimedia: [
      {
        rank: 0,
        subtype: 'xlarge',
        caption: null,
        credit: null,
        type: 'image',
        url: 'images/2022/07/07/multimedia/06rogan1/06rogan1-articleLarge.jpg',
        height: 400,
        width: 600,
        legacy: {
          xlarge:
            'images/2022/07/07/multimedia/06rogan1/06rogan1-articleLarge.jpg',
          xlargewidth: 600,
          xlargeheight: 400,
        },
        subType: 'xlarge',
        crop_name: 'articleLarge',
      },
      {
        rank: 0,
        subtype: 'popup',
        caption: null,
        credit: null,
        type: 'image',
        url: 'images/2022/07/07/multimedia/06rogan1/06rogan1-popup.jpg',
        height: 433,
        width: 650,
        legacy: {},
        subType: 'popup',
        crop_name: 'popup',
      },
      {
        rank: 0,
        subtype: 'blog480',
        caption: null,
        credit: null,
        type: 'image',
        url: 'images/2022/07/07/multimedia/06rogan1/06rogan1-blog480.jpg',
        height: 320,
        width: 480,
        legacy: {},
        subType: 'blog480',
        crop_name: 'blog480',
      },
      {
        rank: 0,
        subtype: 'blog533',
        caption: null,
        credit: null,
        type: 'image',
        url: 'images/2022/07/07/multimedia/06rogan1/06rogan1-blog533.jpg',
        height: 355,
        width: 533,
        legacy: {},
        subType: 'blog533',
        crop_name: 'blog533',
      },
      {
        rank: 0,
        subtype: 'blog427',
        caption: null,
        credit: null,
        type: 'image',
        url: 'images/2022/07/07/multimedia/06rogan1/06rogan1-blog427.jpg',
        height: 285,
        width: 427,
        legacy: {},
        subType: 'blog427',
        crop_name: 'blog427',
      },
    ],
  },
];
