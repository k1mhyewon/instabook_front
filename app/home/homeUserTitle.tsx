import Image from "next/image";
import userimg from "../../public/images/user.jpg";
import { UserWithFollowType } from "../types/userTypes";
import Link from "next/link";
import { PostType } from "../types/postTypes";

type UserTitleProps = {
  // post: PostType;
  userName: string | undefined;
  userId: number | undefined | string;
  profilePhoto: string | undefined;
};
export const HomeUserTitle = (props: UserTitleProps) => {
  return (
    <>
      <Link href={`profile/${props.userId}`}>
        <div className="ml-2 mt-3 flex items-center">
          <div className="mr-2">
            <Image
              src={userimg}
              alt="user"
              className="w-8 h-8 object-cover rounded-full"
            />
          </div>
          <div>{props.userName}</div>
        </div>
      </Link>
    </>
  );
};
