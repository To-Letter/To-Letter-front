// types/letter.ts 또는 components/organisms/letter/types.ts
export interface Mail {
  id: number;
  sender: string;
  subject: string;
  timeReceived: string;
  viewCheck?: boolean; // optional로 변경
}
