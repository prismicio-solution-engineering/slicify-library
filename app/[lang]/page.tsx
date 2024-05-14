import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices/marketing";
import { getLanguages } from "@/utils/getLanguages";
import MarketingLayout from "@/components/MarketingLayout";
import { getLocales } from "@/utils/getLocales";
import { Metadata } from "next";

type PageParams = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home_page",{lang:params.lang}); // TODO : add graphquery to only fetch the fields and not the page

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const locales = await getLocales();

  const client = createClient();

  const [page, header, footer] = await Promise.all([
    client.getSingle<Content.HomePageDocument>("home_page", { lang }),
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
      <SliceZone slices={page.data.slices} components={components} />
    </MarketingLayout>
  );
}
