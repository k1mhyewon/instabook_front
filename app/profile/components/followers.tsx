"use client";

import { HomeUserTitle } from "@/app/home/homeUserTitle";
import { UserWithFollowType } from "@/app/types/userTypes";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type FollowProps = {
  thisPageIs: string;
  userId: any;
};

export const Follow = (props: FollowProps) => {
  const [selected, setSelected] = useState(props.thisPageIs);

  const handleSelectFollowers = () => setSelected("followers");
  const handleSelectFollowing = () => setSelected("following");

  const [userInfo, setUserInfo] = useState<UserWithFollowType | undefined>();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/profile/${props.userId}/follows`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        const resUserInfo = response.data;
        console.log(resUserInfo);
        setUserInfo(resUserInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex justify-center">
          <Link href={`profile/${props.userId}/followers`}>
            <button
              className={`${
                selected === "followers" ? "bg-gray-300" : "bg-gray-100"
              } py-2 px-4 rounded-l-md`}
              onClick={handleSelectFollowers}
            >
              Followers
            </button>
          </Link>
          <Link href={`profile/${props.userId}/following`}>
            <button
              className={`${
                selected === "following" ? "bg-gray-300" : "bg-gray-100"
              } py-2 px-4 rounded-r-md`}
              onClick={handleSelectFollowing}
            >
              Following
            </button>
          </Link>
        </div>
        <div className="ml-8 mr-8">
          <h2 className="text-lg font-bold mt-6 mb-4">All {selected}</h2>
          <hr />
          {/* {  props.userInfo?..map((post, i) => ())} */}
          {/* <HomeUserTitle userInfo={userInfo} /> */}
          {selected === "followers" && (
            <>
              {userInfo?.followTo.map((follower, i) => (
                <HomeUserTitle
                  userName={follower.userFollowFrom.userName}
                  userId={follower.userFollowFrom.id}
                  profilePhoto={follower.userFollowFrom.profilePhoto}
                  key={i}
                />
              ))}
            </>
          )}
          {selected === "following" && (
            <>
              {userInfo?.followFrom.map((follower, i) => (
                <HomeUserTitle
                  userName={follower.userFollowTo.userName}
                  userId={follower.userFollowTo.id}
                  profilePhoto={follower.userFollowTo.profilePhoto}
                  key={i}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
