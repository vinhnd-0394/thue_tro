/* eslint-disable react/prop-types */
import { useController } from 'react-hook-form';

const DAInputFile = ({
  control,
  defaultValue = [],
  showError = false,
  accept = 'image/jpg,image/jpeg,image/gif,image/png',
  ...props
}) => {
  const { field, fieldState } = useController({
    control,
    name: props.name,
    defaultValue,
  });

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      const medias = Array.from(e.target.files);
      field.onChange(medias);
    }
  };

  return (
    <div className="flex flex-col my-2">
      <input
        {...props}
        {...field}
        type="file"
        multiple
        accept={accept}
        value={undefined}
        onChange={handleChange}
      />
      {showError && fieldState.error && (
        <small className="text-red-500">{fieldState.error.message}</small>
      )}
    </div>
  );
};

export default DAInputFile;
