import { useEffect, useRef } from "react";
import { deleteKakaoUser } from "@/lib/api/controller/account";
import ProgressBar from "@/components/atoms/ProgressBar";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/store/recoil/loadingAtom";
import { useRouter } from "next/navigation";

const KakaoUserWithdrawContents = () => {
  const router = useRouter();
  /** api 중복 호출 방지 ref */
  const hasFetched = useRef(false);
  /** 로딩 상태를 관리하는 recoil */
  const setLoding = useSetRecoilState(loadingState);
  /** 카카오 인증코드 추출 */
  const code = new URL(window.location.href).searchParams.get("code");

  /** 서버와 카카오 회원 탈퇴 통신 및 응답 처리 함수 */
  useEffect(() => {
    const OnClickKakaoToken = async () => {
      if (code) {
        try {
          const res: any = await deleteKakaoUser({ code: code });
          setLoding(false);
          if (res.data.responseCode === 200) {
            alert("회원 탈퇴가 완료되었습니다.");
            router.push("/");
          } else if (res.data.responseCode === 401) {
            alert("카카오 회원탈퇴에 실패하였습니다. 다시 시도해주세요.");
            router.push("/");
          } else {
            alert("알 수 없는 에러입니다. 다시 시도해주세요.");
            router.push("/");
          }
        } catch (err) {
          console.error("kakao token error :", err);
        }
      } else {
        alert("코드가 유효하지 않습니다.");
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      OnClickKakaoToken();
    }
  }, [code, router, setLoding]);

  return (
    <div>
      <ProgressBar />
    </div>
  );
};

export default KakaoUserWithdrawContents;
