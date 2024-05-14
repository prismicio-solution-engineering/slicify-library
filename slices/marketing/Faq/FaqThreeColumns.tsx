import type { Content } from "@prismicio/client";

// Tailwind imports
import { Container } from "@/components/Container";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import backgroundImage from "@/images/background-faqs.jpg";

export default function FaqThreeColumns({
  slice,
}: {
  slice: Content.FaqSliceThreeColumns;
}) {
  {
    /* Default Three Columns*/
  }
  return (
    <section
      id={slice.primary.anchor || undefined}
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2
                  id="faq-title"
                  className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
                >
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
              hyperlink: ({ children }) => (
                <a
                  href="#"
                  className="hover:text-indigo-30 font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  {children}
                </a>
              ),
            }}
          />
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {slice.items?.map((faq, idx) => (
            <div key={idx}>
              <dt className="text-base font-semibold leading-7 text-dark-gray">
                <PrismicRichText
                  field={faq.question}
                  components={{
                    paragraph: ({ children }) => <p>{children}</p>,
                    hyperlink: ({ children }) => (
                      <a
                        href="#"
                        className="hover:text-indigo-30 font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        {children}
                      </a>
                    ),
                  }}
                />
              </dt>
              <dd className="mt-2 text-base leading-7 text-light-black">
                <PrismicRichText
                  field={faq.answer}
                  components={{
                    paragraph: ({ children }) => <p>{children}</p>,
                    hyperlink: ({ children, key }) => (
                      <a
                        key={key}
                        href="#"
                        className="hover:text-indigo-30 font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        {children}
                      </a>
                    ),
                  }}
                />
              </dd>
            </div>
          ))}
        </ul>
      </Container>
    </section>
  );
}
