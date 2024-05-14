import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import PricingDefault from "./PricingDefault";
import PricingWithPromo from "./PricingWithPromo";

export type PricingProps = SliceComponentProps<Content.PricingSlice>;

export default function Pricing({ slice }: PricingProps) {
  switch (slice.variation) {
    case "default":
      return <PricingDefault slice={slice} />;
    case "withPromo":
      return <PricingWithPromo slice={slice} />;
  }
}
