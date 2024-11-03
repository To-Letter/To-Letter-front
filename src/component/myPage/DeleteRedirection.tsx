import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteKakaoUser } from "../../apis/controller/account";
import ProgressBar from "../ProgreassBar";
import { useSetRecoilState } from "recoil";
import { myPageModalState } from "../../recoil/myInfoAtom";
import { loadingState } from "../../recoil/loadingAtom";

const DeleteRedirection = () => {
  const setLoding = useSetRecoilState(loadingState)
  const setMypageModalState = useSetRecoilState(myPageModalState);
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  const hasFetched = useRef(false);

  const OnClickKakaoToken = async () => {
    if (code) {
      try {
        let res: any = await deleteKakaoUser({ code: code });
        setLoding(false);
        if (res.data.responseCode === 200) {
          setMypageModalState(false);
          alert("회원 탈퇴가 완료되었습니다.")
          navigate("/");
        } else if (res.data.responseCode === 401) {
          alert("카카오 회원탈퇴에 실패하였습니다. 다시 시도해주세요.");
          navigate("/");
        } else {
          alert("알 수 없는 에러입니다. 다시 시도해주세요.");
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

export default DeleteRedirection;
