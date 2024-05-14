import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { UnderlineDoodle } from "@/components/UnderlineDoodle";
import { BlogArticleDocument } from "@/prismicio-types";
import { Content } from "@prismicio/client";

export function BlogHeader(
  page: BlogArticleDocument,
  author: Content.AuthorDocument["data"]
) {
  return (
    <section>
      <div className="relative isolate overflow-hidden bg-black px-6">
        <PrismicNextImage
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
          field={page.data.featured_image}
          width={2245}
          height={1636}
          unoptimized
        />
        <div className="mx-auto py-6 sm:py-12 px-5 sm:px-14 rounded-xl my-16 max-w-4xl bg-white bg-opacity-50 flex flex-col gap-6">
          <div className="text-gray-500 border-l-2 border-l-light-blue-70 pl-3 text-base">
            <time dateTime={page.last_publication_date}>
              {new Date(page.last_publication_date).toLocaleDateString(
                page.lang,
                { year: "numeric", month: "short", day: "numeric" }
              )}
            </time>
          </div>
          <PrismicRichText
            field={page.data.title}
            components={{
              heading1: ({ children }) => (
                <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-dark-blue">
                  {children}
                </h1>
              )
            }}
          />
          <PrismicRichText
            field={page.data.excerpt}
            components={{
              paragraph: ({ children }) => (
                <p className="font-sans text-lg tracking-tight text-dark-blue">
                  {children}
                </p>
              ),
            }}
          />
          {author && (
            <figcaption className="relative flex items-center gap-4 text-left">
              <div className="overflow-hidden rounded-full bg-slate-50">
                <PrismicNextImage
                  className="h-12 w-12 object-cover"
                  field={author.author_image}
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <div className="font-display text-base text-slate-900">
                  {author.author_name} -{" "}
                  <span className="text-slate-500">{author.author_role}</span>
                </div>
              </div>
            </figcaption>
          )}
        </div>
      </div>
    </section>
  );
}
