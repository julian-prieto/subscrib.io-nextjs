import { useQuery, useMutation } from "@apollo/client";
import { GET_TAGS, GET_SUBSCRIPTION_ASSETS } from "graphql/queries";
import { CREATE_TAG } from "graphql/mutations";
import {
  TagsContainer,
  TagsLabel,
  TagsList,
  TagsHeader,
  TagsAddIcon,
  TagOptions,
  TagOptionItem,
  TagOptionItemLabel,
  TagOptionItemLabelTitle,
  CreateTagButton,
  CreateTagAction,
} from "./styled";
import { Tag, OptionsMenu } from "components";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Checkbox, Input, Button } from "ui";
import { useEffect, useState, useRef } from "react";

const ManageTags = ({ tags, onChange }) => {
  const [isCreatingNewTag, setIsCreatingNewTag] = useState(false);
  const lastRef = useRef();

  const { data: dataQuery } = useQuery(GET_SUBSCRIPTION_ASSETS);
  const [createTag, { loading: loadingCreateMutation }] = useMutation(CREATE_TAG);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "" },
  });
  const handleCheckbox =
    (tag) =>
    ({ target: { checked } }) => {
      if (checked) {
        const newTagIds = [...tags.map((t) => t.id), tag.id];
        onChange(JSON.stringify(newTagIds));
      } else {
        const newTagIds = tags.filter((t) => t.id !== tag.id).map((t) => t.id);
        onChange(JSON.stringify(newTagIds));
      }
    };

  const onSubmit = (form) => {
    createTag({
      variables: { name: form.name },
      update: (cache, { data: { createTag } }) => {
        try {
          const { tags: queryTags } = cache.readQuery({ query: GET_TAGS });
          const assets = cache.readQuery({ query: GET_SUBSCRIPTION_ASSETS });

          cache.writeQuery({
            query: GET_TAGS,
            data: {
              tags: [...queryTags, createTag],
            },
          });
          cache.writeQuery({
            query: GET_SUBSCRIPTION_ASSETS,
            data: {
              ...assets,
              tags: [...queryTags, createTag],
            },
          });

          const newTagIds = [...tags.map((t) => t.id), createTag.id];
          onChange(JSON.stringify(newTagIds));
          reset();
          setIsCreatingNewTag(false);
          // ...
          setTimeout(() => {
            lastRef.current.scrollIntoView(false);
          }, 50);
        } catch (error) {
          console.log("Error mutating GQL Cache:", error);
        }
      },
    });
  };

  useEffect(() => {
    if (isCreatingNewTag) {
      setFocus("name");
    }
  }, [isCreatingNewTag, setFocus]);
  const formHasErrors = !!Object.keys(errors).length;

  return (
    <TagsContainer>
      <TagsHeader>
        <TagsLabel>Tags</TagsLabel>
        {dataQuery?.tags && (
          <OptionsMenu
            renderIcon={({ isOpen }) => (
              <TagsAddIcon isOpen={isOpen}>
                <FaPlus />
              </TagsAddIcon>
            )}
            renderMenu={() => {
              return (
                <>
                  <TagOptions>
                    {dataQuery.tags.map((tag) => {
                      const isChecked = !!tags.find((t) => t.id === tag.id);
                      return (
                        <TagOptionItem key={tag.id}>
                          <TagOptionItemLabel>
                            <Checkbox checked={isChecked} onChange={handleCheckbox(tag)} />
                            <TagOptionItemLabelTitle style={{ marginLeft: "0.25rem" }}>
                              {tag.name}
                            </TagOptionItemLabelTitle>
                          </TagOptionItemLabel>
                        </TagOptionItem>
                      );
                    })}
                    <div ref={lastRef} />
                  </TagOptions>
                  {isCreatingNewTag ? (
                    <>
                      <CreateTagAction>
                        <Input
                          {...register("name", {
                            required: { value: true, message: "This field is required" },
                            minLength: { value: 2, message: "Minimum length: 2" },
                            maxLength: { value: 20, message: "Maximum length: 20" },
                          })}
                          placeholder="e.g. Work"
                          disabled={loadingCreateMutation}
                        />

                        <Button
                          type="submit"
                          disabled={loadingCreateMutation || formHasErrors}
                          onClick={handleSubmit(onSubmit)}
                          xs
                        >
                          +
                        </Button>
                      </CreateTagAction>
                      {errors.name && <span>{errors.name.message}</span>}
                    </>
                  ) : (
                    <CreateTagButton>
                      <Button onClick={() => setIsCreatingNewTag(true)}>
                        <span>Create Tag</span>
                        <FaPlus />
                      </Button>
                    </CreateTagButton>
                  )}
                </>
              );
            }}
          />
        )}
      </TagsHeader>
      {!!tags.length && (
        <TagsList>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              tag={tag}
              onDelete={(tag) => {
                const newTagIds = tags.filter((t) => t.id !== tag.id).map((t) => t.id);
                onChange(JSON.stringify(newTagIds));
              }}
            />
          ))}
        </TagsList>
      )}
    </TagsContainer>
  );
};

export default ManageTags;
