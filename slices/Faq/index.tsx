import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import FaqCentered from "./FaqCentered";
import FaqTwoColumns from "./FaqTwoColumns";
import FaqThreeColumns from "./FaqThreeColumns";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

export default function Faq({ slice }: FaqProps) {
  switch (slice.variation) {
    case "twoColumns":
      return <FaqTwoColumns slice={slice} />;
    case "threeColumns":
      return <FaqThreeColumns slice={slice} />;
    case "centered":
      return <FaqCentered slice={slice} background={false} />;
    case "centeredWithBackground":
      return <FaqCentered slice={slice} background={true} />;
  }
}
