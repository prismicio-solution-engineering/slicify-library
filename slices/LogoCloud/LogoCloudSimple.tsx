import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

// Tailwind imports
import { Container } from "@/components/Container";
import { PrismicNextImage } from "@prismicio/next";

export default function LogoCloudSimple({
  slice,
  darkMode = false,
}: {
  slice: Content.LogoCloudSliceDefault | Content.LogoCloudSliceSimpleDarkMode;
  darkMode: boolean;
}) {
  return (
    <section id={slice.primary.anchor || undefined} className={`pb-16 pt-20 lg:pt-32  ${darkMode && "bg-dark-blue"}`}>
      <Container className="text-center">
        <PrismicRichText
          field={slice.primary.title}
          components={{
            paragraph: ({ children }) => (
              <p
                className={`font-display text-xl ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {children}
              </p>
            ),
          }}
        />
        <div
          role="list"
          className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
        >
          <ul className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
            {slice.items.map((company, idx) => (
              <li key={idx} className="flex">
                <PrismicNextImage
                  className="object-cover"
                  field={company.logo}
                  height={48}
                  unoptimized
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
