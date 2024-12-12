import React from "react";
import Tab from "@/components/atoms/Tab";
import { usePathname, useRouter } from "next/navigation";
import { NavBox } from "../atoms/Box";

export default function AuthMenuTab() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <NavBox>
      <Tab
        keyValue="authTab-Login"
        TabTitle="Login"
        tabOption="underline"
        onClick={() => router.push("/auth/login")}
        $fontWeight="bold"
        $padding="0 2px 4px 0;"
        $margin="0 24px 0 0"
        $active={pathname === "/auth/login"}
      />
      <Tab
        keyValue="authTab-Signup"
        TabTitle="Signup"
        tabOption="underline"
        onClick={() => router.push("/auth/signup")}
        $fontWeight="bold"
        $padding="0 2px 4px 2px;"
        $active={pathname === "/auth/signup"}
      />
    </NavBox>
  );
}
