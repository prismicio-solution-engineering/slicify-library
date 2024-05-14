import { FooterDocumentData, HeaderDocumentData } from "@/prismicio-types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PropsWithChildren, Suspense } from "react";

type MarketingLayoutProps = {
  header: HeaderDocumentData;
  footer: FooterDocumentData;
  languages: {
    url: string;
    lang_name: string;
  }[];
};

export default function MarketingLayout(
  props: PropsWithChildren<MarketingLayoutProps>
) {
  return (
    <>
      <Suspense>
        <Header header={props.header} languages={props.languages} />
      </Suspense>
      {props.children}
      <Footer {...props.footer} />
    </>
  );
}
