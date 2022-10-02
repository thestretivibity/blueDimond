import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  Keyboard,
  Image,
  Linking,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../constants/theme';
import {ContentText, SmallTitle, Title} from './textBase';

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}
const trunc = s => s.split(/[.?!]/)[0].split(' ').slice(0, 8).join(' ');

const SearchItem = ({
  lead_paragraph,
  abstract,
  web_url,
  byline,
  pub_date,
  multimedia,
  navigation,
}) => {
  return (
    <View style={styles.content}>
      <Image
        style={styles.articleImage}
        source={{
          uri: `https://static01.nyt.com/` + multimedia[2]?.url,
        }}></Image>
      <View style={styles.articleView}>
        <View>
          <Title text={trunc(lead_paragraph) + `...`} />
          <ContentText text={abstract} />
        </View>
        <TouchableOpacity
          hitSlop={20}
          style={styles.button}
          onPress={() => Linking.openURL(web_url)}>
          <SmallTitle text={'Continue'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  articleView: {
    flexShrink: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  articleImage: {
    height: null,
    width: 120,
    minHeight: 200,
    backgroundColor: COLORS.darkCreme,
  },
  button: {
    alignItems: 'flex-end',
  },
});

export default SearchItem;
