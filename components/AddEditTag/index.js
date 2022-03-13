import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { GET_TAGS } from "graphql/queries";
import { CREATE_TAG, UPDATE_TAG_BY_ID } from "graphql/mutations";
import { useAuth } from "hooks";
import { Actions, Card, Form, H1, H2, TagList } from "./styled";
import { Button, Input, Tag } from "ui";
import { useCallback, useEffect, useState } from "react";

const AddEditTag = () => {
  const [currentTag, setCurrentTag] = useState(null);
  const { user } = useAuth();

  const { data: dataQuery, loading: loadingQuery } = useQuery(GET_TAGS, { skip: !user });
  const [createTag, { data: dataCreateMutation, loading: loadingCreateMutation, called: calledCreateMutation }] =
    useMutation(CREATE_TAG);
  const [editTag, { data: dataEditMutation, loading: loadingEditMutation, called: calledEditMutation }] =
    useMutation(UPDATE_TAG_BY_ID);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (form) => {
    createTag({ variables: { name: form.name }, refetchQueries: ["GetTags"] });
  };

  const onEdit = (form) => {
    editTag({ variables: { id: currentTag.id, name: form.name }, refetchQueries: ["GetTags"] });
  };

  const handleEditTag = (tag) => {
    reset();
    setValue("name", tag.name);
    setCurrentTag(tag);
  };

  const handleCancelEditTag = useCallback(() => {
    reset();
    setCurrentTag(null);
  }, [setCurrentTag, reset]);

  const formHasErrors = !!Object.keys(errors).length;

  useEffect(() => {
    if (calledCreateMutation && dataCreateMutation && !loadingCreateMutation) {
      reset();
    }
  }, [dataCreateMutation, loadingCreateMutation, calledCreateMutation, reset]);

  useEffect(() => {
    if (calledEditMutation && dataEditMutation && !loadingEditMutation) {
      handleCancelEditTag();
    }
  }, [dataEditMutation, loadingEditMutation, calledEditMutation, handleCancelEditTag]);

  return (
    <Card>
      <H1>Tags</H1>
      {loadingQuery && "Loading Tags..."}
      <TagList>
        {dataQuery?.tags?.map((tag) => (
          <Tag key={tag.id} tag={tag} onEdit={handleEditTag} allowDestroy />
        ))}
      </TagList>
      <H2>{currentTag ? <>Edit tag <i>{currentTag.name}</i></> : "Create tag"}</H2>
      <Form onSubmit={handleSubmit(!!currentTag ? onEdit : onSubmit)}>
        <Input
          hasValue={!!watch("name")}
          label="Tag name"
          {...register("name", { required: true, minLength: 2, maxLength: 15 })}
          disabled={loadingCreateMutation}
        />
        {errors.name && <span>This field is required</span>}
        <Actions>
          {!!currentTag ? (
            <>
              <Button type="submit" isLoading={loadingEditMutation} disabled={loadingEditMutation || formHasErrors}>
                EDIT TAG
              </Button>
              <Button
                color="secondary"
                onClick={handleCancelEditTag}
                isLoading={loadingEditMutation}
                disabled={loadingEditMutation || formHasErrors}
              >
                CANCEL EDIT
              </Button>
            </>
          ) : (
            <Button type="submit" isLoading={loadingCreateMutation} disabled={loadingCreateMutation || formHasErrors}>
              ADD TAG
            </Button>
          )}
        </Actions>
      </Form>
    </Card>
  );
};

export default AddEditTag;
