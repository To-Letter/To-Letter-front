import LoginContents from "@/components/organisms/auth/LoginContents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TO. Letter - 로그인",
  description: "로그인을 통해 편지를 작성해보세요",
};

export default function LoginModal() {
  return <LoginContents />;
}
