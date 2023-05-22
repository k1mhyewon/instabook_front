"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function KakaoHome() {
  const [valid, setValid] = useState(false);
  //   const dispatch = useDispatch();

  const postCode = async (code: string) => {
    try {
      // 인가코드 서버로 보내주기
      console.log("code");
      console.log(code);
      const response = await axios.post(
        "http://localhost:3000/api/kakao-callback",
        null,
        {
          params: { authorizationCode: code },
        }
      );
      // const tokenResponse = await axios.post(
      //   `https://kauth.kakao.com/oauth/token`,
      //   {
      //     headers: {
      //       "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      //     },
      //     body: {
      //       grant_type: "authorization_code",
      //       client_id: process.env.KAKAO_REST_API_KEY,
      //       redirect_uri: process.env.KAKAO_REDIRECT_URI,
      //       code: KAKAO_CODE,
      //       client_secret: process.env.KAKAO_CLIENT_SECRET,
      //     },
      //   }
      // );
      // const accessToken = tokenResponse.data.access_token;
      console.log(response);

      // 서버에서 인가코드를 가지고 카카오에서 개인정보를 받아온 뒤, 응답값으로 회원가입 유무를 판단할 email을 보내준다.
      // const userEmail = response.data.success.kakao_account.email;
      // console.log(response.data.success);
      // // 회원가입 유무 판단
      // const checkUser = await apiInstance.post("/users/check/email", {
      //   email: userEmail,
      // });

      // 이미 있는 계정이라면 서버에서 액세스 토큰 받고 홈으로 이동한다.
      // if (checkUser.data.isEmailExisted) {
      //   try {
      //     const tokenResponse = await apiInstance.post("/auth", {
      //       email: userEmail,
      //     });
      //     const { accessToken } = tokenResponse.data;
      //     dispatch(setToken(accessToken));
      //     Router.replace("/");
      //     toast.success("로그인되었습니다!");
      //   } catch (e) {
      //     console.log(e.response);
      //   }
      // } else {
      //   console.error("error");
      //   toast.error("error");
      // }

      // 없는 계정이라면 회원정보 적을 Signupinfo 컴포넌트로 간다.
      setValid(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // code 추출부분
    const KAKAO_CODE = new URL(window.location.href).searchParams.get("code");
    console.log("KAKAO_CODE");
    console.log(KAKAO_CODE);
    if (KAKAO_CODE) {
      postCode(KAKAO_CODE);
    }
  }, []);

  // 성공하면 회원정보 적을 Signupinfo 컴포넌트로 가고, 실패하면 LoadingLogo에 머무른다.
  //   return <>{valid ? <Signupinfo /> : <LoadingLogo />}</>;
  return <>ㅎㅎ</>;
}
