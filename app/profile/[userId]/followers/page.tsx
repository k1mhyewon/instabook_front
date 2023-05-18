"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Follow } from "../../components/followers";

export default function FollowersPage({ params: { userId } }: Params) {
  // 팔로워 페이지

  return (
    <>
      <Follow thisPageIs="followers" userId={userId} />
    </>
  );
}
