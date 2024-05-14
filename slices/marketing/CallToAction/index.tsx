import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CtaSimple from "./CtaSimple";
import CtaWithImage from "./CtaWithImage";

export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

export default function CallToAction({ slice }: CallToActionProps) {
  switch (slice.variation) {
    case "default":
      return <CtaSimple slice={slice} withBackground={true} />;
    case "whiteBackground":
      return <CtaSimple slice={slice} withBackground={false} />;
    case "withImageRight":
      return <CtaWithImage slice={slice} imageRight={true} />;
    case "withImageLeft":
      return <CtaWithImage slice={slice} imageRight={false} />;
  }
}
