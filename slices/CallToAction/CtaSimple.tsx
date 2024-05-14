import type { Content } from "@prismicio/client";
import Image from "next/image";

// Tailwind imports
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import backgroundImage from "@/images/background-call-to-action.jpg";
import { PrismicRichText } from "@prismicio/react";
import { UnderlineDoodle } from "@/components/UnderlineDoodle";

export default function CtaSimple({
  slice,
  withBackground = true,
}: {
  slice:
    | Content.CallToActionSliceDefault
    | Content.CallToActionSliceWhiteBackground;
  withBackground: boolean;
}) {
  return (
    <section
      id={slice.primary.anchor || undefined}
      className={`relative overflow-hidden ${
        withBackground && "bg-blue-600"
      } py-32`}
    >
      {withBackground && (
        <Image
          className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          src={backgroundImage}
          alt=""
          width={2347}
          height={1244}
          unoptimized
        />
      )}
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2
                  className={`font-display text-3xl tracking-tight ${
                    withBackground ? "text-white" : "text-dark-blue"
                  } sm:text-4xl`}
                >
                  {children}
                </h2>
              ),
              strong: ({ children }) => {
                return (
                  <>
                    {!withBackground ? (
                        <span className="relative whitespace-nowrap text-blue-600">
                          <UnderlineDoodle className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70" />
                          <span className="relative">{children}</span>
                        </span>
                      ) : (
                        <strong className="relative">{children}</strong>
                    )}
                  </>
                );
              },
            }}
          />
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p
                  className={`mt-4 text-lg tracking-tight ${
                    withBackground ? "text-white" : "text-dark-blue"
                  }`}
                >
                  {children}
                </p>
              ),
            }}
          />

          <Button
            field={slice.primary.cta_link}
            color={withBackground ? "white" : "slate"}
            className="mt-10"
          >
            {slice.primary.cta_label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
