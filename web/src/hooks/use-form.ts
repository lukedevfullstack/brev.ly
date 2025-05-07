import { useState } from "react";

type FormErrors<T> = Partial<Record<keyof T, string>>;

interface UseFormOptions<T> {
  initialValues: T;
  validators: Partial<Record<keyof T, (value: string) => string | null>>;
  onSubmit: (values: T) => void;
}

export const useForm = <T extends Record<string, string>>({
  initialValues,
  validators,
  onSubmit,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = (key: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));

    if (errors[key] && validators[key]) {
      const error = validators[key]?.(value);
      setErrors((prev) => ({ ...prev, [key]: error ?? undefined }));
    }
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    const newErrors: FormErrors<T> = {};

    for (const key in validators) {
      const validate = validators[key];
      if (validate) {
        const error = validate(values[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      onSubmit(values);
      setValues(initialValues);
      setErrors({});
    } catch (err) {
      console.warn(err);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};
