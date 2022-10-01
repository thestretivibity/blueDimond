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
import {ContentText, SmallTitle} from './textBase';

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}
const Comment = ({commentID, userDisplayName, createDate, commentBody}) => {
  return (
    <View style={styles.content}>
      <View style={styles.profile}></View>
      <View style={styles.commentContainer}>
        <Text style={styles.userName}>{userDisplayName}</Text>
        <Text style={styles.commentDate}>
          {toDateTime(createDate).toLocaleDateString('en-US')}
        </Text>
        <ContentText text={commentBody} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {flexDirection: 'row'},
  userName: {
    color: COLORS.primary,
    fontSize: SIZES.byLine,
    fontWeight: 'bold',
  },
  commentDate: {
    color: COLORS.black,
    marginBottom: 10,
  },
  commentContainer: {
    flex: 1,
    backgroundColor: COLORS.creme,
    marginBottom: 20,
    padding: 15,

    borderBottomEndRadius: 15,
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLORS.darkCreme,
    marginRight: 5,
    marginTop: 10,
  },
});

export default Comment;
