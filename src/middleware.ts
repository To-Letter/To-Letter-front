import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인이 필요한 경로들
const PROTECTED_DIRECT_PATHS = [
  "/auth/address",
  "/auth/kakao",
  "/auth/verify",
  "/letter/individualletter",
  "/letter/letterbox/receive",
  "/letter/letterbox/send",
  "/letter/letterdelete/receive",
  "/letter/letterdelete/send",
  "/letter/lettersend",
  "/letter/letterwrite",
  "/letter/newletter",
  "/letter/userconfirm",
  "/mypage/kakaouserwithdraw",
  "/mypage/letterend/kakaouserdelete",
  "/mypage/letterend/localuserdelete",
  "/mypage/myinfo",
  "/mypage/passwordmailverify/passwordchange",
  "/share",
  "/users",
];

// 공개 경로들 (로그인 없이 접근 가능)
/* const PUBLIC_PATHS = ["/", "/guide", "/photo", "/auth/login", "/auth/signup"]; */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Authorization 헤더에서 액세스 토큰 확인
  const authHeader = request.headers.get("Authorization");
  const refreshToken = request.cookies.get("refreshToken");
  const isAuthenticated = authHeader || refreshToken;

  // 보호된 경로에 접근하려고 할 때
  if (PROTECTED_DIRECT_PATHS.includes(pathname)) {
    if (!isAuthenticated) {
      // 로그인이 필요한 경우 루트 페이지로 리다이렉트
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: "/:path*",
};
