import {Link, ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
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
import {COLORS} from '../constants/theme';

export default function Article({route, navigation}) {
  const {title, abstract, url, byline, created_date, multimedia} = route.params;
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
    <SafeAreaView edges={['left', 'right']} style={styles.headerWrappr}>
      <View style={styles.comments}>
        <FlatList
          style={{padding: 20, marginBottom: 5}}
          data={DATA}
          renderItem={renderComment}
          keyExtractor={item => item.commentID}
          ListHeaderComponent={NewsArticle}
        />
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
  comments: {flex: 1},
});

const DATA = [
  {
    commentID: 120670731,
    status: 'approved',
    commentSequence: 120670731,
    userID: 79972461,
    userDisplayName: 'Practical Thoughts',
    userLocation: 'East Coast',
    userTitle: 'NULL',
    userURL: 'NULL',
    picURL: null,
    commentTitle: '',
    commentBody:
      'The acts of cigarette makers and McKinsey are deplorable. With that said, there is not ONE American over the age of 15 that doesn’t know smoking is bad for them. In Europe they put ghastly pictures of lung cancer stricken people and diseased organs….yet people there puff away. \n\nPre 1980’s, the information wasn’t widely understood….Post 2000?  \n\nSame goes for alcohol, fast foods, not getting vaccinated. \n\nPeople have the right to destroy themselves',
    createDate: '1664492193',
    updateDate: '1664516303',
    approveDate: '1664516303',
    recommendations: 0,
    replyCount: 0,
    replies: [],
    editorsSelection: false,
    parentID: null,
    parentUserDisplayName: null,
    depth: 1,
    commentType: 'comment',
    trusted: 0,
    recommendedFlag: 0,
    permID: '120670731',
    isAnonymous: false,
  },
  {
    commentID: 120671731,
    status: 'approved',
    commentSequence: 120671731,
    userID: 80256674,
    userDisplayName: 'Bobby V.',
    userLocation: 'Nyc',
    userTitle: 'NULL',
    userURL: 'NULL',
    picURL: null,
    commentTitle: '',
    commentBody:
      'Ban them from government contracts.  Clearly advising the FDA while simultaneously advising the tobacco industry is a conflict of interest.  An organization so morally bankrupt has no business advising government on issue impacting the public good. If I was president, I’d sign an executive order tomorrow making this happen.',
    createDate: '1664497606',
    updateDate: '1664516303',
    approveDate: '1664516303',
    recommendations: 0,
    replyCount: 0,
    replies: [],
    editorsSelection: false,
    parentID: null,
    parentUserDisplayName: null,
    depth: 1,
    commentType: 'comment',
    trusted: 0,
    recommendedFlag: 0,
    permID: '120671731',
    isAnonymous: false,
  },
  {
    commentID: 120669754,
    status: 'approved',
    commentSequence: 120669754,
    userID: 18545270,
    userDisplayName: 'Tom C.',
    userLocation: 'San Diego',
    userTitle: 'NULL',
    userURL: 'NULL',
    picURL: null,
    commentTitle: '',
    commentBody:
      'Perhaps McKinsey, beginning with Bob Sternfels, could create Memorial Museums throught the world memorializing the millions of victims of tabacco.  \nAnd that could be just for starters',
    createDate: '1664487191',
    updateDate: '1664516295',
    approveDate: '1664516295',
    recommendations: 0,
    replyCount: 0,
    replies: [],
    editorsSelection: false,
    parentID: null,
    parentUserDisplayName: null,
    depth: 1,
    commentType: 'comment',
    trusted: 0,
    recommendedFlag: 0,
    permID: '120669754',
    isAnonymous: false,
  },
  {
    commentID: 120671214,
    status: 'approved',
    commentSequence: 120671214,
    userID: 83628786,
    userDisplayName: 'Ben',
    userLocation: 'SC',
    userTitle: 'NULL',
    userURL: 'NULL',
    picURL: null,
    commentTitle: '',
    commentBody:
      "I worked for a cable company.  They brought McKinsey in to design our customer retention strategy.  You know how employees at cable companies refuse to help you with your bills?  That's exactly what McKinsey trained us to do.",
    createDate: '1664494903',
    updateDate: '1664516295',
    approveDate: '1664516295',
    recommendations: 0,
    replyCount: 0,
    replies: [],
    editorsSelection: false,
    parentID: null,
    parentUserDisplayName: null,
    depth: 1,
    commentType: 'comment',
    trusted: 0,
    recommendedFlag: 0,
    permID: '120671214',
    isAnonymous: false,
  },
];
