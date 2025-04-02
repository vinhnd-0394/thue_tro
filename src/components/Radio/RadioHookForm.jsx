/* eslint-disable react/prop-types */
import { useController } from "react-hook-form";

const RadioHookForm = ({ control, defaultValue = "", ...props }) => {
  const { field } = useController({ control, name: props.name, defaultValue });

  console.log("props", props);

  return (
    <label className="w-5 h-5 custom-radio cursor-pointer">
      <input
        type="radio"
        {...field}
        {...props}
        className="hidden"
        checked={field.value == defaultValue}
      />
      <div className="bg-white w-full h-full rounded-full"></div>
    </label>
  );
};

export default RadioHookForm;
