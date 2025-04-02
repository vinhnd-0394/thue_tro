/* eslint-disable react/prop-types */
import { useField } from "formik";

const CheckboxFormikV4 = ({ children, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col mb-4">
      <label className="flex gap-2">
        <input type="checkbox" {...props} {...field} />
        {children}
      </label>
      {meta.error && meta.touched && (
        <small className="text-red-500">{meta.error}</small>
      )}
    </div>
  );
};

export default CheckboxFormikV4;
