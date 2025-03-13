# News Aggregator

A fully featured news aggregator built with **React**, **TypeScript**, **Redux Toolkit**, **TanStack React Query**, and containerized with **Docker**.  
**Key Features**:
- Offline-first with service worker.
- Real data from:
  1. [NewsAPI](https://newsapi.org/)
  2. [The Guardian](https://open-platform.theguardian.com/)
  3. [New York Times](https://developer.nytimes.com/)
- Search and filtering by date, category, and source.
- Personalized feed with user preferences (sources, categories, authors).
- Apple-inspired dark UI (#000 background, #fff text, #0000FF accent).
- Mobile-responsive.

## Getting Started

1. **Create a `.env` file** from `.env.example` and fill in your actual API keys.
2. **Install dependencies**:
   ```bash
   npm install
3. **Run locally**:
    npm start
4. **Run locally**:
    npm run build

## Docker
1.  **Build the Docker image:**
    docker build -t news-aggregator .
2. **Run the containe**
    docker run -p 3000:3000 news-aggregator

## Env/Apis key
1. insert apis key from Newsapi, The Guardian and New York Times in this files
/config/api.config.ts
services/news/* (in the params field)
or simply add into the env folder