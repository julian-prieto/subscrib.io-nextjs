import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FaTrash, FaPen, FaSpinner, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { DELETE_TAG_BY_ID, UPDATE_TAG_BY_ID } from "graphql/mutations";
import { Wrapper, TagName, TagIcon, TagInput } from "./styled";

const ERROR_MESSAGES = {
  name: {
    required: "This field is required",
    minLength: "Minimum length: 2",
    maxLength: "Maximum length: 20",
  },
};

const Tag = ({ tag, allowDestroy, allowEdit, onDelete, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [deleteTag, { loading: loadingDeleteMutation }] = useMutation(DELETE_TAG_BY_ID);
  const [editTag, { data: dataEditMutation, loading: loadingEditMutation, called: calledEditMutation }] =
    useMutation(UPDATE_TAG_BY_ID);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  const handleEditTag = (form) => {
    editTag({ variables: { id: tag.id, name: form.name } });
  };

  const handleCancelEditTag = useCallback(() => {
    reset();
    setIsEditing(false);
  }, [setIsEditing, reset]);

  const handleDestroyTag = () => {
    if (onDelete) {
      onDelete(tag);
      return;
    }
    deleteTag({
      variables: { id: tag.id },
      update: (cache, { data: { deleteTagById } }) => {
        try {
          const normalizedId = cache.identify({ id: deleteTagById.id, __typename: "Tag" });
          cache.evict({ id: normalizedId });
          cache.gc();
        } catch (error) {
          console.log("Error mutating GQL Cache:", error);
        }
      },
    });
  };

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(handleEditTag)();
    }
  };

  useEffect(() => {
    if (calledEditMutation && dataEditMutation && !loadingEditMutation) {
      handleCancelEditTag();
    }
  }, [dataEditMutation, loadingEditMutation, calledEditMutation, handleCancelEditTag]);

  useEffect(() => {
    if (isEditing) {
      setFocus("name");
    }
  }, [isEditing, setFocus]);

  return (
    <Wrapper managing={allowEdit || allowDestroy}>
      {isEditing ? (
        <>
          <TagInput
            onKeyPress={handleUserKeyPress}
            error={errors.name && ERROR_MESSAGES.name[errors.name.type]}
            {...register("name", { value: tag.name, required: true, minLength: 2, maxLength: 20 })}
          />
          <TagIcon
            isLoading={loadingEditMutation}
            onClick={handleSubmit(handleEditTag)}
            color="success"
            hasSibling={allowDestroy || onDelete}
          >
            {loadingEditMutation ? <FaSpinner /> : <FaCheck />}
          </TagIcon>
          <TagIcon isLoading={loadingEditMutation} onClick={handleCancelEditTag} color="alert">
            {loadingEditMutation ? <FaSpinner /> : <IoClose />}
          </TagIcon>
        </>
      ) : (
        <>
          <TagName>{tag.name}</TagName>
          {allowEdit && (
            <TagIcon onClick={() => setIsEditing(true)} color="success" hasSibling={allowDestroy || onDelete}>
              {isLoading ? <FaSpinner /> : <FaPen />}
            </TagIcon>
          )}
          {allowDestroy && (
            <TagIcon isLoading={loadingDeleteMutation} onClick={handleDestroyTag} color="alert">
              {loadingDeleteMutation ? <FaSpinner /> : <FaTrash />}
            </TagIcon>
          )}
          {onDelete && (
            <TagIcon isLoading={isLoading} onClick={() => onDelete(tag)} color="alert">
              {isLoading ? <FaSpinner /> : <FaTrash />}
            </TagIcon>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Tag;
