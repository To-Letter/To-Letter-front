import { useEffect, useRef, useState } from "react";
import { AUTH_KEY as baseUrl } from "@/constants/authkey";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useSetRecoilState } from "recoil";
import ToastMessage from "./atoms/ToastMessage";
import { newLetterAlarmState } from "@/store/recoil/letterAtom";
import axiosInterceptor from "@/lib/api/axiosInterceptor";

/**
 * EventSourcePolyfill 라이브러리를 통한 SSE 통신 연결
 */
export const NewLetterAlarmMessage = () => {
  const setNewLetterAlarm = useSetRecoilState(newLetterAlarmState);
  const eventSource = useRef<EventSourcePolyfill | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const sseEventSourceFetch = () => {
    const token: string =
      axiosInterceptor.defaults.headers.common["Authorization"] !== undefined
        ? (axiosInterceptor.defaults.headers.common["Authorization"] as string)
        : "";
    eventSource.current = new EventSourcePolyfill(
      `${baseUrl.apiUrl}/alarm/connect`,
      {
        headers: {
          Authorization: token,
          refreshToken: axiosInterceptor.defaults.headers.common[
            "refreshToken"
          ] as string,
        },
      }
    );
    console.log("SSE 통신 연결: ", eventSource.current);
    // 새로운 알림 이벤트 처리
    eventSource.current.addEventListener("new_thread", () => {
      setNewLetterAlarm(true);
      console.log("새로운 알림!");
      setToast({ message: "새로운 편지가 도착했습니다!", visible: true });
      eventSource.current?.close(); // 알림 수신 후 연결 닫기
    });

    // 브라우저가 닫히거나 새로고침될 때 SSE 해제
    const handleBeforeUnload = () => {
      eventSource.current?.close();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    eventSource.current.onerror = async (el: any) => {
      console.log("SSE 통신 닫힘 ", eventSource.current);
      console.log("SSE 통신 닫힘 ", el);
      eventSource.current?.close();
      eventSource.current = null;
      if (
        axiosInterceptor.defaults.headers.common["Authorization"] !== undefined
      ) {
        sseEventSourceFetch();
      }
    };

    // Cleanup: 컴포넌트 언마운트 및 이벤트 리스너 제거
    return () => {
      eventSource.current?.close();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  };

  useEffect(() => {
    console.log("랜더링");
    // Access token이 없으면 SSE 연결하지 않음
    if (
      axiosInterceptor.defaults.headers.common["Authorization"] === undefined ||
      eventSource.current !== null
    ) {
      console.log("탈락!");
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
