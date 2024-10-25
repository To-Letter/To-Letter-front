import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postKakaoToken } from "../../apis/controller/account";
import ProgressBar from "../ProgreassBar";
import { useRecoilState } from "recoil";
import { accountModalState } from "../../recoil/accountAtom";

const Redirection = () => {
  const [_modalState, setModalState] = useRecoilState(accountModalState);
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  const hasFetched = useRef(false);

  const OnClickKakaoToken = async () => {
    if (code) {
      try {
        let res: any = await postKakaoToken({ code: code });
        if (res.data.responseCode === 200) {
          // 카카오 회원가입 성공
          setModalState({
            isOpen: true,
            type: "kakaoSignup",
          });
          navigate("/");
        } else if (res.data.responseCode === 201) {
          // 이미 카카오 회원가입 된 유저라 바로 로그인 처리
          setModalState({
            isOpen: false,
            type: null,
          });
          navigate("/");
        } else if (res.data.responseCode === 400) {
          // 2차 회원가입(닉네임, 주소)이 제대로 진행이 되지 않음.
          setModalState({
            isOpen: true,
            type: "kakaoSignup",
          });
          navigate("/");
        } else if (res.data.responseCode === 401) {
          // 인증실패 토큰이 이상하거나 만료됨
          alert("로그인 유지시간이 만료되었습니다. 다시 로그인해주세요.");
          setModalState({
            isOpen: true,
            type: "login",
          });
          navigate("/");
        } else if (res.data.responseCode === 403) {
          // 동일한 이메일 존재
          alert("동일한 이메일이 존재합니다!");
          navigate("/"); // Home으로 리디렉션
        } else if (res.data.responseCode === 404) {
          // 카카오 토큰이 발급이 안됨
          alert("카카오 로그인 오류입니다. 다시 로그인해주세요");
          setModalState({
            isOpen: true,
            type: "login",
          });
          navigate("/");
        }
      } catch (err) {
        console.error("kakao token error :", err);
      }
    } else {
      alert("코드가 유효하지 않습니다.");
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      OnClickKakaoToken();
    }
  }, []);

  return (
    <div>
      <ProgressBar />
    </div>
  );
};

export default Redirection;
