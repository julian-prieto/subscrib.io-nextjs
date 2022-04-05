import { useRouter } from "next/router";
import { useMemo } from "react";
import { useSubscriptions } from "hooks";
import { Tag } from "components";
import { useApolloClient } from "@apollo/client";
import { Wrapper, Label } from "./styled";

const FilterTags = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { variables: variablesQuery } = useSubscriptions();

  const handleRemoveTagFromQuery = (tag) => {
    const listOfTags = router.query.tags
      .split(",")
      .filter((id) => id !== tag.id)
      .join(",");
    router.query.tags = listOfTags ? listOfTags : [];

    router.push(router);
  };

  const tagsFromQueryParam = useMemo(() => {
    const gqlCache = client.extract();

    if (!gqlCache || !variablesQuery.tags) return [];

    return variablesQuery.tags.map((t) => gqlCache[`Tag:${t}`]).filter((x) => x);
  }, [variablesQuery, client]);

  return !!tagsFromQueryParam.length ? (
    <Wrapper>
      <Label>Showing results for tag: </Label>
      {tagsFromQueryParam.map((tag) => (
        <Tag key={tag.id} tag={tag} onDelete={handleRemoveTagFromQuery} />
      ))}
    </Wrapper>
  ) : null;
};

export default FilterTags;
