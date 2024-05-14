'use client';
import { Button } from "@/components/Button";
import type { Content } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { TextField } from "@/components/Fields";
import { handleSubmitNewsletter } from "@/utils/formHandler";

export default function Form(slice: Content.FormSliceCentered) {
  return (
    <section id={slice.primary.anchor || undefined}>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-dark-gray">
        <div className="relative isolate overflow-hidden px-6 py-24 shadow-2xl sm:px-24 xl:py-32">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {children}
                </h2>
              ),
            }}
          />
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
                  {children}
                </p>
              ),
            }}
          />
          <form
            onSubmit={handleSubmitNewsletter}
            className="mx-auto mt-10 flex max-w-md gap-x-4"
          >
            <TextField
              id="email"
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              labelSrOnly
              placeholder={
                slice.primary.placeholder
                  ? slice.primary.placeholder
                  : undefined
              }
              className="flex-auto"
            />
            <Button variant="solid" color="white" submit>
              {slice.primary.subscribe_label}
            </Button>
          </form>
          <PrismicRichText
            field={slice.primary.disclaimer}
            components={{
              paragraph: ({ children }) => (
                <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-gray-300">
                  {children}
                </p>
              ),
              hyperlink: ({ children, node }) => (
                <PrismicLink
                  field={node.data}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {children}
                </PrismicLink>
              ),
            }}
          />
        </div>
      </div>
    </section>
  );
}
