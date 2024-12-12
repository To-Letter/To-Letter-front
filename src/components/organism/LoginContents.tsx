import React, { ChangeEvent, useState } from "react";

import InputForm from "../molecules/InputForm";
import Button from "../atoms/Button";
import { Text } from "../atoms/Text";
import { MainBox, SectionBox } from "../atoms/Box";

interface loginFormI {
  email: string;
  password: string;
}

export default function LoginContents() {
  const [loginForm, setLoginForm] = useState<loginFormI>({
    email: "",
    password: "",
  });

  const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <MainBox $direction="column" $alignItems="flex-start" $width="100%">
      <SectionBox $direction="column" $width="100%" $margin="24px 0">
        <InputForm
          keyValue="inputform-email"
          labelTitle="Email"
          name="email"
          type="text"
          onChange={onChangeFormHdr}
          isExistButton={false}
        />
        <InputForm
          keyValue="inputform-password"
          labelTitle="Password"
          name="password"
          type="password"
          onChange={onChangeFormHdr}
          isExistButton={false}
        />
      </SectionBox>

      <SectionBox $direction="column" $width="100%">
        <Button
          title="Login"
          onClick={() => {}}
          $padding="8px 0"
          $margin="0 0 16px 0"
        />
        <Button title="카카오톡 로그인" onClick={() => {}} $padding="8px 0" />
      </SectionBox>

      <SectionBox
        $direction="column"
        $alignItems="flex-end"
        $width="100%"
        $margin=" 8px 0 0 0"
      >
        <Text
          $color="#e9e9e9"
          $fontSize="16px"
          $isClickAble={true}
        >{`can't login?`}</Text>
      </SectionBox>
    </MainBox>
  );
}

// import React, { ChangeEvent, useState } from "react";
// import ModalBox from "../atoms/ModalBox";
// import { HeaderBox, MainBox, NavBox, SectionBox } from "../atoms/Box";
// import Tab from "../atoms/Tab";
// import Link from "next/link";
// import InputForm from "../molecules/InputForm";
// import Button from "../atoms/Button";
// import { Text } from "../atoms/Text";

// interface loginFormI {
//   email: string;
//   password: string;
// }

// export default function Login() {
//   const [loginForm, setLoginForm] = useState<loginFormI>({
//     email: "",
//     password: "",
//   });

//   const onChangeFormHdr = (e: ChangeEvent<HTMLInputElement>) => {
//     setLoginForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <ModalBox
//       $width="400px"
//       $padding="24px 40px 20px 40px"
//       $direction="column"
//       $alignItems="flex-start;"
//     >
//       {/* 차후 auth의 layout.tsx로 분리 / active 도메인에서 값 얻어와 처리 */}
//       <HeaderBox>
//         <NavBox>
//     <Tab
//     key="authTab-Login"
//     TabTitle="Login"
//     tabOption="underline"
//     onClick={() => router.push("/auth/login")}
//     $fontWeight="bold"
//     $padding="0 2px 4px 0;"
//     $margin="0 24px 0 0"
//     $active={pathname === "/auth/login"}
//   />
//   <Tab
//     key="authTab-Signup"
//     TabTitle="Signup"
//     tabOption="underline"
//     onClick={() => router.push("/auth/signup")}
//     $fontWeight="bold"
//     $padding="0 2px 4px 2px;"
//     $active={pathname === "/auth/signup"}
//   />
// </NavBox>
//       </HeaderBox>
//       <MainBox $direction="column" $alignItems="flex-start" $width="100%">
//         <SectionBox $direction="column" $width="100%" $margin="24px 0">
//           <InputForm
//             key="inputform-email"
//             labelTitle="Email"
//             name="email"
//             type="text"
//             onChange={onChangeFormHdr}
//             isExistButton={false}
//           />
//           <InputForm
//             key="inputform-email"
//             labelTitle="Password"
//             name="password"
//             type="password"
//             onChange={onChangeFormHdr}
//             isExistButton={false}
//           />
//         </SectionBox>

//         <SectionBox $direction="column" $width="100%">
//           <Button
//             title="Login"
//             onClick={() => {}}
//             $padding="8px 0"
//             $margin="0 0 16px 0"
//           />
//           <Button title="카카오톡 로그인" onClick={() => {}} $padding="8px 0" />
//         </SectionBox>

//         <SectionBox
//           $direction="column"
//           $alignItems="flex-end"
//           $width="100%"
//           $margin=" 8px 0 0 0"
//         >
//           <Text
//             $color="#e9e9e9"
//             $fontSize="16px"
//             $isClickAble={true}
//           >{`can't login?`}</Text>
//         </SectionBox>
//       </MainBox>
//     </ModalBox>
//   );
// }
