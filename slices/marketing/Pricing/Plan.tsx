import type * as prismic from "@prismicio/client";
import clsx from "clsx";
import { PrismicRichText } from "@prismicio/react";

import { Button } from "@/components/Button";

function CheckIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={clsx(
        "h-6 w-6 flex-none fill-current stroke-current",
        className
      )}
    >
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        strokeWidth={0}
      />
      <circle
        cx={12}
        cy={12}
        r={8.25}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Plan({
  name,
  price,
  description,
  link,
  features,
  featured = false,
  lightTheme = false,
}: {
  name: prismic.KeyTextField;
  price: prismic.KeyTextField;
  description: prismic.RichTextField;
  link: prismic.LinkField;
  features: prismic.RichTextField;
  featured?: boolean;
  lightTheme?: boolean;
}) {
  return (
    <section
      className={clsx(
        "flex flex-col rounded-3xl px-6 sm:px-8 lg:max-w-md",
        featured ? "order-first bg-blue-600 py-8 lg:order-none" : "lg:py-8",
        lightTheme && "bg-white drop-shadow py-8"
      )}
    >
      <h3
        className={clsx(
          "mt-5 font-display text-lg",
          lightTheme ? "text-slate-800" : "text-white"
        )}
      >
        {name}
      </h3>
      <PrismicRichText
        field={description}
        components={{
          paragraph: ({ children }) => (
            <p
              className={clsx(
                "mt-2 text-base",
                featured
                  ? "text-white"
                  : lightTheme
                  ? "text-slate-600"
                  : "text-slate-400"
              )}
            >
              {children}
            </p>
          ),
        }}
      />
      <p
        className={clsx(
          "order-first font-display text-5xl font-light tracking-tight",
          lightTheme ? "text-slate-800" : "text-white"
        )}
      >
        {price}
      </p>
      <Button
        field={link}
        variant={featured || lightTheme ? "solid" : "outline"}
        color={lightTheme ? "blue" : "white"}
        className="mt-8"
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        Get started
      </Button>
      <div className="mt-10">
        <PrismicRichText
          field={features}
          components={{
            paragraph: ({ children }) => (
              <p
                className={clsx(
                  "text-base mb-2",
                  featured
                    ? "text-white"
                    : lightTheme
                    ? "text-slate-600"
                    : "text-slate-400"
                )}
              >
                {children}
              </p>
            ),
            list: ({ children }) => (
              <ul
                role="list"
                className={clsx(
                  "order-last flex flex-col gap-y-3 text-sm",
                  featured
                    ? "text-white"
                    : lightTheme
                    ? "text-slate-600"
                    : "text-slate-200"
                )}
              >
                {children}
              </ul>
            ),
            listItem: ({ text }) => (
              <li key={text} className="flex">
                <CheckIcon
                  className={featured ? "text-white" : "text-slate-400"}
                />
                <span className="ml-4">{text}</span>
              </li>
            ),
          }}
        />
      </div>
      {/* <Button
        field={link}
        variant={featured || lightTheme ? "solid" : "outline"}
        color={lightTheme ? "blue" : "white"}
        className="mt-8"
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        Get started
      </Button> */}
    </section>
  );
}
