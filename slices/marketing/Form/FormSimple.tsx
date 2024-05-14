'use client';
import { Button } from "@/components/Button";
import type { Content } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { TextField } from "@/components/Fields";
import {
  createSerializerH2,
  createSerializerP,
} from "@/utils/createSerializer";
import { handleSubmitNewsletter } from "@/utils/formHandler";

export default function Form(slice: Content.FormSliceSimple) {
  return (
    <section id={slice.primary.anchor || undefined}>
      <div className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 items-center">
          <div className="max-w-2xl text-3xl font-display tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                heading2: createSerializerH2(
                  "inline sm:block lg:inline xl:block"
                ),
                paragraph: createSerializerP(
                  "inline sm:block lg:inline xl:block"
                ),
              }}
            />
          </div>
          <form
            onSubmit={handleSubmitNewsletter}
            className="w-full max-w-md lg:col-span-5 lg:pt-2"
          >
            <div className="flex gap-x-4">
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
              <Button variant="solid" color="slate" submit>
                {slice.primary.subscribe_label}
              </Button>
            </div>
            <PrismicRichText
              field={slice.primary.disclaimer}
              components={{
                paragraph: ({ children }) => (
                  <p className="mt-4 text-sm leading-6 text-gray-900">
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
          </form>
        </div>
      </div>
    </section>
  );
}
