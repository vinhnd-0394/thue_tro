/* eslint-disable react/prop-types */
import { useField } from "formik";

const TextareaFormikV4 = ({ labelFor, htmlFor, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={htmlFor || props.id}>{labelFor}</label>
      <textarea
        className="p-3 outline-none border border-gray-300 h-[150px] resize-none"
        {...props}
        {...field}
      />
      {meta.error && meta.touched && (
        <small className="text-red-500">{meta.error}</small>
      )}
    </div>
  );
};

export default TextareaFormikV4;
