import type { Content } from "@prismicio/client";
import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

// Tailwind imports
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import backgroundImage from "@/images/background-call-to-action.jpg";
import clsx from "clsx";

export default function CtaWithImage({
  slice,
  imageRight = true,
}: {
  slice:
    | Content.CallToActionSliceWithImageRight
    | Content.CallToActionSliceWithImageLeft;
  imageRight: boolean;
}) {
  return (
    <section
      id={slice.primary.anchor || undefined}
      className={`relative overflow-hidden bg-blue-600 pt-16`}
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative isolate overflow-hidden px-6 pt-16 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div
          className={clsx(
            "mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left",
            !imageRight && "order-last"
          )}
        >
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                  {children}
                </h2>
              ),
            }}
          />
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="mt-4 text-lg tracking-tight text-white">
                  {children}
                </p>
              ),
            }}
          />
          <div className="mt-10 lg:flex justify-start gap-x-6">
            {slice.items?.map((item, idx) => {
              return item.cta_type === "Primary" ? (
                <Button key={idx} field={item.cta_link} color="white">
                  {item.cta_label}
                </Button>
              ) : (
                <Button key={idx} field={item.cta_link} variant="outline">
                  <svg
                    aria-hidden="true"
                    className="h-3 w-3 flex-none fill-dark-blue group-active:fill-current"
                  >
                    <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
                  </svg>
                  <span className="ml-3 text-white">{item.cta_label}</span>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="relative mt-16 h-80 lg:mt-8 lg:w-[45rem]">
          <PrismicNextImage
            className={clsx(
              "absolute w-[57rem] lg:w-[45rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10",
              imageRight ? "left-0 top-0" : "right-0 top-0"
            )}
            field={slice.primary.featured_image}
            width={1824}
            height={1080}
            unoptimized
          />
        </div>
      </Container>
    </section>
  );
}
