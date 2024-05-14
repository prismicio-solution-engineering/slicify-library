import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
// import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { UnderlineDoodle } from "@/components/UnderlineDoodle";

import backgroundImage from "@/images/background-features.jpg";

export default function HeroWithBackground({
  slice,
  video = false,
}: {
  slice: Content.HeroSliceWithBackground | Content.HeroSliceWithVideoBackground;
  video: boolean;
}) {
  return (
    <section id={slice.primary.anchor || undefined}>
      <div className="relative isolate overflow-hidden bg-black">
        {slice.variation === "withBackground" ? (
          <Image
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
            src={backgroundImage}
            alt=""
            width={2245}
            height={1636}
            unoptimized
          />
        ) : (
          // Change field for a video
          // <Image
          // className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-80 "
          //   priority
          //   src={backgroundVideo}
          //   alt=""
          //   width={2245}
          //   height={1636}
          //   unoptimized
          // />
          <div
            id="hero-video"
            className="absolute h-full w-full object-cover object-right md:object-center opacity-50"
            dangerouslySetInnerHTML={{
              __html: slice.primary.background_video.html || "",
            }}
          />
        )}
        <Container className="pb-16 pt-20 text-center lg:pt-32">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-white sm:text-7xl">
                  {children}
                </h1>
              ),
              strong: ({ children }) => {
                return (
                  <>
                    <span className="relative whitespace-nowrap text-white">
                      <UnderlineDoodle className="absolute left-0 top-2/3 h-[0.58em] w-full fill-white" />
                      <span className="relative">{children}</span>
                    </span>
                  </>
                );
              },
            }}
          />
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-white">
                  {children}
                </p>
              ),
            }}
          />
          <div className="mt-10 flex justify-center gap-x-6">
            {slice.items?.map((item, idx) => {
              return item.cta_type === "Primary" ? (
                <Button key={idx} field={item.cta_link} color="white">
                  {item.cta_label}
                </Button>
              ) : (
                <Button
                  key={idx}
                  field={item.cta_link}
                  variant="solid"
                  className="bg-light-black"
                >
                  <svg
                    aria-hidden="true"
                    className="h-3 w-3 flex-none fill-light-blue group-active:fill-current"
                  >
                    <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
                  </svg>
                  <span className="ml-3 text-white">{item.cta_label}</span>
                </Button>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
