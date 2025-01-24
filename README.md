<div align="center">

  
  <h2>:envelope:온라인을 통해 만나는 아날로그한 편지:mailbox_with_mail:</h2>

  <a href="https://www.toletter.co.kr" style="text-decoration: none; display:none"><img src="https://github.com/user-attachments/assets/1b013684-0d35-412a-af2e-60b492be235b" alt="To.Letter Logo" width="200"></a>
  <h3>Welcome To TO.LETTER!</h3>

  [![Visit](https://img.shields.io/badge/VISIT-TO.LETTER-FF4154?style=for-the-badge&logoColor=white)](https://www.toletter.co.kr)
  [![Stars](https://img.shields.io/github/stars/To-Letter/To-Letter-front?style=for-the-badge&color=ffd93b)](https://github.com/To-Letter/To-Letter-front/stargazers)

  <p>
    <a href="https://www.toletter.co.kr">
      <img src="https://img.shields.io/badge/Website-toletter.co.kr-blue?style=flat-square" alt="Website"/>
    </a>
  </p>
</div>

## ✨ 주요 기능

- **3D 가상 편지함** - Three.js를 통해 나만의 방에서 편지를 주고 받을 수 있어요
- **시간차 배달** - 설정한 우편함 위치에 따라 편지 도착 시간이 달라져요
- **편지 공유** - 나의 편지 주소를 카카오톡으로 공유할 수 있어요
- **실시간 알림** - 로그인 시 새로 도착한 편지 알림을 받을 수 있어요

<br/>

## :gift: 서비스 소개 :gift:

### 1. 팀원 구성

- 재윤(front)
- 유정(back)
- 윤미(front)

### 2. 개발 환경

- **프론트엔드**: 
  - React → Next.js (React 기반 프레임워크)
  - TypeScript
- **버전 및 이슈관리**: 
  - Github
  - Github Issues
  - Github Project
- **서비스 배포 환경**: 
  - Vercel (Next.js 공식 배포 플랫폼)
  - Github Actions
- **협업 툴**: 
  - [Github Wiki](https://github.com/To-Letter/To-Letter-front/wiki)

> 💡 **Note**: React에서 Next.js로 마이그레이션을 통해 서버 사이드 렌더링(SSR)을 적용하여 SEO(검색 엔진 최적화) 성능을 크게 개선했습니다. 이를 통해 검색 엔진에서의 웹사이트 노출도를 향상시켰습니다.

### 3. 사용 기술

- **3D 그래픽스**
  - React Three Fiber (R3F)
  - Three.js
  - 선언적인 방식으로 3D 씬 구성 및 관리
  - 실시간 3D 인터랙션 구현

- **상태 관리 & 네트워크**
  - Recoil: 전역 상태 관리
  - Axios: 인터셉터를 통한 요청/응답 핸들링
  - Event Source Polyfill: 실시간 서버 이벤트 수신 지원

- **스타일링**
  - Styled Components: CSS-in-JS 라이브러리로 컴포넌트 기반 스타일링
  - Tailwind CSS: Next.js 서버 컴포넌트 UI 스타일링

> 💡 **Note**: Three.js와 React Three Fiber를 활용하여 3D 가상 공간을 구현하고, 실시간 이벤트 처리를 위한 SSE(Server-Sent Events)를 도입했습니다. 또한 서버 컴포넌트와 클라이언트 컴포넌트에 각각 최적화된 스타일링 솔루션을 적용했습니다.

<br/>

## :pushpin: version 1 summery :pushpin:

|1. 가이드 페이지|설명|
|------|:------|
|<img src="https://github.com/user-attachments/assets/b43036a4-5b70-424b-b899-f1b248602a31" width="500" height="280">|첫 시작 페이지<br/>- To.Letter를 이용하기 위한 안내사항 및 사용법이 담겨있는 페이지입니다.<br/>- 양쪽에 슬라이드 버튼을 이용해서 안내사항과 사용법을 익혀주세요!<br/>- 접속 후 오른쪽 하단의 %가 100이 되면 start버튼을클릭하여 이용하시면 됩니다.| <br/>

|2. 기본 배경(로그인 전)|설명|
|------|:------|
|<img src="https://github.com/user-attachments/assets/d108733e-9b9d-47a8-b190-0bcc18109ea3" width="560" height="280">|로그인 전 기본 화면<br/>- 로그인 하기 전 기본 화면입니다. 아직 로그인 하지 않았기 때문에 시점을 움직일 수 없어요.<br/>| <br/>

|3. 기본 배경|설명|
|------|:------|
|<img src="https://github.com/user-attachments/assets/f9147aa3-f697-4c92-a7cc-0bdd8fc77963">| 방(침대, 책상, 의자, 서랍, 캘린더, 벽걸이 랙, 창문, 커튼 등)야외 풍경(계절 별, 시간대 별, 날씨 별) |

### 2. 로그인/회원가입 - 의자

- 일반 로그인/회원가입
- 소셜(카카오) 로그인/회원가입
- 일반 로그인 유저 비밀번호 찾기

### 3. 마이 페이지 모달 - 침대

- 내 정보 확인 및 수정
- 비밀번호 변경
- 로그아웃 및 회원탈퇴

### 4. 편지/송수신 - 책상 위 연필꽂이

- 설정 우편함 위치 기준 도착 시간 설정
- 편지 주소 공유 기능

### 5. 나의 편지함(보낸/받은 편지) - 책상 위 책장

### 6. 편지 삭제 - 책상 오른쪽 쓰레기통

### 7. 편지 도착 알림 - (발생 시)책상 위 편지봉투 더미 등장

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


<div align="center">
<h1> :envelope:온라인을 통해 만나는 아날로그한 편지:mailbox_with_mail: </h1>

<a href="https://www.toletter.co.kr" target="_blank" style="text-decoration: none; display:none"><img src="https://github.com/user-attachments/assets/14ffa9e7-3718-4af8-8935-d8ea6a63dcd0" alt="To.Letter Logo" width="600"></a>

  <h3>Welcome To TO.LETTER</h3>
  <div>가상의 방에서 소중한 사람에게 편지를 부쳐보세요!</div>
  <br/>
  
[![Visit](https://img.shields.io/badge/VISIT-TO.LETTER-FF4154?style=for-the-badge&logoColor=white)](https://www.toletter.co.kr)
</div>

## ✨ 주요 기능

- **3D 가상 편지함** - Three.js를 통해 만들어진 나만의 방에서 편지를 주고 받을 수 있어요
- **시간차 배달** - 설정한 우편함 위치에 따라 편지 도착 시간이 달라져요
- **편지 공유** - 나의 편지 주소를 카카오톡으로 공유할 수 있어요
- **실시간 알림** - 로그인 시 새로 도착한 편지 알림을 받을 수 있어요

<br/>

## :pushpin: version 1 summery
<details>
 <summary><h4>1. 가이드 페이지 - 인덱스 페이지 접근 시 리다이렉트</h4> </summary>
<table >
    <tr>
        <td ><img src="https://github.com/user-attachments/assets/74430186-5db8-4d5e-9d40-6aa842f7eadf" width="760"/></td>
        <td>• To.Letter를 이용하기 위한 <br/>&nbsp&nbsp안내사항 및 사용법 <br/><br/>• 모델 다운로드 완료 시<br/>&nbsp&nbspstart 버튼 활성화</td>
    </tr>
</table>
</details>

<details>
 <summary><h4>2. 로그인 / 회원가입 - 의자</h4></summary>
<table >
    <tr>
        <td><img src="https://github.com/user-attachments/assets/d108733e-9b9d-47a8-b190-0bcc18109ea3" width="560" height="272"></td>
        <td ><img src="https://github.com/user-attachments/assets/76ed7c00-b92b-4bb1-bbbe-a9da9076e355" width="300"> </td>
        <td><img src="https://github.com/user-attachments/assets/7ef5266b-c664-4768-9ce9-fe46518608b7" width="300"></td>
    </tr>
   <tr>
        <td>• 로그인 전 기본 화면 <br/>• 시점 이동 불가</td>
        <td>• (로컬)이메일 인증 미실시 계정<br/>&nbsp&nbsp&nbsp-> 이메일 인증 화면 이동<br/>• 비밀번호 변경 기능 지원</td>
        <td>• 로컬/카카오 회원가입 지원<br/>• 로컬 유저->이메일 인증<br/>• 주소 입력 기능</td>
    </tr>
</table>
</details>
  
<details>
 <summary><h4>3. 기본 배경</h4></summary>
<table >
    <tr>
        <td ><img src="https://github.com/user-attachments/assets/f9147aa3-f697-4c92-a7cc-0bdd8fc77963" width="760"/></td>
        <td>• 방(침대, 책상, 의자, 서랍, 캘린더, 벽걸이 랙, 창문, 커튼 등)<br/>• 야외 풍경(계절 별, 시간대 별, 날씨 별)</td>
    </tr>
</table>
</details>

<details>
 <summary><h4>4. 마이 페이지 모달 - 침대</h4> </summary>
<table >
    <tr>
        <td ><img src="https://github.com/user-attachments/assets/949ad9e7-5111-4494-b511-fd09bc0724ef" width="310"/></td>
        <td ><img src="https://github.com/user-attachments/assets/ea2550e6-690e-4531-a3be-5487b69fe44c" width="310"/></td>
        <td ><img src="https://github.com/user-attachments/assets/ea2550e6-690e-4531-a3be-5487b69fe44c" width="310"/></td>
    </tr>
  <tr>
        <td>• 내 정보 확인 및 수정/로그아웃</td>
        <td>• 이메일 인증 후 비밀번호 변경</td>
        <td>• 회원탈퇴가 들어갈 예정</td>
    </tr>
</table>
</details>


<details>
 <summary><h4>5. 편지/송수신 - 책상 위 연필꽂이</h4> </summary>

<table >
    <tr>
        <td> 편지 보내는 과정</td>
        <td>공유 결과</td>
    </tr>
    <tr>
        <td>• 수신자 존재 확인 <br/>• 편지 작성<br/>• 보낸 편지함 저장 여부 선택<br>• 설정 우편함 위치 기준 도착 시간 설정</td>
        <td>• 편지 주소 공유 기능</td>
    </tr>
</table>
</details>

<details>
 <summary><h4>6. 나의 편지함(보낸/받은 편지) - 책상 위 책장</h4> </summary>
<table >
    <tr>
        <td></td>
        <td>보낸, 받은 편지, 무한스크롤 적용</td>
    </tr>
</table>
</details>

<details>
 <summary><h4>7. 편지 삭제 - 책상 오른쪽 쓰레기통</h4> </summary>
<table >
  <tr>
        <td>개별 삭제</td>
        <td>목록 선택 삭제</td>
    </tr>
    <tr>
        <td> 개별 삭제</td>
        <td>목록 선택 삭제</td>
    </tr>
</table>
</details>

<details>
 <summary><h4>8. 편지 도착 알림 - (발생 시)책상 위 편지봉투 더미 등장</h4> </summary>
<table >
    <tr>
        <td ><img src="https://github.com/user-attachments/assets/4191709a-018a-466b-825b-f22df979b3af" width="760"/></td>
        <td>• 새로운 편지 알람</td>
    </tr>
</table>
</details>


<br/>

## :gift: 서비스 소개

### 1. 개발 환경

- **프론트엔드**: 
    + TypeScript
    + React → Next.js (React 기반 프레임워크) <br/>
    
         > 💡 **Note** <br/>
         > React에서 Next.js로 마이그레이션을 통해 서버 사이드 렌더링(SSR)을 적용하여 SEO(검색 엔진 최적화) 성능을 크게 개선했습니다. 이를 통해 검색 엔진에서의 웹사이트 노출도를 향상시켰습니다.
         
- **버전 및 이슈관리**: 
    - Github
    - Github Issues
    - Github Project
      
- **서비스 배포 환경**: 
    - Vercel (Next.js 공식 배포 플랫폼)
    - Github Actions
      
- **협업 툴**: 
    - [Github Wiki](https://github.com/To-Letter/To-Letter-front/wiki)


<br/>

### 2. 사용 기술


- **3D 그래픽스**
  - React Three Fiber (R3F), Three.js: 선언적인 방식으로 3D 씬 구성 및 관리 및 실시간 3D 인터랙션 구현

- **상태 관리 & 네트워크**
  - Recoil: 전역 상태 관리
  - Axios: 인터셉터를 통한 요청/응답 핸들링
  - Event Source Polyfill: 실시간 서버 이벤트 수신 지원

- **스타일링**
  - Styled Components: CSS-in-JS 라이브러리로 컴포넌트 기반 스타일링
  - Tailwind CSS: Next.js 서버 컴포넌트 UI 스타일링

> 💡 **Note** <br/>
> Three.js와 React Three Fiber를 활용하여 3D 가상 공간을 구현하고, 실시간 이벤트 처리를 위한 SSE(Server-Sent Events)를 도입했습니다. <br/> 또한 서버 컴포넌트와 클라이언트 컴포넌트에 각각 최적화된 스타일링 솔루션을 적용했습니다.

<br/>

### 3. 팀원 구성
<table>
  <tr>
    <td colspan="2" align="center"><strong>Front-end</strong></td>
    <td align="center"><strong>Back-end</strong></td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/kimjeyoun">
        <img src="https://avatars.githubusercontent.com/u/63177849?v=4" width="160px;" alt=""/><br />
        <sub>
          <b>김재윤</b>
        </sub>
      </a><br />
    </td>
    <td align="center">
      <a href="https://github.com/JeongYunMi">
        <img src="https://avatars.githubusercontent.com/u/50102538?s=96&v=4" width="160px;" alt=""/><br />
        <sub>
          <b>정윤미</b>
        </sub>
      </a><br />
    </td>
    <td align="center">
      <a href="https://github.com/ovo1234">
        <img src="https://avatars.githubusercontent.com/u/79007447?v=4" width="160px;" alt=""/>
        <br />
        <sub>
          <b>이유정</b>
        </sub>
      </a><br />
    </td>
  </tr>
  <tr>
    <td rowspan="1" align="center">
      <a href="https://github.com/To-Letter/To-Letter-front/issues?q=is%3Aissue%20assignee%3Akimjeyoun" title="Code">issues</a>
    </td>
    <td rowspan="1" align="center">
      <a href="https://github.com/To-Letter/To-Letter-front/issues?q=is%3Aissue%20assignee%3AJeongYunMi%20" title="Code">issues</a>
    </td>
    <td rowspan="1" align="center">
      <a href="https://github.com/To-Letter/To-Letter-back" title="Code">To. Letter backend</a>
    </td>
  </tr>
</table>

<br/>

