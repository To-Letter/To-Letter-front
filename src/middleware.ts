import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const referer = request.headers.get("referer");

  console.log({
    pathname,
    referer,
    headers: Object.fromEntries(request.headers.entries()),
  });

  // Authorization 헤더 또는 쿠키에서 토큰 확인
  const token = request.headers.get("authorization");

  // 직접 URL 접근일 때만 체크 (referer가 없을 때)
  if (!referer && token === undefined) {
    const url = new URL("/", request.url);
    url.searchParams.set("showLogin", "true");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/letter/:path*",
    "/mypage/:path*",
    "/photo",
    "/share",
    "/users",
  ],
};
