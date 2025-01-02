"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { HeaderBox } from "../atoms/Box";
import { Text } from "../atoms/Text";

export default function AddressHeader() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  return (
    <HeaderBox
      $width="400px"
      $height="48px"
      $backgroundColor="#2c2c2c"
      $alignItems="center"
      $justifyContent="space-between"
      $borderRadius="2px 2px 0 0"
    >
      <Text $fontSize="20px" $color="white" $fontWeight="bold" $margin="0 16px">
        주소 선택
      </Text>
      <Text
        $isClickAble={true}
        $color="white"
        $fontSize="24p"
        $margin="0 16px"
        $fontWeight="bold"
        onClick={onClickClose}
      >
        X
      </Text>
    </HeaderBox>
  );
}
