'use client';
import { Button } from "@/components/Button";
import type { Content } from "@prismicio/client";
import Image from "next/image";
import backgroundImage from "@/images/background-call-to-action.jpg";
import { PrismicRichText } from "@prismicio/react";
import { TextField } from "@/components/Fields";
import { handleSubmitNewsletter } from "@/utils/formHandler";
import { PrismicNextImage } from "@prismicio/next";

export default function Form(slice: Content.FormSliceWithDetails) {
  return (
    <div id={slice.primary.anchor || undefined} className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
      <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 -z-10"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg font-display">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-3xl sm:text-4xl tracking-tight text-white">
                    {children}
                  </h2>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="mt-4 text-lg leading-8 text-gray-300">
                    {children}
                  </p>
                ),
              }}
            />
            <form
              onSubmit={handleSubmitNewsletter}
              className="mt-6 flex max-w-md gap-x-4"
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
              <Button variant="solid" color="slate" submit>
                {slice.primary.subscribe_label}
              </Button>
            </form>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            {slice.items.map((feature, index) => (
              <div key={index} className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <PrismicNextImage
                    className="h-6 w-6 fill-none aria-hidden text-white"
                    field={feature.icon}
                    alt=""
                    sizes="52.75rem"
                  />
                </div>
                <PrismicRichText
                  field={feature.title}
                  components={{
                    paragraph: ({ children }) => (
                      <dt className="mt-4 font-semibold text-white">
                        {children}
                      </dt>
                    ),
                  }}
                />
                <PrismicRichText
                  field={feature.description}
                  components={{
                    paragraph: ({ children }) => (
                      <dd className="mt-2 leading-7 text-gray-300">
                        {children}
                      </dd>
                    ),
                  }}
                />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
