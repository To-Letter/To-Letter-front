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
import { useRouter } from "next/navigation";
import AddressListItem from "../../molecules/AddressListItem";
import { ElementBox, MainBox, SectionBox } from "../../atoms/Box";
import { signupState } from "@/store/recoil/accountAtom";
import { useRecoilState } from "recoil";
import { useUser } from "@/hooks/useUser";

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

function AddressContents() {
  const router = useRouter();
  /** 유저 정보 관리 */
  const { updateMyInfo } = useUser();
  /** 주소 데이터 무한 스크롤 */
  const [ref] = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView) {
        if (common.totalCount > common.countPerPage * common.currentPage) {
          fetchMoreAddress();
        } else {
        }
      }
    },
  });
  /** 스크롤 초기화 ref */
  const focusRef = useRef<HTMLDivElement>(null);
  /** 검색어 관리 state */
  const [searchWord, setSearchWord] = useState<string>("");
  /** 주소 데이터 관리 state */
  const [addrData, setAddrData] = useState<AddressData[]>([]);
  /** 검색 여부 관리 state */
  const [isSearch, setIsSearch] = useState<boolean>(false);
  /** 주소 모달 데이터 페이지 관리 state */
  const [common, setCommon] = useState<commonI>({
    countPerPage: 20,
    currentPage: -1,
    totalCount: 0,
  });
  /** 회원가입 정보 관리 recoil */
  const [, setSignupForm] = useRecoilState(signupState);

  /**
   * 유저가 선택한 주소 값
   * @param selectedAddress user Select address string
   */
  const selectAddress = (selectedAddress: string) => {
    setSignupForm((prev) => ({
      ...prev,
      mailboxAddress: selectedAddress,
    }));
    updateMyInfo({
      address: selectedAddress,
    });

    router.back();
  };

  /**
   * 검색어에 대한 추가 데이터 요청 함수
   */
  const fetchMoreAddress = async () => {
    if (searchWord !== "") {
      try {
        const res = await axios.get(
          `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${
            process.env.NEXT_PUBLIC_ADDRESS_API_KEY
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
      } catch (error: any) {
        alert("주소 검색 오류입니다. 잠시후에 다시 시도해주세요.");
      }
    }
  };

  /**
   * 새로운 검색어에 대한 데이터 요청 함수
   */
  const fetchAddress = async () => {
    if (searchWord !== "") {
      try {
        const res = await axios.get(
          `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${process.env.NEXT_PUBLIC_ADDRESS_API_KEY}&currentPage=0&countPerPage=20&keyword=${searchWord}&resultType=json`
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
      } catch (error: any) {
        alert("주소 검색 오류입니다. 잠시후에 다시 시도해주세요.");
      }
    }
  };

  /**
   * 사용자가 키보드를 통해 입력 중인 검색어 저장
   */
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  /**
   * 검색 버튼 클릭
   */
  const onClickSearchButton = () => {
    fetchAddress();
  };

  /**
   * 검색어 입력 후 enter 키 입력시 동작 함수
   * @param e : enter key press 여부
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 엔터 키가 입력되었을 때 동작할 코드 작성
    if (e.key === "Enter") {
      fetchAddress();
    }
  };

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.scrollTop = 0;
    }
  }, [isSearch]);

  return (
    <MainBox $width="100%" $height="calc(100% - 48px)" $direction="column">
      <SectionBox
        $backgroundColor="white"
        $padding="15px 0"
        $border="1px solid #e9e9e9"
        $justifyContent="space-around"
        $alignItems="center"
      >
        <InputText
          type="text"
          onChange={onChangeInput}
          value={searchWord}
          onKeyDown={handleKeyDown}
        />
        <InputButton onClick={onClickSearchButton}>검색</InputButton>
      </SectionBox>
      <AddressListSection
        $width="98%"
        $height="100%"
        $padding="4px"
        $backgroundColor="#eee"
        $direction="column"
        $justifyContent="flex-start"
        $alignItems="center"
        ref={focusRef}
      >
        {addrData &&
          addrData.map((juso, idx) => (
            <AddressListItem
              key={`AddressListItem${idx}`}
              idx={idx}
              jibunAddr={juso.jibunAddr}
              roadAddr={juso.roadAddr}
              zipNo={juso.zipNo}
              selectAddress={selectAddress}
            />
          ))}
        <ElementBox
          ref={addrData.length > 0 && common.currentPage !== -1 ? ref : null}
        />
      </AddressListSection>
    </MainBox>
  );
}

export default AddressContents;

const AddressListSection = styled(SectionBox)`
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
