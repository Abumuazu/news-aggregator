import React from 'react';
import { Article } from '../../types/Article';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
}
const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className={styles.card}>
      <img
        width={50}
        height={50}
        loading="lazy"
        decoding="async"
        src={article.urlToImage || '/favicon.ico'} 
        alt={article.title}
        
        className={styles.thumbnail}
      />
      <div className={styles.details}>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.meta}>
          {article.source} {article.author && `| By ${article.author}`}<br />
          {new Date(article.publishedAt).toLocaleString()}
        </p>
        {article.description && (
          <p className={styles.description}>{article.description}</p>
        )}
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
