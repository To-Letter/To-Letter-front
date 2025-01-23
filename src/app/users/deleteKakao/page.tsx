"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/store/recoil/loadingAtom";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { deleteKakaoUser } from "@/lib/api/controller/account";

export default function KakaoDeleteCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  /** 로딩 상태를 관리하는 recoil */
  const setLoadingState = useSetRecoilState(loadingState);

  /** 카카오 인가코드 처리 */
  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      handleKakaoDelete(code);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  /** 카카오 탈퇴 처리 함수 */
  const handleKakaoDelete = async (code: string) => {
    setLoadingState(true);
    try {
      const res = await deleteKakaoUser({ code });

      if (res.data.responseCode === 200) {
        alert("회원 탈퇴가 완료되었습니다.");
        router.replace("/");
      } else if (res.data.responseCode === 401) {
        alert("카카오 회원탈퇴에 실패하였습니다. 다시 시도해주세요.");
        router.replace("/");
      } else {
        alert("알 수 없는 에러입니다. 다시 시도해주세요.");
        router.replace("/");
      }
    } catch (error: any) {
      alert("회원 탈퇴 처리 중 오류가 발생했습니다.");
      router.push("/");
    } finally {
      setLoadingState(false);
    }
  };

  return <LoadingSpinner />;
}
