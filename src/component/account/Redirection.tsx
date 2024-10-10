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
  console.log("code :", code);

  const hasFetched = useRef(false);

  const OnClickKakaoToken = async () => {
    if (code) {
      try {
        let res: any = await postKakaoToken({ code: code });
        console.log("카카오 token :", res);
        if (res.status === 200) {
          if (res.data !== undefined || res.data !== null) {
            console.log("data :", res.data);
            setModalState({
            isOpen: true,
            type: 'MailVerify', // 로그인 타입으로 설정
          });
            navigate("/"); // Home으로 리디렉션
          }
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
