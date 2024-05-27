import React, { ReactNode } from "react";

// Remove this, if you already import Tailwind CSS somewhere else
import "./styles.css";

// This is an example layout for the slice library page – if you have a global layout that
// doesn't interfere with slice library styling you might not need it. Otherwise it might
// make sense to consider multiple root layours, with this file as one of them:
// https://nextjs.org/docs/app/building-your-application/routing/route-groups#creating-multiple-root-layouts
export default async function SliceLibraryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
