import { apiClients } from '../../config/api.config';
import { Article, SearchParams } from '../../types/api.types';
import { handleApiError } from '../../utils/error.utils';

export const newsApiService = {
  search: async ({ keyword, fromDate, toDate }: SearchParams): Promise<Article[]> => {
    try {
      const { data } = await apiClients.newsApi.get('/everything', {
        params: {
          q: keyword,
          from: fromDate,
          to: toDate,
          sortBy: 'publishedAt',
          language: 'en',
          pageSize: 20,
        },
      });

      if (data.status !== 'ok') throw new Error('NewsAPI response not ok');

      return data.articles.map((item: any): Article => ({
        id: `newsapi-${item.publishedAt}-${item.title}`,
        source: item.source?.name || 'NewsAPI',
        author: item.author || 'News Api',
        title: item.title,
        description: item.description || '',
        url: item.url,
        urlToImage: item.urlToImage || '',
        publishedAt: item.publishedAt,
      }));
    } catch (error) {
      return handleApiError(error, 'NewsAPI');
    }
  },
}; 