import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { QuoteIcon } from "@/components/QuoteIcon";

// Tailwind imports
import { Container } from "@/components/Container";
import { PrismicNextImage } from "@prismicio/next";

export default function TestimonialsScrollingCards({
  slice,
}: {
  slice: Content.TestimonialsSliceScrollingCards;
}) {
  return (
    <section id={slice.primary.anchor || undefined} className="bg-slate-50 py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                  {children}
                </h2>
              ),
            }}
          />
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="mt-4 text-lg tracking-tight text-slate-700">
                  {children}
                </p>
              ),
            }}
          />
        </div>

        <div className="relative mt-8">
          <div className="box-content md:h-80 relative -mb-6 w-full md:overflow-x-auto pb-6 sm:h-full sm:overflow-y-auto">
            <ul
              role="list"
              className="absolute md:min-w-screen-xl flex md:gap-x-8 flex-col md:flex-row gap-8"
            >
              {slice?.items?.map((item, idx) => (
                <li
                  key={idx}
                  className="inline-flex md:w-96 sm:w-80 sm:space-x-4 flex-col"
                >
                  <figure className="relative w-full rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                    <QuoteIcon className="absolute left-6 top-6 fill-slate-100" />
                    <blockquote className="relative">
                      <PrismicRichText
                        field={item.quote}
                        components={{
                          paragraph: ({ children }) => (
                            <p className="text-lg tracking-tight h-40 overflow-y-scroll text-ellipsis text-slate-900">
                              {children}
                            </p>
                          ),
                        }}
                      />
                    </blockquote>
                    <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6 text-left">
                      <div>
                        <div className="font-display text-base text-slate-900">
                          <PrismicRichText
                            field={item.author}
                            components={{
                              paragraph: ({ children }) => <p>{children}</p>,
                            }}
                          />
                        </div>
                        <div className="mt-1 text-sm w-60 overflow-ellipsis line-clamp-2 text-slate-500">
                          <PrismicRichText
                            field={item.author_role}
                            components={{
                              paragraph: ({ children }) => <p>{children}</p>,
                            }}
                          />
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-full bg-slate-50">
                        <PrismicNextImage
                          className="h-14 w-14 object-cover"
                          field={item.author_image}
                          width={56}
                          height={56}
                        />
                      </div>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
