import { useQuery } from '@tanstack/react-query';
import { Article, SearchParams, NewsSource } from '../types/api.types';
import { newsApiService } from '../services/news/newsapi.service';
import { guardianService } from '../services/news/guardian.service';
import { nytService } from '../services/news/nyt.service';

const newsServices = {
  newsapi: newsApiService,
  guardian: guardianService,
  nyt: nytService,
};

export const useNews = (
  params: SearchParams,
  sources: NewsSource[] = ['newsapi', 'guardian', 'nyt']
) => {
  return useQuery({
    queryKey: ['news', params, sources],
    queryFn: async () => {
      const promises = sources.map(source => 
        newsServices[source].search(params)
      );

      const results = await Promise.all(promises);
      const articles = results.flat();

      return articles.sort((a: Article, b: Article) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    },
    enabled: Boolean(params.keyword),
    staleTime: 5 * 60 * 1000, 
  });
}; 