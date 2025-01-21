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

  // Authorization 헤더에서 액세스 토큰 확인
  const authHeader = request.headers.get("Authorization");
  const refreshToken = request.cookies.get("refreshToken");

  // 둘 다 없는 경우에만 로그인이 필요하다고 판단
  const isAuthenticated = authHeader || refreshToken;

  // 보호된 경로에 접근하려고 할 때
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    if (!isAuthenticated) {
      // 로그인이 필요한 경우 루트 페이지로 리다이렉트
      return NextResponse.redirect(new URL("/", request.url));
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
