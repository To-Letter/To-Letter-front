// mypage/default.tsx
import { redirect } from "next/navigation";

/**
 * mypage 접근 시 /mypage/myInfo으로 리다이렉트
 */
export default function MyPageDefault() {
  redirect("/mypage/myInfo");
}
