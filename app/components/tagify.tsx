import Tags from "@yaireo/tagify/dist/react.tagify";
import { Dispatch, SetStateAction, useCallback } from "react";
import "@yaireo/tagify/dist/tagify.css";

type TagifyComponentType = {
  setTagValues: Dispatch<SetStateAction<string>>;
};
export const TagifyComponent = (props: TagifyComponentType) => {
  let tagValues;
  const onTagChange = useCallback(
    (e: CustomEvent<Tagify.ChangeEventData<Tagify.TagData>>) => {
      tagValues = e.detail.value;
      props.setTagValues(tagValues);
    },

    []
  );

  return (
    <>
      <Tags onChange={onTagChange} />
    </>
  );
};
