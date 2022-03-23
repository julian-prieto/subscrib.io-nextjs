import { useRouter } from "next/router";
import { useMemo } from "react";
import { useSubscriptions } from "hooks";
import { Tag } from "components";
import { useApolloClient } from "@apollo/client";

const FilterTags = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { variables: variablesQuery } = useSubscriptions();

  const handleRemoveTagFromQuery = (tag) => {
    const listOfTags = router.query.tags.split(",").filter((id) => id !== tag.id);
    router.query.tags = listOfTags;
    router.push(router);
  };

  const tagsFromQueryParam = useMemo(() => {
    const gqlCache = client.extract();

    if (!gqlCache || !variablesQuery.tags) return [];

    return variablesQuery.tags.map((t) => gqlCache[`Tag:${t}`]).filter((x) => x);
  }, [variablesQuery, client]);

  return !!tagsFromQueryParam.length ? (
    <div style={{ display: "flex", marginBottom: "1rem", gap: "0.25rem" }}>
      <span>Showing results for tag: </span>
      {tagsFromQueryParam.map((tag) => (
        <Tag key={tag.id} tag={tag} onDelete={handleRemoveTagFromQuery} />
      ))}
    </div>
  ) : null;
};

export default FilterTags;
