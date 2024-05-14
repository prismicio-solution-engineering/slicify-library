import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import TestimonialsMasonry from "./TestimonialsMasonry";
import TestimonialsScrollingCards from "./TestimonialsScrollingCards";
import TestimonialsColumns from "./TestimonialsColumns";
import TestimonialsSingle from "./TestimonialsSingle";

export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

export default function Testimonials({ slice }: TestimonialsProps) {
  switch (slice.variation) {
    case "default":
      return <TestimonialsMasonry slice={slice} />;
    case "scrollingCards":
      return <TestimonialsScrollingCards slice={slice} />;
    case "twoColumnsWithSeparator":
      return <TestimonialsColumns slice={slice} />;
    case "singleCentered":
      return <TestimonialsSingle slice={slice} centered={true} />;
    case "singleWithLargeImage":
      return <TestimonialsSingle slice={slice} centered={false} />;
  }
}
