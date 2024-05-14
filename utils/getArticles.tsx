import { createClient } from "@/prismicio";

const client = createClient();

export const getArticles = async (lang: string) => {
    try {
        const articles = await client.getAllByType("blog_article", {
            lang,
            orderings: {
                field: "document.last_publication_date",
                direction: "desc",
            }
        });
        return articles;
    } catch (error) {
        console.log("Error fetching Showcase websites :", error);
        return [];
    }
}