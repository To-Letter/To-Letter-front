interface guideValueI {
  imgSrc: string;
  imgAlt: string;
  guideHeader: string;
  guideSubtitle: string | null;
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
    imgSrc: "/images/guide/toLetterLogo.webp",
    guideHeader: "Team.To-Letter",
    guideSubtitle: "온라인을 통해 만나는 아날로그한 편지, To Letter 입니다.",
    guideContents: `• 가상의 나의 방에서 편지를 주고 받을 수 있어요. 
      • 내가 설정해둔 우편함 위치를 기준으로 편지가 도착하는 시간이
      ㅤ(최소하루~5일) 정해져요.
      • 나의 편지 주소를 카카오톡으로 공유할 수 있어요.
      • 로그인시 새로 도착한 편지 알림을 받을 수 있어요
      

      [주의 사항]
      1. ToLetter는 pc web 환경에서의 사용을 권장하고 있어요.
      2. 오류 제보 메일은 wodbs5602@naver.com, tamd5971@gmail.com, 
      ㅤtest110011@gmail.com입니다! 
      3. 오른쪽 → 버튼을 눌러 사이트 이용 안내를 확인할 수 있어요.
      4. 오른쪽 하단 스타트 버튼을 눌러서 시작할 수 있어요.
      ㅤ(로딩이 완료되지 않으면 누를 수 없어요!)`,
  },
  {
    imgAlt: "room-desk-chair",
    imgSrc: "/images/guide/roomDesk.webp",
    guideHeader: "[Guest] 로그인, 회원가입",
    guideSubtitle: null,
    guideContents:
      "책상 앞 의자를 클릭하여 계정을 만들고 로그인을 할 수 있어요.",
  },
  {
    imgAlt: "room-bed",
    imgSrc: "/images/guide/roomBed.webp",
    guideHeader: "[User] 마이페이지",
    guideSubtitle: null,
    guideContents: `책상 왼쪽으로 시점을 돌린 후 침대를 클릭하여 마이페이지에 들어갈 수 있어요.\n
      마이페이지에서는 내 정보를 수정하거나, 비밀번호 변경(카카오 로그인이 아닐 경우), 회원 탈퇴 기능을 지원해요.`,
  },
  {
    imgAlt: "room-desk",
    imgSrc: "/images/guide/roomDeskUser.webp",
    guideHeader: "[User] 편지함, 편지 쓰기, 내 편지 주소 공유",
    guideSubtitle: null,
    guideContents: `책상 위 오른쪽 "연필꽂이"를 클릭하여 편지를 작성할 수 있어요(상대방의 편지 주소를 알고 있어야 해요).\n
      책상 중간 "책"을 클릭하여 받은 편지 목록과 보낸 편지 목록을 확인할 수 있어요(개별 편지 열람이 가능해요).\n
      책상 위 랙에 걸려 있는 사진 중 "밤" 사진을 클릭하여 내 편지 주소를 타인에게 공유할 수 있어요.`,
  },
  {
    imgAlt: "room-Trash",
    imgSrc: "/images/guide/roomTrash.webp",
    guideSubtitle: null,
    guideHeader: "[User] 편지 삭제",
    guideContents: `책상 오른쪽에 위치한 쓰레기통을 클릭하여, 받은 편지와 보낸 편지를 삭제할 수 있어요.`,
  },
];
