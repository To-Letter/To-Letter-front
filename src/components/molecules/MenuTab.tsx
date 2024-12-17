/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect } from "react";
import Tab from "@/components/atoms/Tab";
import { usePathname, useRouter } from "next/navigation";
import { NavBox } from "../atoms/Box";
import {
  type menuTabDataI,
  type menuI,
  menuList,
} from "@/lib/constants/menuTabList";

type MenuListKeys = keyof typeof menuList;

/**
 * 더 필요한 menuList는 중간 경로 이름으로(auth, mypage 등) 생성
 * @returns 메뉴 탭 컴포넌트 UI
 */
export default function MenuTab() {
  const router = useRouter();
  const pathname = usePathname();
  const [firstPath, secondPath] = pathname.split("/").filter(Boolean);

  const pathKey = (
    firstPath in menuList ? firstPath : secondPath
  ) as MenuListKeys;
  const { category, menuTabData, tabOption } = menuList[pathKey];

  return (
    <NavBox>
      {menuTabData.map(({ title, path }: menuTabDataI) => (
        <Tab
          key={`${category}-${title}`}
          keyValue={`tab-${category}-${title}`}
          TabTitle={title}
          tabOption={tabOption}
          onClick={() => router.push(`${path}`)}
          $fontWeight="bold"
          $padding="0 2px 4px 0"
          $margin="0 24px 0 0"
          $active={pathname === `${path}`}
        />
      ))}
    </NavBox>
  );
}
