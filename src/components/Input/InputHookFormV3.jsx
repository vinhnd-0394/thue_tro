/* eslint-disable react/prop-types */
import { useController } from "react-hook-form";
const InputHookFormV3 = ({ control, defaultValue = "", ...props }) => {
  const controller = useController({ control, name: props.name, defaultValue });

  const { field } = controller;
  console.log("controller", controller);
  return (
    <input
      className="p-3 outline-none border border-gray-300"
      {...field}
      {...props}
    />
  );
};

export default InputHookFormV3;
