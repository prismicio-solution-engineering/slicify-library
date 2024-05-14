import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { UnderlineDoodle } from "@/components/UnderlineDoodle";

// Tailwind imports
import { Container } from "@/components/Container";

export default function LogoCloudSingle({
  slice,
}: {
  slice: Content.LogoCloudSliceSingle;
}) {
  return (
    <section id={slice.primary.anchor || undefined}>
      <Container className="pb-16 pt-20 text-center lg:pt-32">
        <div className="font-display text-3xl text-slate-900">
          <span className="relative whitespace-nowrap">
            <UnderlineDoodle className="absolute left-0 top-1/2 h-[1em] w-full fill-light-blue-70" />
            <PrismicRichText
              field={slice.primary.title}
              components={{
                paragraph: ({ children }) => (
                  <span className="relative">{children}</span>
                ),
              }}
            />
          </span>
        </div>
        <div className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0">
          <div className="grid grid-cols-1 gap-y-8 overflow-hidden sm:mx-0 md:grid-cols-1 sm:gap-x-20 sm:gap-y-8">
            <PrismicNextImage
              field={slice.primary.logo}
              width={320}
              unoptimized
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
