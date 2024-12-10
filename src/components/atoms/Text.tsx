import styled from "styled-components";

interface defaultStyleProps {
  $fontSize?: string;
  $fontWeight?: string;
  $color?: string;
  $margin?: string;
  $isClickAble?: boolean;
}

/**
 * @param $fontSize?: string;
 * @param $fontWeight?: string;
 * @param $color?: string;
 * @param $margin?: string;
 * @param $isClickAble?: boolean;(onclick 함수 필요 경우)
 * @returns 기본 Text UI, css 추가 필요시 상속하여 사용
 */
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
