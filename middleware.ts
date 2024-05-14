import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

  //Show root "en-us" page if root page asked
  return NextResponse.rewrite(
    new URL('/en-us', request.url)
  );
}

export const config = {
  // Don’t change the URL of Next.js assets starting with _next
  matcher: ['/'],
};
