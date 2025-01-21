import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인이 필요한 경로들
const PROTECTED_PATHS = [
  "/auth/address",
  "/auth/kakao",
  "/auth/verify",
  "/letter",
  "/mypage",
  "/share",
  "/users",
];

// 공개 경로들 (로그인 없이 접근 가능)
const PUBLIC_PATHS = ["/", "/guide", "/photo", "/auth/login", "/auth/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Authorization 헤더 또는 쿠키에서 토큰 확인
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  // 보호된 경로에 접근하려고 할 때
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    // 토큰이 없으면
    if (!token) {
      // URL에 현재 시도한 경로를 state로 포함
      const url = new URL("/", request.url);
      url.searchParams.set("showLogin", "true");

      return NextResponse.redirect(url);
    }
  }

  // 허용되지 않은 경로로 접근할 때 (에러페이지 대신 홈으로)
  if (
    !PUBLIC_PATHS.some((path) => pathname.startsWith(path)) &&
    !PROTECTED_PATHS.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
