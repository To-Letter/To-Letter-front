// auth/default.tsx
import { redirect } from "next/navigation";

/**
 * auth로 접근 시 /auth/login으로 리다이렉트
 */
export default function AuthDefault() {
  redirect("/auth/login");
}
