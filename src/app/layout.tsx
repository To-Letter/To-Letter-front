import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/api/reistry";
import { memo } from "react";
import ClientProviders from "@/components/ClientProviders";

const defaultMetadata: Metadata = {
  title: "TO. Letter",
  description: `[온라인을 통해 만나는 아날로그한 편지, TO. Letter]
  가상의 나의 방에서 편지를 주고 받을 수 있어요(내가 설정해둔 우편함 위치를 기준으로 편지가 도착하는 시간이 정해져요!).
  나의 편지 주소를 SNS에 공유하여 주변 사람들과 편지를 주고 받아보세요.`,
  openGraph: {
    title: "TO. Letter",
    description: "온라인을 통해 만나는 아날로그한 편지",
    images: ["/images/kakao_share_image.png"],
  },
};

// 모달별 메타데이터 설정
const modalMetadata: Record<string, Metadata> = {
  /* auth part */
  "/auth/address": {
    title: "TO. Letter - 주소 설정",
    description: "편지 도착 주소를 설정해보세요",
  },
  "/auth/kakao": {
    title: "TO. Letter - 카카오 로그인",
    description: "카카오 로그인을 통해 편지를 작성해보세요",
  },
  "/auth/login": {
    title: "TO. Letter - 로그인",
    description: "로그인을 통해 편지를 작성해보세요",
  },
  "/auth/signup": {
    title: "TO. Letter - 회원가입",
    description: "회원가입을 통해 TO. Letter를 이용해보세요",
  },
  "/auth/verify": {
    title: "TO. Letter - 이메일 인증번호 확인",
    description: "이메일 인증번호를 통해 회원가입을 완료해보세요",
  },
  /* letter part */
  "/letter/individualletter": {
    title: "TO. Letter - 편지 열람",
    description: "소중한 편지를 열람해보세요",
  },
  "/letter/letterbox/receive": {
    title: "TO. Letter - 받은 편지함",
    description: "도착한 편지함을 확인하세요",
  },
  "/letter/letterbox/send": {
    title: "TO. Letter - 보낸 편지함",
    description: "보낸 편지함을 확인하세요",
  },
  "/letter/letterdelete/receive": {
    title: "TO. Letter - 받은 편지 삭제",
    description: "받은 편지함을 확인하고 편지를 삭제해보세요",
  },
  "/letter/letterdelete/send": {
    title: "TO. Letter - 보낸 편지 삭제",
    description: "보낸 편지함을 확인하고 편지를 삭제해보세요",
  },
  "/letter/lettersend": {
    title: "TO. Letter - 편지 보내기",
    description: "편지를 보내기를 완료해보세요",
  },
  "/letter/letterwrite": {
    title: "TO. Letter - 편지 쓰기",
    description: "소중한 마음을 담아 편지를 작성해보세요",
  },
  "/letter/newletter": {
    title: "TO. Letter - 새로운 편지함",
    description: "새롭게 도착한 편지를 확인해보세요",
  },
  "/letter/userconfirm": {
    title: "TO. Letter - 받는이 확인",
    description: "편지 받을 사람이 존재하는지 확인해보세요",
  },
  /* mypage part */
  "/mypage/kakaouserwithdraw": {
    title: "TO. Letter - 카카오 회원탈퇴",
    description: "카카오 회원탈퇴 로직 처리",
  },
  "/mypage/letterend/kakaouserdelete": {
    title: "TO. Letter - End",
    description: "TO. Letter with kakao end",
  },
  "/mypage/letterend/localuserdelete": {
    title: "TO. Letter - End",
    description: "TO. Letter with local end",
  },
  "/mypage/myinfo": {
    title: "TO. Letter - 내 정보",
    description: "내 정보를 확인해보세요",
  },
  "/mypage/passwordmailverify/passwordchange": {
    title: "TO. Letter - 비밀번호 변경",
    description: "비밀번호 변경을 완료해보세요",
  },
  "/mypage/passwordmailverify": {
    title: "TO. Letter - 메일 인증",
    description: "비밀번호 변경을 위한 메일 인증을 완료해보세요",
  },
  /* photo board part */
  "/photo": {
    title: "TO. Letter - 게시판",
    description: "게시판을 확인해보세요",
  },
  /* SNS share part */
  "/share": {
    title: "TO. Letter - SNS 공유",
    description: "SNS 공유를 통해 주소를 공유해보세요",
  },
};

interface Props {
  params: { modal?: string };
  searchParams: { [key: string]: string | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // URL에서 현재 모달 경로 추출
  const currentPath = params.modal ? `/${params.modal}` : "/";

  // 현재 경로에 해당하는 메타데이터 가져오기
  const currentMetadata = modalMetadata[currentPath];

  // 기본 메타데이터와 현재 모달의 메타데이터 병합
  return {
    ...defaultMetadata,
    ...currentMetadata,
  };
}

const RootLayout = memo(
  ({
    children,
    modal,
  }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) => {
    return (
      <html lang="ko">
        <body>
          <StyledComponentsRegistry>
            <ClientProviders modal={modal}>{children}</ClientProviders>
          </StyledComponentsRegistry>
        </body>
      </html>
    );
  },
  /**
   * modal 및 children에 뱐경사항이 있을 경우 리랜더링
   */
  (prevProps, nextProps) => {
    return (
      prevProps.modal === nextProps.modal &&
      prevProps.children === nextProps.children
    );
  }
);
RootLayout.displayName = "RootLayout";

export default RootLayout;
