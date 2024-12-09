"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginModal() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <LoginForm
        onSuccess={() => {
          // 로그인 성공 시 처리
          router.back(); // 모달 닫기
          // 필요한 경우 추가 처리
        }}
      />
    </Modal>
  );
}
