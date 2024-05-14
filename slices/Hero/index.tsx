import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import HeroSimple from "./HeroSimple";
import HeroWithBackground from "./HeroWithBackground";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

export default function Hero({ slice }: HeroProps) {
  switch (slice.variation) {
    case "default":
      return <HeroSimple slice={slice} withoutCta={false} />;
    case "titleOnly":
      return <HeroSimple slice={slice} withoutCta={true} />;
    case "withBackground":
      return <HeroWithBackground slice={slice} video={false} />;
    case "withVideoBackground":
      return <HeroWithBackground slice={slice} video={true} />;
  }
}
