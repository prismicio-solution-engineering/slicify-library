import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { AnchorLink } from "@/prismicio";
import { HeaderDocumentDataLeftSideLinksItem, Simplify } from "@/prismicio-types";

export default function HeaderLinkDefault(
  link: Simplify<HeaderDocumentDataLeftSideLinksItem>
) {
  return (
    <div className="hidden md:block">
      <PrismicLink
        internalComponent={AnchorLink}
        field={link.link}
        anchor={link.anchor}
        className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      >
        <PrismicRichText field={link.label} />
      </PrismicLink>
    </div>
  );
}
