import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import FeaturesHorizontal from "./FeaturesHorizontal";
import FeaturesVertical from "./FeaturesVertical";

export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

export default function Features({ slice }: FeaturesProps) {
  switch (slice.variation) {
    case "leftSide":
      return <FeaturesHorizontal slice={slice} rightSide={false} />;
    case "rightSide":
      return <FeaturesHorizontal slice={slice} rightSide={true} />;
    case "above":
      return <FeaturesVertical slice={slice} above={true} />;
    case "below":
      return <FeaturesVertical slice={slice} above={false} />;
  }
}
