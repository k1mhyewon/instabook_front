import kakaoLoginBtn from "../../public/images/util/kakao_login_btn.png";
import Image from "next/image";

export const KakaoLogin = () => {
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/kakao-callback",
    });
  }
  return (
    <>
      <button onClick={kakaoLogin}>
        <Image src={kakaoLoginBtn} alt="kakaoBtn" />
      </button>
    </>
  );
};
