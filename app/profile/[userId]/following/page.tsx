"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Follow } from "../../components/followers";

export default function FollowingPage({ params: { userId } }: Params) {
  // 팔로잉 페이지

  return (
    <>
      <Follow thisPageIs="following" userId={userId} />
    </>
  );
}
