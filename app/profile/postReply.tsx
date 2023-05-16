import { CommentType } from "../types/commentType";
import { ReplyUserTitle } from "./replyUserTitle";

type PostReplyProps = {
  comments: CommentType[] | undefined;
};
export const PostReply = (props: PostReplyProps) => {
  return (
    <>
      <ReplyUserTitle comments={props?.comments} />
    </>
  );
};
