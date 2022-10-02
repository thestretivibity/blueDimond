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
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../constants/theme';
import {ContentText, SmallTitle, Title} from './textBase';

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}
const TopNewsItem = ({
  title,
  abstract,
  url,
  byline,
  created_date,
  multimedia,
  category,
  navigation,
}) => {
  return (
    <View style={styles.content}>
      <Image
        style={styles.articleImage}
        source={{
          uri: multimedia[1]?.url,
        }}></Image>
      <View style={styles.articleView}>
        <View>
          <Title text={title} />
          <ContentText text={abstract} />
        </View>
        <TouchableOpacity
          hitSlop={20}
          style={styles.button}
          onPress={() =>
            navigation.navigate('Article', {
              title,
              abstract,
              url,
              byline,
              created_date,
              multimedia,
              category,
            })
          }>
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

export default TopNewsItem;
