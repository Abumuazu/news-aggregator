import { apiClients } from "../../config/api.config";
import { Article, SearchParams } from "../../types/api.types";
import { handleApiError } from "../../utils/error.utils";

export const guardianService = {
  search: async ({
    keyword,
    fromDate,
    toDate,
  }: SearchParams): Promise<Article[]> => {
    try {
      const { data } = await apiClients.guardian.get("/search", {
        params: {
          q: keyword,
          "api-key":
            process.env.REACT_APP_GUARDIAN_KEY ||
            "",
          "from-date": fromDate,
          "to-date": toDate,

        },
      });
      if (!data.response) throw new Error("Guardian API response not ok");
      return data.response.results.map(
        (item: any): Article => ({
          id: `guardian-${item.id}`,
          source: "The Guardian",
          author: item.fields?.byline || "The Guardian",
          title: item.fields?.headline || item.webTitle,
          description: item.fields?.trailText || "",
          url: item.webUrl,
          urlToImage: item.fields?.thumbnail || "",
          publishedAt: item.webPublicationDate,
        })
      );
    } catch (error) {
      return handleApiError(error, "Guardian");
    }
  },
};
