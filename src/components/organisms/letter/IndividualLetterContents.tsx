import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { useRecoilState, useSetRecoilState } from "recoil";
import { individualLetterState, tabState } from "@/store/recoil/letterAtom";
import { FaTrash } from "react-icons/fa";
import useThrottle from "@/hooks/useThrottle";
import { loadingState } from "@/store/recoil/loadingAtom";
import DeleteConfirmContents from "@/components/organisms/letter/DeleteConfirmContents";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MainBox } from "@/components/atoms/Box";

const IndividualLetterContents = () => {
  const router = useRouter();
  /* 편지 삭제 확인 모달을 관리하는 query 관련 hooks */
  const searchParams = useSearchParams();
  const pathname = usePathname();
  /* 편지 삭제 확인 모달의 유무 */
  const confirm = searchParams.get("confirm")?.toString();
  /** 모달창 외부 클릭시 반응을 위한 ref **/
  const modalRef = useRef<HTMLDivElement>(null);
  /** 편지 내용 스크롤을 위한 ref **/
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  /** 무한 스크롤을 위한 편지 내용 상태와 페이지 관리 state **/
  const [content, setContent] = useState<string>("");
  const [page, setPage] = useState(0);
  const pageSize = 1000;
  /** 배경 편지지 이미지 로드 여부 관리 state **/
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  /** 개별 편지 정보 관리 recoil **/
  const [individualLetterInfo, setIndividualLetterInfo] = useRecoilState(
    individualLetterState
  );
  /** 편지 탭 관리 recoil **/
  const [, setTab] = useRecoilState(tabState);
  /** 로딩 상태 관리 recoil **/
  const setLoadingState = useSetRecoilState(loadingState);

  /** 편지 삭제 버튼 클릭 시 실행 함수 */
  const openConfirmModal = () => {
    const params = new URLSearchParams(searchParams);
    params.set("confirm", "true");

    router.push(`${pathname}?${params.toString()}`);
  };

  /** 모달창 닫기 버튼 함수 */
  const closeModal = useCallback(() => {
    setIndividualLetterInfo({
      id: -9999,
      toUserNickname: "",
      letterContent: "",
      fromUserNickname: "",
      onDelete: false,
      tab: "received",
    });
    router.back();
  }, []);

  /** 모달창 외부 클릭시 반응을 위한 함수 */
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    },
    [closeModal]
  );

  /** 편지 내용 무한 스크롤 적용을 위한 함수 */
  const loadMoreContent = useCallback(
    (pageNum: number) => {
      const start = pageNum * pageSize;
      const end = start + pageSize;
      const newContent = individualLetterInfo.letterContent.slice(start, end);
      setContent((prevContent) => prevContent + newContent);
    },
    [individualLetterInfo.letterContent]
  );

  /** 스크롤 이벤트 핸들러 */
  const handleScroll = useThrottle(() => {
    if (textareaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = textareaRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        const nextPage = page + 1;
        loadMoreContent(nextPage);
        setPage(nextPage);
      }
    }
  }, 100);

  /** 편지 내용 및 무한 스크롤 초기화 */
  useEffect(() => {
    setContent("");
    setPage(0);
    loadMoreContent(0);
  }, [individualLetterInfo.letterContent, loadMoreContent]);

  /** 스크롤 이벤트 핸들러 적용 */
  useEffect(() => {
    const currentRef = textareaRef.current;

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  /** 모달창 외부 클릭시 반응을 위한 함수 */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  /** 배경 편지지 이미지 로드 여부 관리 */
  useEffect(() => {
    setLoadingState(true);
    const img = new Image();
    img.src = "/images/letter_background.jpg";
    img.onload = () => {
      setIsImageLoaded(true);
      setLoadingState(false);
    };
  }, [setLoadingState]);

  return isImageLoaded ? (
    <LetterWrap ref={modalRef} $padding="10px" $width="700px">
      <BackButtonWrapper onClick={() => router.back()}>
        <IoMdArrowBack />
      </BackButtonWrapper>
      <CloseButton onClick={() => router.push("/")}>
        <IoMdClose />
      </CloseButton>
      <PopupInner>
        <ToInputWrapper>
          <ToInput>{`To. ${individualLetterInfo.toUserNickname}`}</ToInput>
        </ToInputWrapper>
        <StyledTextarea
          value={content}
          ref={textareaRef}
          placeholder="Write your letter here..."
          spellCheck={false}
          readOnly
          onFocus={(e) => e.target.blur()} // 클릭해도 커서 깜빡거리지 않도록
          style={{ cursor: "default" }} // 마우스 커서를 기본 모양으로
        />
      </PopupInner>
      <FromText>From. {individualLetterInfo.fromUserNickname}</FromText>
      {individualLetterInfo.onDelete && (
        <DeleteButton onClick={() => openConfirmModal}>
          <FaTrash />
        </DeleteButton>
      )}
      {confirm === "true" && (
        <DeleteConfirmContents
          mailIds={[individualLetterInfo.id]}
          onClose={() => {
            const params = new URLSearchParams(searchParams);
            params.delete("confirm");
            router.push(
              `${pathname}${params.toString() ? `?${params.toString()}` : ""}`
            );
          }}
          type={individualLetterInfo.tab}
        />
      )}
    </LetterWrap>
  ) : null;
};

const LetterWrap = styled(MainBox)`
  background: url("/images/letter_background.jpg") no-repeat center center;
  background-size: contain;
  z-index: 1000;
  max-height: 700px;
  display: block;
  background-size: cover;

  @media (min-height: 501px) and (max-height: 800px) {
    width: 500px;
    height: 500px;
    background-size: cover;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    height: 700px;
    background-size: cover;
  }
`;

const PopupInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  /* width: 87%; */
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  margin: auto;
  box-sizing: border-box;

  // height @mediaquery
  @media (min-height: 501px) and (max-height: 800px) {
    height: 500px;
    padding: 20px 30px;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    padding: 30px 44px;
    height: 800px;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 582px;
  border: none;
  background: transparent;
  font-family: "Handwriting", sans-serif;
  font-size: 16px;
  outline: none;
  resize: none;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #9f9696;
    border-radius: 6px;
  }
  white-space: pre-wrap;
  line-height: 34.5px;

  // height @mediaquery
  @media (min-height: 501px) and (max-height: 800px) {
    font-size: 14px;
    line-height: 24.5px;
    height: 412px;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    font-size: 16px;
    line-height: 34.5px;
    height: 586px;
  }
`;

const ToInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ToInput = styled.div`
  font-family: "Handwriting", sans-serif;
  font-size: 16px;

  // height @mediaquery
  @media (min-height: 501px) and (max-height: 800px) {
    font-size: 16px;
  }

  @media (min-height: 801px) and (max-height: 1280px) {
    font-size: 18px;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 24px;
  padding: 0;

  &:hover {
    color: #5f0202;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 24px;
  padding: 0;

  &:hover {
    color: #ff0000;
  }
`;

const FromText = styled.div`
  position: absolute;
  bottom: 29px;
  right: 67px;
  font-family: "Handwriting", sans-serif;
  font-size: 18px;
`;

const BackButtonWrapper = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 3px 3px;
`;
const BackIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export default IndividualLetterContents;
