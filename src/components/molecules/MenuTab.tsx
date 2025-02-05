"use client";
import React, { useMemo } from "react";
import Tab from "@/components/atoms/Tab";
import { usePathname, useRouter } from "next/navigation";
import { NavBox } from "../atoms/Box";
import { type menuTabDataI, menuList } from "@/lib/constants/menuTabList";
import { useUser } from "@/hooks/useUser";

type MenuListKeys = keyof typeof menuList;

/**
 * 더 필요한 menuList는 중간 경로 이름으로(auth, mypage 등) 생성
 * @returns 메뉴 탭 컴포넌트 UI
 */
export default function MenuTab() {
  const router = useRouter();
  const pathname = usePathname();
  const { myInfo } = useUser();

  // `pathKey` 계산 최적화
  const pathKey = useMemo(() => {
    const [firstPath, secondPath] = pathname.split("/").filter(Boolean);
    return (firstPath in menuList ? firstPath : secondPath) as MenuListKeys;
  }, [pathname]);

  // `menuList[pathKey]` 추출 최적화
  const { category, menuTabData, tabOption } = useMemo(() => {
    return menuList[pathKey];
  }, [pathKey]);

  console.log("Current userRole:", myInfo.userRole); // 실제 값 확인

  if (tabOption === "underline") {
    return (
      <NavBox>
        {menuTabData
          .filter(
            ({ userRoleAble = "all" }) =>
              userRoleAble === "all" || userRoleAble === myInfo.userRole
          )
          .map(({ title, path }: menuTabDataI) => (
            <Tab
              key={`${category}-${title}`}
              keyValue={`tab-${category}-${title}`}
              TabTitle={title}
              tabOption={tabOption}
              onClick={() => router.push(`${path}`)}
              $fontWeight="bold"
              $padding="0 2px 4px 0"
              $margin="0 24px 0 0"
              $active={pathname.includes(path)}
            />
          ))}
      </NavBox>
    );
  } else {
    return (
      <NavBox
        $width="100%"
        $padding="8px 0"
        $justifyContent="center"
        $alignItems="center"
      >
        {menuTabData.map(({ title, path }: menuTabDataI) => (
          <Tab
            key={`${category}-${title}`}
            keyValue={`tab-${category}-${title}`}
            TabTitle={title}
            tabOption={tabOption}
            onClick={() => router.push(`${path}`)}
            $fontWeight="bold"
            $active={pathname.includes(path)}
          />
        ))}
      </NavBox>
    );
  }
}
