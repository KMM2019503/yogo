import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptKey } from "@/lib/utils";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const accessCode = request.cookies.get("AdminAccessCode");

    if (!accessCode) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const decryptedCode = decryptKey(accessCode.value);

    if (decryptedCode !== process.env.NEXT_PUBLIC_ADMIN_PASS_CODE) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
