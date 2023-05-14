import { Profile } from "./profile";
import { UserPost } from "./userPost";

export default function Home() {
  return (
    <>
      <Profile />
      <div className="max-h-[526px] overflow-y-auto">
        <UserPost />
        <UserPost />
      </div>
    </>
  );
}
