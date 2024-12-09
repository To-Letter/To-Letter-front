import styled from "styled-components";

interface defaultStyleProps {
  $fontSize?: string;
  $fontWeight?: string;
  $color?: string;
  $margin?: string;
  $isClickAble?: boolean;
}

export const Text = styled.div<defaultStyleProps>`
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  color: ${({ $color }) => $color};
  margin: ${({ $margin }) => $margin};
  text-align: start;

  ${({ $isClickAble }) => {
    if ($isClickAble) return `cursor: pointer;`;
  }};
`;
