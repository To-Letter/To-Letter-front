export interface menuTabDataI {
  title: string;
  path: string;
  ableUserRole?: "kakao" | "local" | "all";
}

export interface menuI {
  category: string;
  tabOption: "underline" | "highlight";
  menuTabData: menuTabDataI[];
}

interface menuListI {
  auth: menuI;
  mypage: menuI;
}

/**
 * @returns메뉴 탭 컴포넌트 UI 속성 인터페이스
 * @objectKey 중간 경로 이름으로(auth, mypage 등) 생성
 * @category object key+"Tab" 형식으로 생성
 * @tabOption underline, highlight 중 하나
 * @menuTabData 메뉴 탭 데이터 배열{title: string, path: string}
 * @title 메뉴 탭 이름
 * @path 메뉴 탭 경로
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
      { title: "MyPage", path: "/mypage" },
      { title: "MyInfo", path: "/mypage/myInfo" },
    ],
  },
};
