"use client";

import React, {
  ChangeEvent,
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import styled from "styled-components";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

interface defaultStyleProps {
  margin?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
}

interface commonI {
  countPerPage: number;
  currentPage: number;
  totalCount: number;
}

interface AddressData {
  zipNo: string;
  roadAddr: string;
  jibunAddr: string;
}

function AddressModal() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string>("");
  // const [pageCnt, setPageCnt] = useState<number>(0)
  const [addrData, setAddrData] = useState<AddressData[]>([]);
  const focusRef = useRef<HTMLDivElement>(null);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [common, setCommon] = useState<commonI>({
    countPerPage: 20,
    currentPage: -1,
    totalCount: 0,
  });
  const [ref] = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView) {
        if (common.totalCount > common.countPerPage * common.currentPage) {
          searchAddress();
        } else {
        }
      }
    },
  });

  const onClickAddress = (selectedAddress: string) => {
    const encodedAddress = btoa(selectedAddress);
    router.push(`/auth/signup?selected_address=${encodedAddress}`);
  };

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.scrollTop = 0;
    }
  }, [isSearch]);

  /**
   * 무한스크롤
   */
  const searchAddress = async () => {
    if (searchWord !== "") {
      try {
        // const res = await axios.get(`https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${'U01TX0FVVEgyMDI0MDIxMzIwMjkyODExNDUxNDI='}&currentPage=${pageCnt}&countPerPage=10&keyword=${searchWord}&resultType=json`);
        const res = await axios.get(
          `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${
            process.env.REACT_APP_ADDRESS_API_KEY
          }&currentPage=${
            common.currentPage + 1
          }&countPerPage=20&keyword=${searchWord}&resultType=json`
        );
        if (res.data.results.common.errorCode === "0") {
          const tmp = addrData.concat(res.data.results.juso);
          setAddrData(tmp);
          setCommon({
            countPerPage: Number(res.data.results.common.countPerPage),
            currentPage: Number(res.data.results.common.currentPage),
            totalCount: Number(res.data.results.common.totalCount),
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   * 새로운 검색
   */
  const searchAddressButton = async () => {
    if (searchWord !== "") {
      try {
        // const res = await axios.get(`https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${'devU01TX0FVVEgyMDI0MDkwNDE5MDk0NDExNTA2MDU='}&currentPage=0&countPerPage=20&keyword=${searchWord}&resultType=json`);
        const res = await axios.get(
          `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${process.env.REACT_APP_ADDRESS_API_KEY}&currentPage=0&countPerPage=20&keyword=${searchWord}&resultType=json`
        );
        if (res.data.results.common.errorCode === "0") {
          setAddrData(res.data.results.juso);
          setCommon({
            countPerPage: Number(res.data.results.common.countPerPage),
            currentPage: Number(res.data.results.common.currentPage),
            totalCount: Number(res.data.results.common.totalCount),
          });
          setIsSearch((prev) => !prev);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);

    console.log("search word", searchWord);
  };

  const onClickGetAddress = () => {
    searchAddressButton();
  };

  /**
   * 검색어 입력 후 enter 키 입력시 동작 함수
   * @param e : enter key press 여부
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 엔터 키가 입력되었을 때 동작할 코드 작성
    if (e.key === "Enter") {
      searchAddressButton();
    }
  };

  const onClickClose = () => {
    router.back();
  };

  return (
    <ModalContent>
      <ModalHeader>
        <HeaderText>주소 선택</HeaderText>
        <OutBtn onClick={onClickClose}>X</OutBtn>
      </ModalHeader>
      <ModalContents>
        <SearchBox>
          <InputText
            type="text"
            onChange={handleInputChange}
            value={searchWord}
            onKeyDown={handleKeyDown}
          />
          <InputButton onClick={onClickGetAddress}>검색</InputButton>
        </SearchBox>
        <AddressWrap ref={focusRef}>
          {addrData &&
            addrData.map((juso, idx) => (
              <AddressItem
                onClick={() => onClickAddress(juso.roadAddr)}
                key={`juso.zipNo-${idx}`}
              >
                <Text color="red" margin="0 0 8px" fontSize="20px">
                  {juso.zipNo}
                </Text>
                <Box>
                  <AddressTag>도로명</AddressTag>
                  <Text color="black" margin="0 0 8px" fontSize="16px">
                    {juso.roadAddr}
                  </Text>
                </Box>
                <Box>
                  <AddressTag>지번</AddressTag>
                  <Text color="black" fontSize="16px">
                    {juso.jibunAddr}
                  </Text>
                </Box>
              </AddressItem>
            ))}
          <Box
            ref={addrData.length > 0 && common.currentPage !== -1 ? ref : null}
          />
        </AddressWrap>
      </ModalContents>
    </ModalContent>
  );
}

export default AddressModal;

const Box = styled.div``;

export const Text = styled.div<defaultStyleProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  text-align: start;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalHeader = styled.div`
  width: 400px;
  height: 48px;
  background-color: #2c2c2c;
  border-radius: 2px 2px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.div`
  font-size: 24px;
  color: white;
  font-family: noto-sans-cjk-kr;
  font-weight: bold;
  margin: 0 16px;
`;

const OutBtn = styled.div`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin: 0 16px;
  cursor: pointer;
`;

const ModalContents = styled.div`
  width: 100%;
  height: calc(100% - 48px);
`;

const SearchBox = styled.div`
  background: white;
  border-bottom: 1px solid #e9e9e9;
  padding: 15px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const InputText = styled.input`
  font-family: noto-sans-cjk-kr;
  display: block;
  width: 280px;
  height: 32px;
  font-size: 20px;
  border: 2px solid #2c2c2c;
  border-radius: 4px;
  padding: 8px;
  background-color: #fff;
`;

const InputButton = styled.button`
  border-radius: 4px;
  background-color: white;
  border: 2px solid #2c2c2c;
  font-size: 16px;
  width: 64px;
  font-family: noto-sans-cjk-kr;
  height: 48px;
  cursor: pointer;
  :hover {
    background-color: #2c2c2c;
    color: white;
  }
`;

const AddressWrap = styled.div`
  width: 98%;
  height: 100%;
  padding: 4px;
  background-color: #eee;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #2c2c2c white;
  /* 스크롤바 전체 영역 */
  ::-webkit-scrollbar {
    width: 10px; /* 세로축 스크롤바 폭 너비 */
    height: 20px; /* 가로축 스크롤바 폭 너비 */
  }
  ::-webkit-scrollbar-thumb {
    background: #2c2c2c; /* 스크롤바 막대 색상 */
    border: 2px solid #9b6a2f; /* 스크롤바 막대 테두리 설정  */
    border-radius: 12px 12px 12px 12px;
  }
`;

const AddressItem = styled.div`
  width: 96%;
  height: fit-content;
  margin: 8px 0;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  background-color: white;
  border-radius: 4px;
  border: 2px solid #dadada;
  cursor: pointer;
`;

const AddressTag = styled.div`
  font-size: 12px;
  height: 16px;
  width: 48px;
  margin-right: 8px;
  font-family: noto-sans-cjk-kr;
  border-radius: 4px;
  border: 1px solid #2c2c2c;
  color: #2c2c2c;
`;
