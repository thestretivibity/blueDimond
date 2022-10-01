import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../constants/theme';

export const BigTitle = props => {
  return <Text style={styles.bigTitle}>{props.text}</Text>;
};

export const UnderTitle = props => {
  return (
    <Text style={[styles.underTitle, {color: props.color}]}>{props.text}</Text>
  );
};

export const ContentText = props => {
  return <Text style={styles.contentText}>{props.text}</Text>;
};
export const Title = props => {
  return <Text style={styles.title}>{props.text}</Text>;
};

export const SmallTitle = props => {
  return <Text style={styles.smallTitle}>{props.text}</Text>;
};

const textBase = {BigTitle, UnderTitle, ContentText, Title, SmallTitle};

const styles = StyleSheet.create({
  bigTitle: {
    color: COLORS.black,
    fontSize: SIZES.bigTitle,
    fontWeight: 'bold',
  },
  underTitle: {
    color: COLORS.secondary,
    fontSize: SIZES.underTitle,
  },
  contentText: {
    color: COLORS.darkGray,
    fontSize: SIZES.content,
  },
  title: {
    color: COLORS.black,
    fontSize: SIZES.title,
    fontWeight: 'bold',
  },
  smallTitle: {
    color: COLORS.secondary,
    fontSize: SIZES.byLine,
  },
});

export default textBase;
