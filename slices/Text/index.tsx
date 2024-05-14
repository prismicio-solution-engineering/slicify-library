import type { Content } from "@prismicio/client";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  PrismicLink,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export type TextProps = SliceComponentProps<Content.TextSlice>;

export default function Text({ slice }: TextProps) {
  return (
    <section className="max-w-4xl px-6 mx-auto flex flex-col gap-4">
      <PrismicRichText
        field={slice.primary.text_section}
        components={{
          heading2: ({ children }) => (
            <h2 className="mt-12 mb-6 font-display text-3xl tracking-tight text-dark-blue sm:text-4xl">
              {children}
            </h2>
          ),
          heading3: ({ children }) => (
            <h3 className="mt-10 mb-6 font-display text-2xl tracking-tight text-dark-blue sm:text-3xl">
              {children}
            </h3>
          ),
          heading4: ({ children }) => (
            <h4 className="mt-10 mb-4 font-display text-xl tracking-tight text-dark-blue sm:text-2xl">
              {children}
            </h4>
          ),
          heading5: ({ children }) => (
            <h5 className="mt-10 mb-4 font-display text-lg tracking-tight text-dark-blue sm:text-xl">
              {children}
            </h5>
          ),
          heading6: ({ children }) => (
            <h6 className="mt-10 mb-4 font-display text-md tracking-tight text-dark-blue sm:text-lg">
              {children}
            </h6>
          ),
          paragraph: ({ children }) => (
            <p className="mb-4 prose-lg tracking-tight text-dark-blue">
              {children}
            </p>
          ),
          preformatted: ({ node }) => (
            <pre className="my-3 p-2 md:p-6 bg-[#0d1117] rounded-xl shadow-lg">
              <SyntaxHighlighter style={dark} customStyle={{backgroundColor: "#0d1117", borderColor: "#0d1117"}}>
                {node.text}
              </SyntaxHighlighter>
            </pre>
          ),
          list: ({ children }) => (
            <ul
              role="list"
              className="marker:text-vibrant-blue list-inside	list-disc prose-lg"
            >
              {children}
            </ul>
          ),
          listItem: ({ children }) => <li className="mb-4">{children}</li>,
          oList: ({ children }) => (
            <ol
              role="list"
              className="marker:text-vibrant-blue list-inside list-decimal prose-lg"
            >
              {children}
            </ol>
          ),
          oListItem: ({ children }) => <li className="mb-4">{children}</li>,
          // image: ({ node }) =>
          //   node.linkTo
          //     ? `[![${node.alt}](${node.url})](${node.linkTo.url})\n\n`
          //     : `![${node.alt}](${node.url})\n\n`,
          // embed: ({ node }) => `${node.oembed.html}\n\n`,
          embed: ({ node }) => (
            <div
              data-oembed={node.oembed.embed_url}
              data-oembed-type={node.oembed.type}
              data-oembed-provider={node.oembed.provider_name}
              // {label(node)}
              dangerouslySetInnerHTML={{ __html: node.oembed.html ?? "" }}
              className={`${
                node.oembed.type === "video" && "youtube-video"
              } rounded`}
            ></div>
          ),
          hyperlink: ({ children, node }) => (
            <PrismicLink
              field={node.data}
              className="font-semibold text-vibrant-blue underline underline-offset-2 hover:text-light-blue"
            >
              {children}
            </PrismicLink>
          ),
          label: ({ node, children }) => {
            return (
              <>
                {node.data.label === "highlight" && (
                  <span className="text-blue-600">{children}</span>
                )}
                {node.data.label === "inline code" && (
                  <span className="px-2 py-1 bg-[#f1f1f8] font-code rounded text-sm font-semibold text-black">
                    {children}
                  </span>
                )}
              </>
            );
          },
        }}
      />
    </section>
  );
}
