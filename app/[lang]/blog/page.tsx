import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices/marketing";
import { getLanguages } from "@/utils/getLanguages";
import MarketingLayout from "@/components/MarketingLayout";
import { ArticleListVertical } from "@/components/ArticleListVertical";
import { Metadata } from "next";
import { getLocales } from "@/utils/getLocales";

type PageParams = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("blog_index", { lang: params.lang });

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export default async function BlogIndex({
  params: { lang },
}: {
  params: { lang: string };
}) {


  const locales = await getLocales();

  const client = createClient();
  //    ^ Automatically contains references to document types

  const [page, header, footer] = await Promise.all([
    client.getSingle<Content.BlogIndexDocument>("blog_index", { lang }),
    client.getSingle<Content.HeaderDocument>("header", { lang }),
    client.getSingle<Content.FooterDocument>("footer", { lang }),
  ]);

  const languages = await getLanguages(page, client, locales);

  return (
    <MarketingLayout
      header={header.data}
      footer={footer.data}
      languages={languages}
    >
      <ArticleListVertical page={page} lang={lang} />
      <SliceZone slices={page.data.slices} components={components} />
    </MarketingLayout>
  );
}
