import { useEffect, useRef, useState } from 'react';
import { AUTH_KEY as baseUrl } from "../../constants/authkey";
import sessionStorageService from '../../utils/sessionStorageService';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useSetRecoilState } from 'recoil';
import { newLetterAlarmState } from '../../recoil/newLetterPopupState';
import ToastMessage from '../ToastMessage';

/**
     * EventSourcePolyfill 라이브러리를 통한 SSE 통신 연결
     * @version 차후 백엔드 통신 구조 변경(세션 스토리지 토큰 저장 삭제)에 따른 대응 필요
     */
export const NewLetterAlarmMessage = () => {
  const setNewLetterAlarm = useSetRecoilState(newLetterAlarmState);
  const eventSource = useRef<EventSourcePolyfill|null>(null)
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const sseEventSourceFetch = ()=> {
      eventSource.current = new EventSourcePolyfill(
        `${baseUrl.apiUrl}/alarm/connect`,
        {
          headers: {
            Authorization: sessionStorageService.get('accessToken') || '',
          },
        },
      );
    console.log("SSE 통신 연결: ", eventSource.current)
      // 새로운 알림 이벤트 처리
      eventSource.current.addEventListener('new_thread', () => {
        setNewLetterAlarm(true);
        console.log("새로운 알림!")
        setToast({ message: "새로운 편지가 도착했습니다!", visible: true });
        eventSource.current?.close(); // 알림 수신 후 연결 닫기
      });

      // 브라우저가 닫히거나 새로고침될 때 SSE 해제
      const handleBeforeUnload = () => {
        eventSource.current?.close();
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      eventSource.current.onerror = async (el: any) => {     
      console.log("SSE 통신 닫힘 ", eventSource.current)
      console.log("SSE 통신 닫힘 ",el)
        eventSource.current?.close();   
      eventSource.current = null;
      if(!sessionStorageService.get('accessToken')){
        sseEventSourceFetch();
      }
      };


      // Cleanup: 컴포넌트 언마운트 및 이벤트 리스너 제거
      return () => {
        eventSource.current?.close();
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }

  useEffect(() => {
    console.log("랜더링")
    // Access token이 없으면 SSE 연결하지 않음
    if (!sessionStorageService.get('accessToken')||eventSource.current!==null) {
    console.log("탈락!")
      return;
    }

    sseEventSourceFetch();
    
  }, [setNewLetterAlarm]);

  // useEffect(()=>{},[toast])


  return (
    <>
      {toast.visible && (
        <ToastMessage
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </>
  );
};
