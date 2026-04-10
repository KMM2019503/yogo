import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptKey } from "@/lib/utils";
import { serverEnv } from "@/lib/server-env";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const accessCode = request.cookies.get("AdminAccessCode");

    if (!accessCode) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const decryptedCode = decryptKey(accessCode.value);

    if (decryptedCode !== serverEnv.ADMIN_PASS_CODE) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
