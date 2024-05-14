import { PrismicLink } from "@prismicio/react";
import { Website } from "./index";

export const ShowcaseCard = ({ website }: { website: Website }) => {
  return (
    <PrismicLink
      field={website?.link}
      className="block rounded-3xl border border-light-gray p-3 pb-4 hover:border-light-blue hover:bg-gray-50 transition-colors"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-xl shadow-website-screenshot" />
        <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden relative bg-gray-F7">
          <img
            className="opacity-100 scale-100 transition-all ease-in-out duration-500 object-cover"
            src={website?.screenshot?.url}
            alt={website?.screenshot?.alt}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
        </div>
      </div>
      <footer className="flex items-center justify-between text-base font-headings text-gray-900 mt-4 px-2">
        <h2>{website?.name}</h2>
        <div className="flex items-center gap-1">
          {website?.technology && website?.technology}
        </div>
      </footer>
    </PrismicLink>
  );
};
