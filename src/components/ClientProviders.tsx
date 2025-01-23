"use client";

import { RecoilRoot } from "recoil";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const ClientProviders = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <RecoilRoot>
      <LoadingSpinner />
      {children}
      {pathname === "/" ? null : modal}
    </RecoilRoot>
  );
};

export default ClientProviders;
