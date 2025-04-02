/* eslint-disable react/prop-types */
import { useController } from "react-hook-form";

const CheckboxHookForm = ({
  control,
  defaultValue = false,
  text,
  showError = false,
  ...props
}) => {
  const { field, fieldState } = useController({
    control,
    name: props.name,
    defaultValue,
  });

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        {...field}
        {...props}
        className="hidden"
        checked={field.value}
      />
      <div className="flex items-center gap-x-3">
        <div className="bg-white w-full h-full rounded-md transition-all custom-checkbox-square flex items-center justify-center">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7453 4.89733L5.93178 12.7109L2.25482 9.03391L3.17132 8.11741L5.93178 10.8714L12.8288 3.98083L13.7453 4.89733Z"
              fill="white"
            />
          </svg>
        </div>
        <label className="text-sm cursor-pointer" htmlFor={props.id}>
          {text}
        </label>
      </div>
      {showError && fieldState.error && (
        <small className="text-red-500">{fieldState.error.message}</small>
      )}
    </label>
  );
};

export default CheckboxHookForm;
