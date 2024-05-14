import type { Content } from "@prismicio/client";
import {
  SliceComponentProps,
} from "@prismicio/react";
import FormSimple from "./FormSimple";
import FormWithDetails from "./FormWithDetails";
import FormCentered from "./FormCentered";

export type FormProps = SliceComponentProps<Content.FormSlice>;

export default function Form({ slice }: FormProps) {
  switch (slice.variation) {
    case "simple":
      return <FormSimple {...slice} />;
    case "withDetails":
      return <FormWithDetails {...slice} />;
    case "centered":
      return <FormCentered {...slice} />;
  }
}
