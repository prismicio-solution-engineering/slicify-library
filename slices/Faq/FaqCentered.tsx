'use client';

import type { Content } from "@prismicio/client";

// Tailwind imports
import { Container } from "@/components/Container";
import { PrismicRichText } from "@prismicio/react";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import backgroundImageBlue from "@/images/background-call-to-action.jpg";
import Image from "next/image";
import React from 'react';

export default function FaqCentered({
  slice,
  background = false,
}: {
  slice: Content.FaqSliceCentered | Content.FaqSliceCenteredWithBackground;
  background: boolean;
}) {
  return (
    <>
      {/* Centered and Centered With Background */}
      {background === false && (
        <div className="bg-white" id={slice.primary.anchor || undefined}>
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
              <PrismicRichText
                field={slice.primary.title}
                components={{
                  heading2: ({ children }) => (
                    <h2
                      id="faq-title"
                      className="text-3xl text-center font-display leading-10 tracking-tight text-gray-900"
                    >
                      {children}
                    </h2>
                  ),
                }}
              />
              <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                {slice.items?.map((faq, idx) => (
                  <Disclosure as="div" key={idx} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">
                              <PrismicRichText
                                field={faq.question}
                                components={{
                                  paragraph: ({ children }) => (
                                    <p>{children}</p>
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
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              {open ? (
                                <MinusSmallIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmallIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <PrismicRichText
                            field={faq.answer}
                            components={{
                              paragraph: ({ children }) => (
                                <p className="text-base leading-7 text-gray-600">
                                  {children}
                                </p>
                              ),
                              hyperlink: ({ children, key }) => (
                                <a
                                  key={key}
                                  href="#"
                                  className="hover:text-indigo-30 font-semibold text-indigo-400 hover:text-indigo-300"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )}

      {/* Centered With Background */}
      {background === true && (
        <section
          id={slice.primary.anchor || undefined}
          aria-labelledby="faq-title"
          className="relative overflow-hidden bg-white py-20 sm:py-32"
        >
          {/* Condition to render image or not */}
          <Image
            className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
            src={backgroundImageBlue}
            alt=""
            width={2347}
            height={1244}
            unoptimized
          />
          <Container className="relative">
            <div className="mx-auto max-w-4xl divide-y divide-white-900/10">
              <PrismicRichText
                field={slice.primary.title}
                components={{
                  heading2: ({ children }) => (
                    <h2
                      id="faq-title"
                      className="text-3xl font-display leading-10 tracking-tight text-white"
                    >
                      {children}
                    </h2>
                  ),
                }}
              />
              <dl className="mt-10 space-y-6 divide-y divide-white-900/10">
                {slice.items?.map((faq, idx) => (
                  <Disclosure as="div" key={idx} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left ">
                            <span className="text-base font-semibold leading-7 text-white">
                              <PrismicRichText
                                field={faq.question}
                                components={{
                                  paragraph: ({ children }) => (
                                    <p>{children}</p>
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
                            </span>
                            <span className="ml-6 flex h-7 items-center text-white">
                              {open ? (
                                <MinusSmallIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmallIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <PrismicRichText
                            field={faq.answer}
                            components={{
                              paragraph: ({ children }) => (
                                <p className="text-base leading-7 text-light-gray">
                                  {children}
                                </p>
                              ),
                              hyperlink: ({ children, key }) => (
                                <a
                                  key={key}
                                  href="#"
                                  className="hover:text-indigo-30 font-semibold text-indigo-400 hover:text-indigo-300"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
