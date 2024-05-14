"use client";

import { SliceSimulator } from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components as mktComponents } from "../../slices/marketing";
import { components as blogComponents } from "../../slices/blog";

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator
      sliceZone={(props) => (
        <SliceZone
          {...props}
          components={{ ...mktComponents, ...blogComponents }}
        />
      )}
    />
  );
}
