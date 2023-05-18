import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { SearchInput } from "../searchInput";

export default function searchPage({ params: { tagName } }: Params) {
  return (
    <>
      <SearchInput tagName={tagName} />
    </>
  );
}
