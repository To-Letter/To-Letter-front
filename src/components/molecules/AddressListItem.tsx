import React from "react";
import { ElementBox } from "../atoms/Box";
import styled from "styled-components";
import { Text } from "../atoms/Text";

export default function AddressListItem({
  idx,
  zipNo,
  roadAddr,
  jibunAddr,
  selectAddress,
}: {
  idx: number;
  zipNo: string;
  roadAddr: string;
  jibunAddr: string;
  selectAddress: (roadAddr: string) => void;
}) {
  return (
    <AddressItem
      onClick={() => selectAddress(roadAddr)}
      key={`juso.zipNo-${idx}`}
      $width="360px"
      $height="fit-content"
      $margin="8px 0"
      $padding="8px"
      $direction="column"
      $justifyContent="start"
      $alignItems="start"
      $backgroundColor="white"
      $border="2px solid #dadada"
    >
      <Text $color="red" $margin="0 0 8px" $fontSize="20px">
        {zipNo}
      </Text>
      <ElementBox>
        <ElementBox
          $height="16px"
          $width="48px"
          $justifyContent="center"
          $alignItems="center"
          $margin="0 4px 0 0"
          $border="1px solid #2c2c2c"
          $borderRadius="4px"
        >
          <Text $fontSize="12px" $color="#2c2c2c">
            도로명
          </Text>
        </ElementBox>
        <ElementBox $width="calc(100% - 52px)">
          <Text $color="black" $margin="0 0 8px" $fontSize="16px">
            {roadAddr}
          </Text>
        </ElementBox>
      </ElementBox>
      <ElementBox>
        <ElementBox
          $height="16px"
          $width="48px"
          $justifyContent="center"
          $alignItems="center"
          $margin="0 4px 0 0"
          $border="1px solid #2c2c2c"
          $borderRadius="4px"
        >
          <Text $fontSize="12px" $color="#2c2c2c">
            지번
          </Text>
        </ElementBox>
        <ElementBox $width="calc(100% - 52px)">
          <Text $color="black" $fontSize="16px">
            {jibunAddr}
          </Text>
        </ElementBox>
      </ElementBox>
    </AddressItem>
  );
}

const AddressItem = styled(ElementBox)`
  max-width: 400px;
  cursor: pointer;
`;
