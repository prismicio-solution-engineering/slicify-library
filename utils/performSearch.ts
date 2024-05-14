import * as prismic from "@prismicio/client";
import { blogIndexGraphQuery } from "@/utils/graphQueries";
import { createClient } from "@/prismicio";

const client = createClient();

export const performSearch = async (query: string, lang: string) => {
    if (query) {
        try {
            const response = await client.getByType("blog_article", {
                lang,
                filters: [
                    prismic.filter.fulltext("document", query)],
                graphQuery: blogIndexGraphQuery,
            });
            return response.results;
        } catch (error) {
            console.error("Error searching Prismic:", error);
            return undefined;
        }
    } else {
        return [];
    }
};