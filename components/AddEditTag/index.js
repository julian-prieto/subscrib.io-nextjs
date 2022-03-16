import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_TAGS } from "graphql/queries";
import { CREATE_TAG } from "graphql/mutations";
import { useAuth } from "hooks";
import { Button, Input } from "ui";
import { Tag } from "components";
import { Actions, Card, Form, H1, H2, TagList } from "./styled";

const AddEditTag = () => {
  const { user } = useAuth();

  const { data: dataQuery, loading: loadingQuery } = useQuery(GET_TAGS, { skip: !user });
  const [
    createTag,
    { data: dataCreateMutation, loading: loadingCreateMutation, called: calledCreateMutation },
  ] = useMutation(CREATE_TAG);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (form) => {
    createTag({
      variables: { name: form.name },
      update: (cache, { data: { createTag } }) => {
        try {
          const { tags } = cache.readQuery({ query: GET_TAGS });
          cache.writeQuery({
            query: GET_TAGS,
            data: {
              tags: [...tags, createTag],
            },
          });
        } catch (error) {
          console.log("Error mutating GQL Cache:", error);
        }
      },
    });
  };

  const formHasErrors = !!Object.keys(errors).length;

  useEffect(() => {
    if (calledCreateMutation && dataCreateMutation && !loadingCreateMutation) {
      reset();
    }
  }, [dataCreateMutation, loadingCreateMutation, calledCreateMutation, reset]);

  return (
    <Card>
      <H1>Tags</H1>
      {loadingQuery && "Loading Tags..."}
      <TagList>
        {dataQuery?.tags?.map((tag) => (
          <Tag key={tag.id} tag={tag} allowEdit allowDestroy />
        ))}
      </TagList>
      <H2>Create tag</H2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Tag name"
          {...register("name", { required: true, minLength: 2, maxLength: 15 })}
          disabled={loadingCreateMutation}
        />
        {errors.name && <span>This field is required</span>}
        <Actions>
          <Button
            type="submit"
            isLoading={loadingCreateMutation}
            disabled={loadingCreateMutation || formHasErrors}
          >
            ADD TAG
          </Button>
        </Actions>
      </Form>
    </Card>
  );
};

export default AddEditTag;
