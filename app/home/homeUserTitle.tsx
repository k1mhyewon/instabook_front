import Image from "next/image";
import userimg from "../../public/images/user.jpg";

type UserTitleProps = {
  userName: string | undefined;
  profilePhoto: string | undefined;
};
export const HomeUserTitle = (props: UserTitleProps) => {
  return (
    <>
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
    </>
  );
};
