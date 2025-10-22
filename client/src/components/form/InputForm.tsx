import { Field } from "formik";
import { FormLabel } from "react-bootstrap";

interface InputFormProps {
  label?: string;
  name?: string;
}

export function InputForm(props: InputFormProps) {
  const { label, name } = props;
  return (
    <div className="form-control">
      <FormLabel htmlFor="name">{label}</FormLabel>
      <Field name={name} />
    </div>
  );
}
