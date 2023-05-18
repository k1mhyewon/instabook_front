import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type PostTagsProps = {
  postId: string;
};

let tagNamesArr: string[];

export const PostTags = (props: PostTagsProps) => {
  const [tagNamesArr, setTagNamesArr] = useState<string[]>([]);

  const getTagNames = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/tags/${props.postId}`,
        {}
      );
      const tagNames = response.data.map((item: any) => item.tagName);
      setTagNamesArr(tagNames);
    } catch (error) {
      alert("/post/tags/  실패");
      console.error(error);
    }
  };

  useEffect(() => {
    getTagNames();
  }, [props.postId]);

  return (
    <>
      <div className="mt-10">
        {tagNamesArr.length > 0 &&
          tagNamesArr.map((tagName, index) => (
            <Link href={`/search/${tagName}`} key={tagName}>
              <span>#{tagName} </span>
            </Link>
          ))}
      </div>
    </>
  );
};
