import type { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type HighlightedTextProps =
  SliceComponentProps<Content.HighlightedTextSlice>;

export default function HighlightedText({ slice }: HighlightedTextProps) {
  return (
    <section className="max-w-4xl mx-auto">
      <div
        className={`relative pr-9 pl-16 py-6 my-10 mx-auto rounded-md text-base shadow-md ${
          (slice.variation === "information" && "bg-indigo-50") ||
          (slice.variation === "update" && "bg-green-50") ||
          (slice.variation === "warning" && "bg-red-50")
        }`}
      >
        <div className="absolute top-7 left-3 sm:left-6 sm:top-7">
          {slice.variation === "information" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-light-blue"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          )}
          {slice.variation === "update" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-green-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {slice.variation === "warning" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading3: ({ children }) => (
                <h3
                  className={`font-display text-lg ${
                    (slice.variation === "information" &&
                      "text-vibrant-blue") ||
                    (slice.variation === "update" && "text-green-700") ||
                    (slice.variation === "warning" && "text-red-500")
                  }
                `}
                >
                  <strong>{children}</strong>
                </h3>
              ),
            }}
          />
          <PrismicRichText
            field={slice.primary.content}
            components={{
              paragraph: ({ children }) => (
                <p className="text-dark-gray">{children}</p>
              ),
            }}
          />
        </div>
      </div>
    </section>
  );
}
