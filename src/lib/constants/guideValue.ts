interface guideValueI {
  imgSrc: string;
  imgAlt: string;
  guideHeader: string;
  guideContents: string;
}

/**
 * @imgSrc 이미지 경로
 * @imgAlt 이미지 텍스트
 * @guideHeader 지원 기능 제목
 * @guideContents 지원하는 내용
 */
export const guideValue: guideValueI[] = [
  {
    imgAlt: "room-desk-chair",
    imgSrc: "/images/guide/roomDesk.png",
    guideHeader: "[Guest] 로그인, 회원가입",
    guideContents:
      "책상 앞 의자를 클릭하여 계정을 만들고 로그인을 할 수 있어요.",
  },
  {
    imgAlt: "room-bed",
    imgSrc: "/images/guide/roomBed.png",
    guideHeader: "[User] 마이페이지",
    guideContents: `책상 왼쪽으로 시점을 돌린 후 침대를 클릭하여 마이페이지에 들어갈 수 있어요.\n
      마이페이지에서는 내 정보를 수정하거나, 비밀번호 변경(카카오 로그인이 아닐 경우), 회원 탈퇴 기능을 지원해요.`,
  },
  {
    imgAlt: "room-desk",
    imgSrc: "/images/guide/roomDeskUser.png",
    guideHeader: "[User] 편지함, 편지 쓰기, 내 편지 주소 공유",
    guideContents: `책상 위 오른쪽 연필꽂이를 클릭하여 편지를 작성할 수 있어요(상대방의 편지 주소를 알고 있어야 해요.).\n
      책상 중간 책을 클릭하여 받은 편지 목록과 보낸 편지 목록을 확인할 수 있어요(개별 편지 열람이 가능해요.).\n
      책상 위 랙에 걸려 있는 사진 중 [밤] 사진을 클릭하여 내 편지 주소를 타인에게 공유할 수 있어요.`,
  },
  {
    imgAlt: "room-Trash",
    imgSrc: "/images/guide/roomTrash.png",
    guideHeader: "[User] 편지 삭제",
    guideContents: `책상 오른쪽에 위치한 쓰레기통을 클릭하여, 받은 편지와 보낸 편지를 삭제할 수 있어요.`,
  },
];
