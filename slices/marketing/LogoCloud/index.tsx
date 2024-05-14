import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

// Tailwind imports
import logoLaravel from "@/images/logos/laravel.svg";
import logoMirage from "@/images/logos/mirage.svg";
import logoStatamic from "@/images/logos/statamic.svg";
import logoStaticKit from "@/images/logos/statickit.svg";
import logoTransistor from "@/images/logos/transistor.svg";
import logoTuple from "@/images/logos/tuple.svg";
import LogoCloudGrid from "./LogoCloudGrid";
import LogoCloudSimple from "./LogoCloudSimple";
import LogoCloudSingle from "./LogoCloudSingle";

const group = [
  { name: "Transistor", logo: logoTransistor },
  { name: "Tuple", logo: logoTuple },
  { name: "StaticKit", logo: logoStaticKit },
  { name: "Mirage", logo: logoMirage },
  { name: "Laravel", logo: logoLaravel },
  { name: "Statamic", logo: logoStatamic },
];

export type LogoCloudProps = SliceComponentProps<Content.LogoCloudSlice>;

export default function LogoCloud({ slice }: LogoCloudProps) {
  switch (slice.variation) {
    case "default":
      return <LogoCloudSimple slice={slice} darkMode={false} />;
    case "simpleDarkMode":
      return <LogoCloudSimple slice={slice} darkMode={true} />;
    case "single":
      return <LogoCloudSingle slice={slice} />;
    case "threeColumns":
      return <LogoCloudGrid slice={slice} />;
  }
}
