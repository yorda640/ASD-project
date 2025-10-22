import { InputForm } from "./InputForm";
interface PropTypes {
  control: string;
}
function FormControlComponent(props: PropTypes) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <InputForm {...rest} />;
  }
}
export default FormControlComponent;
