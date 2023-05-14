"use client";

import { HomeUserTitle } from "@/app/home/homeUserTitle";
import { useState } from "react";

export const Follow = () => {
  const [selected, setSelected] = useState("followers");

  const handleSelectFollowers = () => setSelected("followers");
  const handleSelectFollowing = () => setSelected("following");

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex justify-center">
          <button
            className={`${
              selected === "followers" ? "bg-gray-300" : "bg-gray-100"
            } py-2 px-4 rounded-l-md`}
            onClick={handleSelectFollowers}
          >
            Followers
          </button>
          <button
            className={`${
              selected === "following" ? "bg-gray-300" : "bg-gray-100"
            } py-2 px-4 rounded-r-md`}
            onClick={handleSelectFollowing}
          >
            Following
          </button>
        </div>
        <div className="ml-8 mr-8">
          <h2 className="text-lg font-bold mt-6 mb-4">All {selected}</h2>
          <hr />
          <HomeUserTitle />
        </div>
      </div>
    </>
  );
};
