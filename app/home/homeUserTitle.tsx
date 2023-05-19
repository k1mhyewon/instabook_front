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
  const imagePath = "../../public/images/user.jpg";
  // console.log("dd");
  // console.log(props.userId);
  return (
    <>
      <Link href={`profile/${props.userId}`}>
        <div className="ml-2 mt-3 flex items-center">
          <div className="mr-2">
            {props.profilePhoto ? (
              <>
                <Image
                  src={require(`../../public/images/${props.profilePhoto}`)}
                  alt="user"
                  className="w-8 h-8 object-cover rounded-full"
                  width={30}
                  height={30}
                />
              </>
            ) : (
              <>
                <Image
                  src={require("../../public/images/userProfile.png")}
                  alt="user"
                  className="w-8 h-8 object-cover rounded-full"
                  width={30}
                  height={30}
                />
              </>
            )}
          </div>
          <div>{props.userName}</div>
        </div>
      </Link>
    </>
  );
};
