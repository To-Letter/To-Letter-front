export interface menuTabDataI {
  title: string;
  path: string;
  userRoleAble?: "localLogin" | "kakaoLogin" | "all";
}

export interface menuI {
  category: string;
  tabOption: "underline" | "highlight";
  menuTabData: menuTabDataI[];
}

interface menuListI {
  auth: menuI;
  mypage: menuI;
  letterbox: menuI;
  letterdelete: menuI;
  newletter: menuI;
}

/**
 * @returns메뉴 탭 컴포넌트 UI 속성 인터페이스
 * @objectKey 중간 경로 이름으로(auth, mypage 등) 생성
 * @category object key+"Tab" 형식으로 생성
 * @tabOption underline, highlight 중 하나
 * @menuTabData 메뉴 탭 데이터 배열{title: string, path: string}
 * @title 메뉴 탭 이름
 * @path 메뉴 탭 경로 중첩 경로일 경우 menuListI에서 찾아서 firstPath, secondPath 중 하나
 */
export const menuList: menuListI = {
  auth: {
    category: "authTab",
    tabOption: "underline",
    menuTabData: [
      { title: "Login", path: "/auth/login" },
      { title: "Signup", path: "/auth/signup" },
    ],
  },
  mypage: {
    category: "myPageTab",
    tabOption: "underline",
    menuTabData: [
      { title: "MyInfo", path: "/mypage/myinfo", userRoleAble: "all" },
      {
        title: "Account",
        path: "/mypage/passwordmailverify",
        userRoleAble: "localLogin",
      },
      { title: "End Letter", path: "/mypage/letterend", userRoleAble: "all" },
    ],
  },
  letterbox: {
    category: "letterBoxTab",
    tabOption: "highlight",
    menuTabData: [
      { title: "받은 편지함", path: "/letter/letterbox/receive" },
      { title: "보낸 편지함", path: "/letter/letterbox/send" },
    ],
  },
  letterdelete: {
    category: "letterDeleteTab",
    tabOption: "highlight",
    menuTabData: [
      { title: "받은 편지함", path: "/letter/letterdelete/receive" },
      { title: "보낸 편지함", path: "/letter/letterdelete/send" },
    ],
  },
  newletter: {
    category: "newLetterBoxTab",
    tabOption: "highlight",
    menuTabData: [{ title: "새로 도착한 편지", path: "/letter/newletter" }],
  },
};
