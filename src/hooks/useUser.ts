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
  prevNickname: string;
  isNicknameChecked: boolean;
  userRole: "localLogin" | "kakaoLogin";
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

  /** 초기 데이터 로드는 한 번만 실행되도록 수정 */
  useEffect(() => {
    const token = axiosInterceptor.defaults.headers.common["Authorization"];
    // myInfo가 비어있을 때만 fetchMyInfo 실행
    if (token && !myInfo.email) {
      fetchMyInfo();
    }
  }, []);

  /** 유저 정보 api 호출 */
  const fetchMyInfo = async () => {
    setIsLoading(true);
    try {
      const result = await getMypage();
      if (result.data.responseCode === 200) {
        setMyInfo({
          isLogin: true,
          address: result.data.responseData.address,
          email: result.data.responseData.email,
          nickname: result.data.responseData.nickname,
          prevNickname: result.data.responseData.nickname,
          isNicknameChecked: true,
          userRole: result.data.responseData.loginType,
        });
      }
    } catch (error: any) {
      if (!error.response || error.response.status !== 401) {
        setError("Failed to fetch user info.");
        alert("마이페이지 조회 오류입니다. 잠시후에 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   *
   * @param updatedInfo MyInfoI의 isLogin, address, email, nickname 중 모든 속성이 필수가 아님
   */
  const updateMyInfo = (updatedInfo: Partial<MyInfoI>) => {
    setMyInfo((prevState: any) => {
      const newState = {
        ...prevState,
        ...updatedInfo,
      };
      return newState;
    });
  };

  /** 서버 유저 정보 업데이트 후 로컬 유저 정보 새로고침 */
  const refreshMyInfo = async () => {
    await fetchMyInfo();
  };

  /** 유저 정보 초기화 */
  const resetMyInfo = () => {
    resetMyInfoState();
  };

  return {
    myInfo,
    updateMyInfo,
    refreshMyInfo,
    resetMyInfo,
    error,
  };
};
