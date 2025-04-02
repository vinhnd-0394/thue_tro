/* eslint-disable react/prop-types */
import { useController } from 'react-hook-form';

const DAInput = ({
  control,
  labelFor,
  defaultValue = '',
  showError = false,
  required = false,
  disabled = false,
  isHidden = false,
  ...props
}) => {
  const { field, fieldState } = useController({
    control,
    name: props.name,
    defaultValue,
  });
  return (
    <div className={`${isHidden ? 'hidden' : 'flex flex-col w-full my-2'}`}>
      <label
        htmlFor={props.id || props.name}
        className="font-bold cursor-pointer"
      >
        <span className="mr-1">{labelFor}</span>
        {required && <small className="text-red-500">*</small>}
      </label>
      <input
        type="text"
        className={`p-2 font-bold transition-all border border-gray-300 rounded-md outline-none focus:border-blue-500 ${
          disabled ? 'bg-slate-200' : ''
        } ${fieldState.error ? 'border-red-500 focus:border-red-500' : ''}`}
        {...field}
        {...props}
        disabled={disabled}
      />
      {showError && fieldState.error && (
        <small className="text-red-500">{fieldState.error.message}</small>
      )}
    </div>
  );
};

export default DAInput;
