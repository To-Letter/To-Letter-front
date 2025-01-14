"use client";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { myInfoState } from "@/store/recoil/accountAtom";
import { loadingState } from "@/store/recoil/loadingAtom";
import { getMypage } from "@/lib/api/controller/user";
import axiosInterceptor from "@/lib/api/axiosInterceptor";

interface MyInfoI {
  isLogin: boolean;
  address: string;
  email: string;
  nickname: string;
  userRole: "local" | "kakao";
}

/**
 * @return 유저 정보 관리 recoil, 유저 정보 초기화, 유저 정보 업데이트, 에러 상태
 */
export const useUser = () => {
  /** 에러 상태 관리 state */
  const [error, setError] = useState<string | null>(null);
  /** 유저 정보 관리 recoil */
  const [myInfo, setMyInfo] = useRecoilState(myInfoState);
  /** 유저 정보 초기화 */
  const resetMyInfoState = useResetRecoilState(myInfoState);
  /** 로딩 상태 관리 recoil */
  const setIsLoading = useSetRecoilState(loadingState);

  /**
   *
   * @param updatedInfo MyInfoI의 isLogin, address, email, nickname 중 모든 속성이 필수가 아님
   */
  const updateMyInfo = (updatedInfo: Partial<MyInfoI>) => {
    setMyInfo((prevState: any) => ({
      ...prevState,
      ...updatedInfo,
    }));
  };

  /** 유저 정보 초기화 */
  const resetMyInfo = () => {
    resetMyInfoState();
  };

  /** 유저 정보 api 호출 */
  useEffect(() => {
    const fetchMyInfo = async () => {
      setIsLoading(true);
      try {
        const result = await getMypage();
        if (result.data.responseCode === 200) {
          console.log("useUser result", result.data.responseData);
          setMyInfo({
            isLogin: true,
            address: result.data.responseData.address,
            email: result.data.responseData.email,
            nickname: result.data.responseData.nickname,
            userRole: result.data.responseData.loginType,
          });
        }
      } catch (error: any) {
        // 401 등 인증 에러가 아닌 경우에만 에러 처리
        if (!error.response) {
          setError("Failed to fetch user info.");
          console.error("마이페이지 조회 에러:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // 토큰이 있는 경우에만 마이페이지 정보 요청
    const token = axiosInterceptor.defaults.headers.common["Authorization"];
    if (token) {
      fetchMyInfo();
    }
  }, [
    myInfo.isLogin,
    setMyInfo,
    myInfo.address,
    myInfo.nickname,
    setIsLoading,
  ]);

  return {
    myInfo,
    resetMyInfo,
    updateMyInfo,
    error,
  };
};
