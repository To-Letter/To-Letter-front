import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);
  // Authorization 헤더 또는 쿠키에서 토큰 확인
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  console.log("request", request);
  console.log("token", token);
  // 토큰이 없으면
  if (!token) {
    // URL에 현재 시도한 경로를 state로 포함
    const url = new URL("/", request.url);
    url.searchParams.set("showLogin", "true");

    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/auth/address",
    "/auth/kakao",
    "/auth/verify",
    "/letter/:path*",
    "/mypage/:path*",
    "/share",
    "/users",
  ],
};
