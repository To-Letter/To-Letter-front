import { useEffect, useRef } from "react";
import { postKakaoToken } from "@/lib/api/controller/account";
import ProgressBar from "@/components/commonui/ProgressBar";
import { useSetRecoilState } from "recoil";
import { signupState } from "@/store/recoil/accountAtom";
import { loadingState } from "@/store/recoil/loadingAtom";
import { useRouter } from "next/router";

const Redirection = () => {
  const setLoadingState = useSetRecoilState(loadingState);
  const code = new URL(window.location.href).searchParams.get("code");
  const setSignupForm = useSetRecoilState(signupState);
  const router = useRouter();

  const hasFetched = useRef(false);

  useEffect(() => {
    const OnClickKakaoToken = async () => {
      if (code) {
        try {
          const res: any = await postKakaoToken({ code: code });
          if (res.data.responseCode === 200) {
            // 카카오 회원가입 성공
            setLoadingState(false);
            setSignupForm((prev) => ({
              ...prev,
              email: res.data.responseData.email,
            }));
            router.replace("/?modal=auth/kakao");
          } else if (res.data.responseCode === 201) {
            // 이미 카카오 회원가입 된 유저라 바로 로그인 처리
            setLoadingState(false);
            router.push("/");
          } else if (res.data.responseCode === 400) {
            setLoadingState(false);
            // 2차 회원가입(닉네임, 주소)이 제대로 진행이 되지 않음.
            setSignupForm((prev) => ({
              ...prev,
              email: res.data.responseData.email,
            }));
            router.replace("/?modal=auth/kakao");
          } else if (res.data.responseCode === 401) {
            setLoadingState(false);
            // 인증실패 토큰이 이상하거나 만료됨
            alert("로그인 유지시간이 만료되었습니다. 다시 로그인해주세요.");
            router.replace("/?modal=auth/login");
          } else if (res.data.responseCode === 403) {
            setLoadingState(false);
            // 동일한 이메일 존재
            alert("동일한 이메일이 존재합니다!");
            router.push("/"); // Home으로 리디렉션
          } else if (res.data.responseCode === 404) {
            setLoadingState(false);
            // 카카오 토큰이 발급이 안됨
            alert("카카오 로그인 오류입니다. 다시 로그인해주세요");
            router.replace("/?modal=auth/login");
          }
        } catch (err) {
          console.error("kakao token error :", err);
        }
      } else {
        alert("코드가 유효하지 않습니다.");
        router.push("/");
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      OnClickKakaoToken();
    }
  }, [code, router, setLoadingState, setSignupForm]);

  return (
    <div>
      <ProgressBar />
    </div>
  );
};

export default Redirection;
