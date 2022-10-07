import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Comment from '../components/comment';
import {
  Title,
  SmallTitle,
  BigTitle,
  ContentText,
  UnderTitle,
} from '../components/textBase';
import ApiCall from '../API/ApiCall';
import useApi from '../hooks/ApiUsage';
import {COLORS} from '../constants/theme';

export default function Article({route, navigation}) {
  const {title, abstract, url, byline, created_date, multimedia, category} =
    route.params;
  console.log(url);
  const {
    data,
    error,
    loading,
    request: getComments,
  } = useApi(ApiCall.getComments, url);
  useEffect(() => {
    getComments(url);
    navigation.setOptions({headerTitle: `${category}`.toUpperCase()});
  }, []);
  useEffect(() => {
    if (error) navigation.navigate('Home');
    if (!loading) {
    }
  }, [loading, error]);

  const renderComment = ({item}) => (
    <Comment
      commentBody={item.commentBody}
      userDisplayName={item.userDisplayName}
      createDate={item.createDate}
    />
  );
  const NewsArticle = () => {
    return (
      <View style={styles.article}>
        <Title text={title} />
        <SmallTitle text={byline} />
        <SmallTitle
          text={new Date(created_date).toLocaleDateString('en-US')}
          _color={COLORS.darkGray}
        />
        <Image
          resizeMode={'cover'}
          source={{uri: multimedia[1]?.url}}
          style={styles.articleImage}></Image>

        <ContentText text={abstract} />
        {/* continue on nyt.com */}
        <TouchableOpacity
          style={styles.gotoNYT}
          onPress={() => Linking.openURL(url)}>
          <UnderTitle
            text={'Continue reading in NYT.com'}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <BigTitle text={'Comments'} style={{marginBottom: 5}} />
      </View>
    );
  };
  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={styles.headerWrappr}>
      <View style={styles.comments}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.black} />
        ) : (
          <FlatList
            style={{padding: 15, marginBottom: 5}}
            data={data?.results?.comments}
            renderItem={renderComment}
            keyExtractor={item => item?.commentID}
            //   onEndReached={()=> }
            ListHeaderComponent={NewsArticle}
            ListEmptyComponent={
              <SmallTitle
                text={data?.errorDetails || 'This article has no comment!'}
                _color={COLORS.black}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrappr: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  article: {marginBottom: 15},
  articleImage: {
    backgroundColor: COLORS.darkCreme,
    width: null,
    height: 200,
    marginVertical: 10,
  },
  gotoNYT: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comments: {flex: 1, justifyContent: 'center'},
  activityIndication: {
    color: COLORS.black,
    position: 'absolute',
    flex: 1,
  },
});
