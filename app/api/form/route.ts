import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Convert the stream to JSON
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      throw new Error('Invalid request body');
    }

    // Guard clause checks for email and returns early if not valid
    if (
      !body.email ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)
    ) {
      // Sends a HTTP bad request error code
      return new NextResponse(
        JSON.stringify({ data: `Invalid email: ${body.email}` }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Sends a HTTP success code
      return new NextResponse(
        JSON.stringify({ data: `Email received: ${body.email}` }), 
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    // Handle any errors that occur during body parsing
    return new NextResponse(
      JSON.stringify({ error: 'Failed to parse the request body' }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
