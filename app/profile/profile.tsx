import Image from "next/image";
import userimg from "../../public/images/user.jpg";
import Link from "next/link";
import { UserTypes } from "../types/userTypes";

type ProfileProps = {
  userInfo: UserTypes | undefined;
};
export const Profile = (props: ProfileProps) => {
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
                <div className="text-sm text-center">0</div>
              </div>
              <Link href="/profile/follow">
                <div className="mr-4">
                  <div className="text-sm">Followers</div>
                  <div className="text-sm text-center">21.6K</div>
                </div>
              </Link>
              <Link href="/profile/follow">
                <div className="mr-4">
                  <div className="text-sm">Following</div>
                  <div className="text-sm text-center">0</div>
                </div>
              </Link>
            </div>
            <Link href="/profile/edit">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 w-44 h-8 text-sm bg-amber-200">
                Edit
              </button>
            </Link>
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
