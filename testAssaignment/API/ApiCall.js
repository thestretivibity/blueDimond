import clientApi from './Client';

const searchArticles = query =>
  clientApi.apiClient(
    'search/v2/articlesearch.json?q=' +
      query +
      '&api-key=NVsCqBUzlU4WJRBYiCisq3FTjhcmciZ4&fq=source%3A(%22The%20New%20York%20Times%22)',
  );

const getComments = url =>
  clientApi.apiClientPUBLIC(
    'community/V3/requestHandler?cmd=GetCommentsAll&url=' + url,
  );

export default {
  searchArticles,
  getComments,
};
