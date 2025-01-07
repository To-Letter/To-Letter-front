"use client";

import { RecoilRoot } from "recoil";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { ReactNode } from "react";

const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <LoadingSpinner />
      {children}
    </RecoilRoot>
  );
};

export default ClientProviders;
