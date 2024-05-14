import { Button } from "@/components/Button";
import { HeaderDocumentDataLeftSideLinksItem, Simplify } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";

export default function HeaderLinkButton(
  props: Simplify<HeaderDocumentDataLeftSideLinksItem>
) {
  return (
    <section>
      <Button field={props.link} color="blue">
        <span>
          <PrismicRichText field={props.label} />
        </span>
      </Button>
    </section>
  );
}
