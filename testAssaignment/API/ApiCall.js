import clientApi from './Client';

const searchArticles = (query, page) =>
  clientApi.apiClient(
    'search/v2/articlesearch.json?q=' +
      query +
      '&page=' +
      page +
      '&api-key=NVsCqBUzlU4WJRBYiCisq3FTjhcmciZ4&fq=source%3A(%22The%20New%20York%20Times%22)',
  );

const getComments = url =>
  clientApi.apiClientPUBLIC(
    'community/V3/requestHandler?cmd=GetCommentsAll&url=' + url,
  );

const getArticles = category =>
  clientApi.apiClient(
    `topstories/v2/${category}.json?api-key=NVsCqBUzlU4WJRBYiCisq3FTjhcmciZ4`,
  );

export default {
  searchArticles,
  getComments,
  getArticles,
};
