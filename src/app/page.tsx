"use client"; // Canvas와 Recoil을 사용하므로 필수

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRecoilValue } from "recoil";

import Scene from "../components/canvas/Scene"; // 경로 수정
import Index from "@/components/account/Index";
import MyPage from "@/components/myPage/MyPage";
import LetterPopup from "@/components/letter/LetterPopup";
import ToUserModal from "@/components/letter/ToUserModal";
import SendLetterModal from "@/components/letter/SendLetterModal";
import Mailbox from "@/components/letter/MailBox";
import IndividualLetterPopup from "@/components/letter/IndividualLetterPopup";
import ShareLetterBtn from "@/components/ShareLetterBtn";
import DeleteLetterModal from "@/components/letter/DeleteLetterModal";
import NewLetterModal from "@/components/letter/NewLetterModal";
import { PopupProvider } from "@/contexts/PopupContext";

// Recoil atoms import 경로 수정
import { accountModalState } from "@/store/atoms/accountAtom";
import { myPageModalState } from "@/store/atoms/myInfoAtom";
import {
  letterPopupState,
  sendLetterModalState,
  receiveLetterBoxModalState,
  individualLetterState,
} from "@/store/atoms/letterPopupAtom";
import { toUserNicknameModalState } from "@/store/atoms/toUserNicknameAtom";
import { shareLetterState } from "@/store/atoms/shareLetterAtom";
import { deleteLetterPopupState } from "@/store/atoms/deleteLetterPopupAtom";
import { newLetterPopupState } from "@/store/atoms/newLetterPopupState";

import axiosInterceptor from "@/lib/axios-client"; // 경로 수정

export default function Home() {
  const modalState = useRecoilValue(accountModalState);
  const mypageModalState = useRecoilValue(myPageModalState);
  const letterPopupModal = useRecoilValue(letterPopupState);
  const toUserNicknameModal = useRecoilValue(toUserNicknameModalState);
  const sendLetterModal = useRecoilValue(sendLetterModalState);
  const receiveLetterBoxModal = useRecoilValue(receiveLetterBoxModalState);
  const individualLetterPopup = useRecoilValue(individualLetterState);
  const shareLetterRecoilValue = useRecoilValue(shareLetterState);
  const deleteLetterPopup = useRecoilValue(deleteLetterPopupState);
  const newLetterPopup = useRecoilValue(newLetterPopupState);

  return (
    <main>
      <PopupProvider>
        <Canvas shadows>
          <Scene />
          {axiosInterceptor.defaults.headers.common["Authorization"] ===
            undefined && (
            <OrbitControls
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={1.396}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 4}
              enablePan={false}
              minDistance={3}
              maxDistance={3}
            />
          )}
          {axiosInterceptor.defaults.headers.common["Authorization"] !==
            undefined && (
            <OrbitControls
              minPolarAngle={Math.PI / 2.8}
              maxPolarAngle={1.396}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 4}
              enablePan={false}
              minDistance={2}
              maxDistance={2}
            />
          )}
        </Canvas>
        {modalState.isOpen && <Index />}
        {mypageModalState && <MyPage />}
        {toUserNicknameModal && <ToUserModal />}
        {letterPopupModal && <LetterPopup />}
        {sendLetterModal && <SendLetterModal />}
        {receiveLetterBoxModal && <Mailbox />}
        {individualLetterPopup.isOpen && <IndividualLetterPopup />}
        {shareLetterRecoilValue && <ShareLetterBtn />}
        {deleteLetterPopup && <DeleteLetterModal />}
        {newLetterPopup && <NewLetterModal />}
      </PopupProvider>
    </main>
  );
}
