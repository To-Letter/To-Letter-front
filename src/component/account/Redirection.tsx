import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postKakaoToken } from "../../apis/controller/account";
import { MenuContext } from "../../context/MenuContext";
import ProgressBar from "../ProgreassBar";

const Redirection = () => {
  const { setMenuNumber } = useContext(MenuContext)!;
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
            setTimeout(() => {
              setMenuNumber(3);
              navigate("/"); // Home으로 리디렉션
            }, 2000);
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
