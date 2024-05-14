"use client"

import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

//tailwindUI imports
import { useEffect, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "@/components/Container";
import backgroundImage from "@/images/background-features.jpg";
import { asText } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

export default function FeaturesHorizontal({
  slice,
  rightSide = false,
}: {
  slice: Content.FeaturesSliceLeftSide | Content.FeaturesSliceRightSide;
  rightSide: boolean;
}) {
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);
  return (
    <section
      id={slice.primary.anchor || undefined}
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
                  {children}
                </h2>
              ),
            }}
          />
          <PrismicRichText
            field={slice.primary.subtitle}
            components={{
              paragraph: ({ children }) => (
                <p className="mt-6 text-lg tracking-tight text-blue-100">
                  {children}
                </p>
              ),
            }}
          />
        </div>
        <Tab.Group
          as="div"
          className={`grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0 ${
            rightSide === true ? "mt-16 " : ""
          }`}
          vertical={tabOrientation === "vertical"}
        >
          {({ selectedIndex }) => (
            <>
              <div
                className={`-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5 ${
                  rightSide === true ? "order-1" : "order-2"
                }`}
              >
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {slice.items.map((feature, featureIndex) => (
                    <div
                      key={asText(feature.feature_title)}
                      className={clsx(
                        `group relative rounded-full px-4 py-1 ${
                          rightSide === true
                            ? "lg:rounded-l-xl lg:rounded-r-none"
                            : "lg:rounded-l-none lg:rounded-r-xl"
                        } lg:p-6`,
                        selectedIndex === featureIndex
                          ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                          : "hover:bg-white/10 lg:hover:bg-white/5"
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            "font-display text-lg [&:not(:focus-visible)]:focus:outline-none",
                            selectedIndex === featureIndex
                              ? "text-blue-600 lg:text-white"
                              : "text-blue-100 hover:text-white lg:text-white"
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          <PrismicRichText field={feature.feature_title} />
                        </Tab>
                      </h3>
                      <PrismicRichText
                        field={feature.feature_description}
                        components={{
                          paragraph: ({ children }) => (
                            <p
                              className={clsx(
                                "mt-2 hidden text-sm lg:block",
                                selectedIndex === featureIndex
                                  ? "text-white"
                                  : "text-blue-100 group-hover:text-white"
                              )}
                            >
                              {children}
                            </p>
                          ),
                        }}
                      />
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels
                className={`lg:col-span-7 ${
                  rightSide === true ? "order-2" : "order-1 justify-self-end"
                }`}
              >
                {slice.items.map((feature) => (
                  <Tab.Panel
                    key={asText(feature.feature_title)}
                    unmount={false}
                  >
                    {rightSide === true && (
                      <div className="relative sm:px-6 lg:hidden">
                        <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                        <PrismicRichText
                          field={feature.feature_description}
                          components={{
                            paragraph: ({ children }) => (
                              <p
                                className={
                                  "relative mx-auto max-w-2xl text-base text-white sm:text-center"
                                }
                              >
                                {children}
                              </p>
                            ),
                          }}
                        />
                      </div>
                    )}
                    <div
                      className={`w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]  ${
                        rightSide === true ? "mt-10" : ""
                      }`}
                    >
                      <PrismicNextImage
                        className="w-full"
                        field={feature.feature_screenshot}
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                    {rightSide !== true && (
                      <div className="relative sm:px-6 lg:hidden mt-16">
                        <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                        <div className="ml-auto w-[92vw]">
                          <PrismicRichText
                            field={feature.feature_description}
                            components={{
                              paragraph: ({ children }) => (
                                <p
                                  className={
                                    "relative max-w-2xl text-base text-white sm:text-center"
                                  }
                                >
                                  {children}
                                </p>
                              ),
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
