"use client";
import Image from "next/image";
import userimg from "../../public/images/user.jpg";
import Link from "next/link";
import { UserTypes, UserWithFollowType } from "../types/userTypes";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../userContextProvider";
import { useRouter } from "next/router";
import axios from "axios";

type ProfileProps = {
  userInfo: UserWithFollowType | undefined;
  postCnt: number;
  userId: string;
};

export const Profile = (props: ProfileProps) => {
  const usercontext = useContext<number | null>(UserContext);
  const userId: number | undefined = usercontext ?? undefined;
  const str_loginUserId = userId?.toString();

  const str_selectedUserId = props.userId;

  const thisProfileIsMe = useRef(false);
  if (str_loginUserId === str_selectedUserId) {
    thisProfileIsMe.current = true;
  }

  const imFollowingThis = useRef(false);

  props.userInfo?.followTo.map((user, i) => {
    if (user.followFrom.toString() === str_loginUserId) {
      imFollowingThis.current = true;
      return;
    } else {
      imFollowingThis.current = false;
    }
  });

  const goFollow = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/profile/goFollow/${str_loginUserId}/${str_selectedUserId}`,
        {}
      );
      console.log(response.data);

      alert("팔로우 성공");
    } catch (error) {
      alert("팔로우 실패");
      console.error(error);
    }
  };

  const goUnfollow = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/profile/goUnfollow/${str_loginUserId}/${str_selectedUserId}`,
        {}
      );
      console.log(response.data);

      alert("언팔 성공");
    } catch (error) {
      alert("언팔 실패");
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex mt-4">
          <div className="">
            <Image
              src={userimg}
              alt="user"
              className="w-32 h-32 ml-4 object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col ml-4 justify-center pl-4 mb-5">
            <div className="font-bold text-lg">{props.userInfo?.userName}</div>
            <div className="flex mt-4">
              <div className="mr-4">
                <div className="text-sm">Post</div>
                <div className="text-sm text-center">{props.postCnt}</div>
              </div>
              <Link href={`/profile/${str_selectedUserId}/followers`}>
                <div className="mr-4">
                  <div className="text-sm">Followers</div>
                  <div className="text-sm text-center">
                    {props.userInfo?.followTo.length}
                  </div>
                </div>
              </Link>
              <Link href={`/profile/${str_selectedUserId}/following`}>
                <div className="mr-4">
                  <div className="text-sm">Following</div>
                  <div className="text-sm text-center">
                    {props.userInfo?.followFrom.length}
                  </div>
                </div>
              </Link>
            </div>
            {thisProfileIsMe.current ? (
              <>
                <Link href={`/profile/${userId}/edit`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 w-44 h-8 text-sm bg-amber-200">
                    Edit
                  </button>
                </Link>
              </>
            ) : (
              <>
                {imFollowingThis.current ? (
                  <>
                    <button
                      className="px-4 py-2 bg-gray-400 text-white rounded-md mt-4 w-44 h-8 text-sm bg-amber-200"
                      onClick={goUnfollow}
                    >
                      Unfollow
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 w-44 h-8 text-sm bg-amber-200"
                      onClick={goFollow}
                    >
                      Follow
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-10/12 ml-6 mr-6">
          <div className="text-base font-semibold mb-2">
            {props.userInfo?.name}
          </div>
          <div className="text-sm">{props.userInfo?.userInfo}</div>
        </div>
      </div>
      <hr />
    </>
  );
};

// const usercontext = useContext<number | null>(UserContext);
// const userId = usercontext ?? "";

// const [userInfo, setUserInfo] = useState<UserTypes | undefined>();
// //MutableRefObject<string>

// // const userPosts: any = useRef("");
// const [userPosts, setUserPosts] = useState<PostType | undefined>();

// useEffect(() => {
//   // let userId: number | null = null;
//   // if (typeof window !== "undefined") {
//   //   const sessionData = sessionStorage.getItem("access-token");
//   //   if (sessionData) {
//   //     const token = JSON.parse(sessionData);

//   //     if (token) {
//   axios
//     .get(`http://localhost:3000/api/profile/${props.userId}`, {})
//     .then((response) => {
//       const resUserInfo = response.data;
//       setUserInfo(resUserInfo);
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//   axios
//     .get(`http://localhost:3000/api/profile/${props.userId}/posts`, {})
//     .then((response) => {
//       const resUserPosts = response.data;
//       setUserPosts(resUserPosts);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   //     }
//   //   }
//   // }
// }, []);

// console.log(userInfo);

// console.log(userPosts);

// const str_selectedUserId = location.pathname.split("/")[2];
// const router = useRouter();
// const { query } = router;
// const str_selectedUserId = query.userId;
// console.log(str_selectedUserId);
