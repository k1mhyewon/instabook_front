import { HomeUserTitle } from "../../home/homeUserTitle";
import { PostWriteForm } from "./postWriteForm";

export default function writePage() {
  return (
    <>
      <HomeUserTitle userName="userName" profilePhoto="profilePhoto" />

      <PostWriteForm />
    </>
  );
}
