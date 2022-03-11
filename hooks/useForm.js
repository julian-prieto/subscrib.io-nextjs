import { useState } from "react";

const useForm = ({ initialState, onSubmit, validators = {} }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let shouldSubmit = true;
    if (Object.keys(validators).length) {
      Object.keys(validators).forEach((v) => {
        if (Object.prototype.hasOwnProperty.call(form, v) && !validators[v](form[v])) {
          shouldSubmit = false;
          setErrors((prevErrors) => ({
            ...prevErrors,
            [v]: "ERROR!",
          }));
        }
      });
    }

    if (shouldSubmit && onSubmit) {
      onSubmit(form);
    }
  };

  return { form, errors, handleChange, handleSubmit };
};

export default useForm;
