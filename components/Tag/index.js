import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FaTrash, FaPen, FaSpinner, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { DELETE_TAG_BY_ID, UPDATE_TAG_BY_ID } from "graphql/mutations";
import { Wrapper, TagName, TagIcon, TagInput } from "./styled";

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
    editTag({ variables: { id: tag.id, name: form.name }, refetchQueries: ["GetTags"] });
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
    deleteTag({ variables: { id: tag.id }, refetchQueries: ["GetTags"] });
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
    <Wrapper>
      {isEditing ? (
        <>
          <TagInput
            onKeyPress={handleUserKeyPress}
            error={errors.name}
            {...register("name", { value: tag.name, required: true, minLength: 2, maxLength: 15 })}
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
