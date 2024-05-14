import * as fs from "node:fs/promises";
import * as path from "node:path";
import { Metadata } from "next";
import {
  SharedSlice,
} from "@prismicio/types-internal/lib/customtypes";
import { SharedSliceContent } from "@prismicio/types-internal/lib/content";
import React from "react";

import { SliceLibrary } from "./SliceLibrary";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Slice Library",
    description: "Slice Library",
  };
}

export const dynamic = 'force-static'

export default async function SliceLibraryPage() {

  const libraries = await extractModels();

  return (
    <SliceLibrary libraries={libraries} />
  );
}

async function extractModels(): Promise<({ slices: SharedSlice[], name: string, mocks: SharedSliceContent[][] }[])> {

  try {
    const file = await fs.readFile(process.cwd() + '/slicemachine.config.json', 'utf8');
    const config = JSON.parse(file);
    
    const libraries =
      await Promise.all(
        (config.libraries || []).map(async (library: string) => {
          return {
            name: library,
            slices: await readModels<SharedSlice>({
              path: path.join(process.cwd(), library),
              fileName: "model.json",
            }),
            mocks: await readModels<SharedSliceContent[]>({
              path: path.join(process.cwd(), library),
              fileName: "mocks.json",
            })
          };
        }),
      )

    return libraries;
  }
  catch {
    throw new Error("Issue when reading local slice libraries listed in slicemachine.config.json");
  }
}

const readModels = async <TType extends SharedSliceContent[] | SharedSlice>(args: {
  path: string;
  fileName: string;
}): Promise<TType[]> => {
  const entries = await fs.readdir(args.path, {
    recursive: true,
    withFileTypes: true,
  });

  const results: TType[] = [];

  //Order slices alphabetically in each library
  entries.sort((a,b)=> a.path>b.path ? 1 : -1)

  for (const entry of entries) {
    if (entry.name !== args.fileName || entry.isDirectory()) {
      continue;
    }

    const contents = await fs.readFile(
      path.join(entry.path, entry.name),
      "utf8",
    );

    results.push(JSON.parse(contents));
  }

  return results;
};