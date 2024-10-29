import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { myInfoState } from '../recoil/myInfoAtom';
import { loadingState } from '../recoil/loadingAtom';
import { getMypage } from '../apis/controller/user';

interface MyInfoI {
  isLogin: boolean;
  address: string;
  email: string;
  nickname: string;
}

export const useUser = () => {
  const [myInfo, setMyInfo] = useRecoilState(myInfoState);
  const resetMyInfoState = useResetRecoilState(myInfoState);
  const setIsLoading = useSetRecoilState(loadingState)
  const [error, setError] = useState<string | null>(null);

  /**
   * 
   * @param updatedInfo MyInfoI의 isLogin, address, email, nickname 중 모든 속성이 필수가 아님
   */
  const updateMyInfo = (updatedInfo: Partial<MyInfoI>) => {
    setMyInfo((prevState: any) => ({
      ...prevState,
      ...updatedInfo
    }));
  };

  const resetMyInfo = ()=>{
    resetMyInfoState();
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchMyInfo = async () => {
      if (!myInfo.isLogin) {
        try {
          const result = await getMypage(); // 백엔드에서 유저 정보를 가져옴
          if(result.data.responseCode === 200){
            setMyInfo({
              isLogin: true, // 로그인 상태로 업데이트
              address: result.data.responseData.address,
              email: result.data.responseData.email,
              nickname: result.data.responseData.nickname,
              loginType: result.data.responseData.loginType
            });
          }else{
            alert('오류가 발생했습니다!');
            window.location.href ='/'
          }
        } catch (err) {
          setError('Failed to fetch user info.');
        }
      }
      setIsLoading(false);
    };

    fetchMyInfo();
  }, [myInfo.isLogin, setMyInfo, myInfo.address, myInfo.nickname]);

  return {
    myInfo,
    resetMyInfo,
    updateMyInfo,
    error
  };
};