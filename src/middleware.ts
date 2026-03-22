import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (host === "dotjava.org" || host === "www.dotjava.org") {
    const url = new URL(request.url);
    url.host = "cl.naokitakata.com";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }
}
