export interface Article {
  id: string;
  source: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  section?: string;
}

export interface SearchParams {
  keyword: string;
  fromDate?: string;
  toDate?: string;
}

export type NewsSource = 'newsapi' | 'guardian' | 'nyt'; 