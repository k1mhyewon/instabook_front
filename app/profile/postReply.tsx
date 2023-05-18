import { CommentType, CommentWithUserInfoType } from "../types/commentType";
import { ReplyUserTitle } from "./replyUserTitle";

type PostReplyProps = {
  commentArr: CommentWithUserInfoType[] | undefined;
  postId: string;
};
export const PostReply = (props: PostReplyProps) => {
  return (
    <>
      <ReplyUserTitle commentArr={props?.commentArr} postId={props.postId} />
    </>
  );
};
