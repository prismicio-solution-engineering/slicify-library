import { Container } from "@/components/Container";
import { FooterDocumentData } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { createSerializerP } from "@/utils/createSerializer";

export function Footer(footer: FooterDocumentData) {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <PrismicNextImage
            field={footer.logo}
            className="mx-auto h-10 w-auto"
          />
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              {footer.links.map((link, index) => (
                <PrismicLink field={link.link} key={index}>
                  <PrismicRichText field={link.label} />
                </PrismicLink>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6">
            {footer.social_links.map((socialLink, index) => (
              <PrismicLink
                field={socialLink.link}
                key={index}
                className="group"
              >
                <PrismicNextImage
                  field={socialLink.icon}
                  className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                />
              </PrismicLink>
            ))}
          </div>
          <PrismicRichText
            field={footer.copyright}
            components={{
              paragraph: createSerializerP(
                "mt-6 text-sm text-slate-500 sm:mt-0"
              ),
            }}
          />
        </div>
      </Container>
    </footer>
  );
}
