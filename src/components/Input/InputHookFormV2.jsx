/* eslint-disable react/prop-types */
import { Controller } from "react-hook-form";
const InputHookFormV2 = ({ control, ...props }) => {
  return (
    <Controller
      name={props.name}
      control={control}
      defaultValue=""
      render={(controller) => {
        console.log(controller);
        return (
          <input
            className="p-3 outline-none border border-gray-300"
            {...controller.field}
            {...props}
          />
        );
      }}
    >
      InputHookFormV1
    </Controller>
  );
};

export default InputHookFormV2;
