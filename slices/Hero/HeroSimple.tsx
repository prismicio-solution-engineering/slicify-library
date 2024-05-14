import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { UnderlineDoodle } from "@/components/UnderlineDoodle";

export default function HeroSimple({
  slice,
  withoutCta = false,
}: {
  slice: Content.HeroSliceDefault | Content.HeroSliceTitleOnly;
  withoutCta: boolean;
}) {
  return (
    <section id={slice.primary.anchor || undefined}>
      <Container className="pb-16 pt-20 text-center lg:pt-32">
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading1: ({ children }) => (
              <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                {children}
              </h1>
            ),
            strong: ({ children }) => {
              return (
                <>
                  <span className="relative whitespace-nowrap text-blue-600">
                    <UnderlineDoodle className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70" />
                    <span className="relative">{children}</span>
                  </span>
                </>
              );
            },
          }}
        />
        {slice.variation === "default" && (
          <>
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                    {children}
                  </p>
                ),
              }}
            />
            <div className="mt-10 flex justify-center gap-x-6">
              {slice.items?.map((item, idx) => {
                return item.cta_type === "Primary" ? (
                  <Button key={idx} field={item.cta_link}>
                    {item.cta_label}
                  </Button>
                ) : (
                  <Button key={idx} field={item.cta_link} variant="outline">
                    <svg
                      aria-hidden="true"
                      className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
                    >
                      <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
                    </svg>
                    <span className="ml-3">{item.cta_label}</span>
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
