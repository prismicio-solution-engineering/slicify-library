import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

export default function FaqTwoColumns({
  slice,
}: {
  slice: Content.FaqSliceTwoColumns;
}) {
  return (
    <div className="bg-gray-900" id={slice.primary.anchor || undefined}>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="font-display text-3xl leading-10 tracking-tight text-white">
                {children}
              </h2>
            ),
          }}
        />
        <PrismicRichText
          field={slice.primary.description}
          components={{
            paragraph: ({ children }) => (
              <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300">
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
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
            {slice.items?.map((faq, idx) => (
              <div key={idx}>
                <dt className="text-base font-semibold leading-7 text-white">
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
                <dd className="mt-2 text-base leading-7 text-gray-300">
                  <PrismicRichText
                    field={faq.answer}
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
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
