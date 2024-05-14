import type { Content } from "@prismicio/client";
import {
  PrismicLink,
  PrismicRichText,
} from "@prismicio/react";
import Image from "next/image";
import backgroundImage from "@/images/background-features.jpg";
import clsx from "clsx";
import { SwirlyDoodle } from "@/components/SwirlyDoodle";
import Plan from "./Plan";

export default function PricingWithPromo({
  slice,
}: {
  slice: Content.PricingSliceWithPromo;
}) {
  return (
    <section
      id={slice.primary.anchor || undefined}
      aria-label="Pricing"
      className="" //py-20 sm:py-32
    >
      <div className="relative overflow-hidden">
        <Image
          className="absolute -z-50"
          src={backgroundImage}
          alt=""
          width={2245}
          height={1636}
          unoptimized
        />
        <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                  {children}
                </h2>
              ),
              strong: ({ children }) => {
                return (
                  <>
                    <span className="relative whitespace-nowrap">
                      <SwirlyDoodle className="absolute left-0 top-1/2 h-[1em] w-full fill-blue-400" />
                      <span className="relative">{children}</span>
                    </span>
                  </>
                );
              },
            }}
          />
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="mt-4 text-lg text-slate-200">{children}</p>
              ),
            }}
          />
        </div>
        <div className="flow-root bg-white pb-24 sm:pb-32">
          <div className="-mt-80">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div
                className={clsx(
                  "mx-auto grid max-w-md grid-cols-1 gap-8",
                  slice.items.length === 1
                    ? "lg:max-w-4xl lg:grid-cols-1 lg:justify-items-center"
                    : slice.items.length === 3
                    ? "lg:max-w-5xl lg:grid-cols-3"
                    : "lg:max-w-4xl lg:grid-cols-2"
                )}
              >
                {slice.items.map((plan, index) => (
                  <Plan
                    key={"plan" + plan.name + index}
                    name={plan.name}
                    price={plan.price}
                    description={plan.description}
                    link={plan.register_link}
                    features={plan.features}
                    lightTheme
                  />
                ))}
                <div
                  className={clsx(
                    "flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:flex-row lg:items-center",
                    slice.items.length === 3
                      ? "lg:col-span-3"
                      : "lg:col-span-2 "
                  )}
                >
                  <div className="lg:min-w-0 lg:flex-1">
                    <PrismicRichText
                      field={slice.primary.promo_title}
                      components={{
                        heading3: ({ children }) => (
                          <h3 className="text-lg font-semibold leading-8 tracking-tight text-vibrant-blue">
                            {children}
                          </h3>
                        ),
                      }}
                    />
                    <PrismicRichText
                      field={slice.primary.promo_description}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="mt-1 text-base leading-7 text-gray-600">
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </div>
                  <PrismicLink
                    field={slice.primary.promo_link}
                    className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-vibrant-blue ring-1 ring-inset ring-light-blue hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibrant-blue"
                  >
                    Buy discounted license{" "}
                    <span aria-hidden="true">&rarr;</span>
                  </PrismicLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
