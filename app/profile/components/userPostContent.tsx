type UserPostContentProps = {
  content: string;
};

export const UserPostContent = (props: UserPostContentProps) => {
  return (
    <>
      <div className="w-full flex  ">
        <p className="text-sm text-center mr-4 ml-4">{props.content}</p>
      </div>
    </>
  );
};
