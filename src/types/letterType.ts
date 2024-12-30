/**
 * 편지 데이터 타입
 */
export interface Mail {
  id: number;
  sender: string;
  subject: string;
  timeReceived: string;
  viewCheck?: boolean; // optional로 변경
}
