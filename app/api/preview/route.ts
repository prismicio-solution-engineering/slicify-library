import { redirectToPreviewURL } from "@prismicio/next";
import { createClient } from "../../../prismicio";
import { NextRequest } from "next/server";

/**
 * This endpoint handles previews that are launched from the Page Builder.
 */


export async function GET(request:NextRequest) {
  const client = createClient();

  await redirectToPreviewURL({ client, request });
}