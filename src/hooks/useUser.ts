// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from "react";
import { myInfoState } from "@/store/recoil/accountAtom";
/* import { loadingState } from "@/store/recoil/loadingAtom";
import { getMypage } from "@/lib/api/controller/user"; */

interface MyInfoI {
  isLogin: boolean;
  address: string;
  email: string;
  nickname: string;
  loginType: "localLogin" | "kakaoLogin";
}

/**
 * @return 유저 정보 관리 recoil, 유저 정보 초기화, 유저 정보 업데이트, 에러 상태
 */
export const useUser = () => {
  /** 에러 상태 관리 state */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  /** 유저 정보 관리 recoil */
  const [myInfo, setMyInfo] = useRecoilState(myInfoState);
  /** 유저 정보 초기화 */
  const resetMyInfoState = useResetRecoilState(myInfoState);
  /** 로딩 상태 관리 recoil */
  /*   const setIsLoading = useSetRecoilState(loadingState); */

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
  /*   useEffect(() => {
    setIsLoading(true);
    const fetchMyInfo = async () => {
      if (!myInfo.isLogin) {
        try {
          const result = await getMypage(); // 백엔드에서 유저 정보를 가져옴
          if (result.data.responseCode === 200) {
            setMyInfo({
              isLogin: true, // 로그인 상태로 업데이트
              address: result.data.responseData.address,
              email: result.data.responseData.email,
              nickname: result.data.responseData.nickname,
              userRole: result.data.responseData.loginType,
            });
          } else {
            alert("오류가 발생했습니다!");
            window.location.href = "/";
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
          setError("Failed to fetch user info.");
        }
      }
      setIsLoading(false);
    };

    fetchMyInfo();
  }, [
    myInfo.isLogin,
    setMyInfo,
    myInfo.address,
    myInfo.nickname,
    setIsLoading,
  ]); */

  return {
    myInfo,
    resetMyInfo,
    updateMyInfo,
    error,
  };
};
