import { FaTrash, FaPen, FaSpinner } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_TAG_BY_ID } from "graphql/mutations";
import { Wrapper, TagName, TagIcon } from "./styled";

const Tag = ({ tag, allowDestroy, onDelete, onEdit, isLoading }) => {
  const [deleteTag, { loading }] = useMutation(DELETE_TAG_BY_ID);

  const handleDestroyTag = () => {
    if (onDelete) {
      onDelete(tag);
      return;
    }
    deleteTag({ variables: { id: tag.id }, refetchQueries: ["GetTags"] });
  };

  return (
    <Wrapper>
      <TagName>{tag.name}</TagName>
      {onEdit && (
        <TagIcon
          isLoading={isLoading}
          onClick={() => onEdit(tag)}
          color="primary"
          hasSibling={allowDestroy || onDelete}
        >
          {isLoading ? <FaSpinner /> : <FaPen />}
        </TagIcon>
      )}
      {allowDestroy && (
        <TagIcon isLoading={loading} onClick={handleDestroyTag} color="alert">
          {loading ? <FaSpinner /> : <FaTrash />}
        </TagIcon>
      )}
      {onDelete && (
        <TagIcon isLoading={isLoading} onClick={() => onDelete(tag)} color="alert">
          {isLoading ? <FaSpinner /> : <FaTrash />}
        </TagIcon>
      )}
    </Wrapper>
  );
};

export default Tag;
