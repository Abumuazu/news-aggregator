import { apiClients } from "../../config/api.config";
import { SearchParams } from "../../types/api.types";
import { Article } from "../../types/api.types";
import { handleApiError } from "../../utils/error.utils";

export const nytService = {
  search: async ({
    keyword,
    fromDate,
    toDate,
  }: SearchParams): Promise<Article[]> => {
    try {
      const { data } = await apiClients.nyt.get("/articlesearch.json", {
        params: {
          q: keyword,
          "api-key":
            process.env.REACT_APP_NYT_KEY || "",
          begin_date: fromDate?.replaceAll('-', '')?? '',
          end_date: toDate?.replaceAll('-', '')?? '',
        },
      });

      if (!data.response?.docs) throw new Error("NYT API response not ok");

      return data.response.docs.map(
        (doc: any): Article => ({
          id: `nyt-${doc._id}`,
          source: "The New York Times",
          author: doc.byline?.original?.replace("By ", "") || "NYT",
          title: doc.headline?.main || "Untitled",
          description: doc.abstract || doc.snippet || doc.lead_paragraph || "",
          url: doc.web_url,
          urlToImage: doc.multimedia?.[0]?.url
            ? `https://www.nytimes.com/${doc.multimedia[0].url}`
            : "",
          publishedAt: doc.pub_date,
        })
      );
    } catch (error) {
      return handleApiError(error, "NYT");
    }
  },
};
