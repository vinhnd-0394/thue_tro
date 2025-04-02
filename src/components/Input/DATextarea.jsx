/* eslint-disable react/prop-types */
import { useLayoutEffect, useState } from 'react';
import { useController } from 'react-hook-form';

const DATextarea = ({
  control,
  labelFor,
  defaultValue = '',
  showError = false,
  required = false,
  note = '',
  maxLength = 0,
  ...props
}) => {
  const { field, fieldState } = useController({
    control,
    name: props.name,
    defaultValue,
  });

  const [textareaHeight, setTextareaHeight] = useState('auto');

  const handleChange = (e) => {
    setTextareaHeight('auto');
    field.onChange(e);
  };

  useLayoutEffect(() => {
    const textareaDoc = document.getElementById(props.name);
    setTextareaHeight(`${textareaDoc?.scrollHeight}px`);
  }, [field.value, props.name]);

  return (
    <div className="flex flex-col my-2">
      <label
        htmlFor={props.id || props.name}
        className="font-bold cursor-pointer"
      >
        <span className="mr-1">{labelFor}</span>
        {required && <small className="text-red-500">*</small>}
      </label>
      {note && <p className="text-xs text-gray-400">{note}</p>}
      <textarea
        className={`w-full p-2 overflow-hidden leading-normal transition-all border border-gray-300 rounded-lg outline-none focus:border-blue-400 ${
          fieldState.error ? 'border-red-500 focus:border-red-500' : ''
        }`}
        rows="2"
        value={field.value}
        style={{
          height: textareaHeight,
        }}
        {...field}
        {...props}
        onChange={handleChange}
      />
      {showError && fieldState.error && (
        <small className="text-red-500">{fieldState.error.message}</small>
      )}
      {!!maxLength && (
        <p className="text-xs text-gray-400">{`${field.value.length} / ${maxLength}`}</p>
      )}
    </div>
  );
};

export default DATextarea;
