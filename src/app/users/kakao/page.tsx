"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/store/recoil/loadingAtom";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { postKakaoToken } from "@/lib/api/controller/account";
import { signupState } from "@/store/recoil/accountAtom";
import { useModelLoadingStore } from "@/store/recoil/zustand/modelLoadingStore";

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  /* 임의로 모델 로딩 상태 관리 zustand */
  const { disableLoading } = useModelLoadingStore();
  /** 로딩 상태 관리 recoil */
  const setLoadingState = useSetRecoilState(loadingState);
  /** 회원가입 정보 관리 recoil */
  const setSignupForm = useSetRecoilState(signupState);

  /** 카카오 인가코드 처리 */
  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      handleKakaoLogin(code);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  /** 카카오 로그인 처리 함수 */
  const handleKakaoLogin = async (code: string) => {
    setLoadingState(true);
    try {
      const res = await postKakaoToken({ code });

      if (res.data.responseCode === 200) {
        setSignupForm((prev) => ({
          ...prev,
          email: res.data.responseData.email,
        }));
        router.replace("/?modal=kakao-signup");
      } else if (res.data.responseCode === 201) {
        disableLoading();
        router.replace("/");
      } else if (res.data.responseCode === 400) {
        setSignupForm((prev) => ({
          ...prev,
          email: res.data.responseData.email,
        }));
        router.replace("/?modal=kakao-signup");
      } else if (res.data.responseCode === 401) {
        alert("로그인 유지시간이 만료되었습니다. 다시 로그인해주세요.");
        router.replace("/?modal=login");
      } else if (res.data.responseCode === 403) {
        alert("동일한 이메일이 존재합니다.");
        disableLoading();
        router.replace("/");
      } else if (res.data.responseCode === 404) {
        alert("존재하지 않는 이메일입니다.");
        disableLoading();
        router.replace("/");
      } else {
        alert("카카오 로그인 오류입니다. 다시 로그인해주세요.");
        router.replace("/?modal=login");
        console.log("kakao : ", 405);
      }
    } catch (error: any) {
      alert("카카오 로그인 중 오류가 발생했습니다.");
      disableLoading();
      router.push("/");
    } finally {
      setLoadingState(false);
    }
  };

  return <LoadingSpinner />;
}
