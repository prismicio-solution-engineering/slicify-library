import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { components as mktComponents } from "@/slices/marketing";
import { components as blogComponents } from "@/slices/blog";
import {
  blogArticleGraphQuery,
} from "@/utils/graphQueries";
import { getLanguages } from "@/utils/getLanguages";
import BlogLayout from "@/components/BlogLayout";
import { Content } from "@prismicio/client";
import { notFound } from "next/navigation";
import { getLocales } from "@/utils/getLocales";
import { Metadata } from "next";

type PageParams = { articleSlug: string[]; lang: string };

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_article", params.articleSlug[params.articleSlug.length - 1], {
      lang: params.lang
    })
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export default async function BlogArticle({ params }: { params: PageParams }) {
  const locales = await getLocales();

  const client = createClient();

  const page = await client
    .getByUID<prismic.Content.BlogArticleDocument>("blog_article", params.articleSlug[params.articleSlug.length - 1], {
      graphQuery: blogArticleGraphQuery,
      lang: params.lang
    })
    .catch(() => notFound());

  const [header, footer, languages] = await Promise.all([
    client.getSingle<Content.HeaderDocument>("header", {
      lang: params.lang,
    }),
    client.getSingle<Content.FooterDocument>("footer", {
      lang: params.lang,
    }),
    getLanguages(page, client, locales),
  ]);

  return (
    <BlogLayout
      header={header.data}
      footer={footer.data}
      languages={languages}
      page={page}
    >
      <SliceZone
        slices={page.data.slices}
        components={{ ...mktComponents, ...blogComponents }}
      />
    </BlogLayout>
  );
}

// Paths
export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_article", { lang: "*" });

  function splitUrl(url: string) {
    // Split the URL by '/' and remove any empty strings from the result
    const parts = url.split('/').filter(part => part !== '');

    // Assuming the URL format is consistent and has the language code as the first part,
    // category as the third part, and UID as the last part
    if (parts.length === 3) {
      return {
        lang: parts[0] || '',
        articleSlug: [parts[2]] || ''
      };
    }
    if (parts.length === 4) {
      return {
        lang: parts[0] || '',
        articleSlug: [parts[2] || '', parts[3] || '']
      };
    }
    return null
  }

  return pages.map((page) => {
    return splitUrl(page.url!);
  }).filter(page => page !== null);
}
