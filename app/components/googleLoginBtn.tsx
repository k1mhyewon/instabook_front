import Link from "next/link";
import googleLoginBtn from "../../public/images/util/googleLoginBtn.png";
import Image from "next/image";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

export const GoogleBtn = () => {
  // const clientId = process.env.GOOGLE_CLIENT_ID;
  // //   const { handleSuccess } = useGoogleAuthentication()
  // const goGoogleLogin = () => {
  //   axios
  //     .get(`http://localhost:3000/api/google`, {})
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <>
      <Link href="/api/google">
        <Image src={googleLoginBtn} alt="googleBtn" className="w-48 h-10" />
      </Link>
    </>
  );
};
