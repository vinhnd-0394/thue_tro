/* eslint-disable react/prop-types */
import { Editor } from '@tinymce/tinymce-react';
import { Controller, useController } from 'react-hook-form';

const DAMarkdownEditor = ({
  control,
  labelFor,
  defaultValue = '',
  showError = false,
  required = false,
  note = '',
  name,
  maxLength = 0,
  ...props
}) => {
  const {
    field: { onChange },
  } = useController({ control, name, defaultValue });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label
            htmlFor={props.id || props.name}
            className="font-bold cursor-pointer"
          >
            <span className="mr-1">{labelFor}</span>
            {required && <small className="text-red-500">*</small>}
          </label>
          {note && <p className="text-xs text-gray-400">{note}</p>}
          <Editor
            apiKey="your_api_key" // Tao ở https://www.tiny.cloud
            onEditorChange={onChange}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px, }',
            }}
          />
          {showError && fieldState.error && (
            <small className="text-red-500">{fieldState.error.message}</small>
          )}
          {!!maxLength && (
            <p className="text-xs text-gray-400">{`${
              field?.value?.length || 0
            } / ${maxLength}`}</p>
          )}
        </div>
      )}
    />
  );
};
export default DAMarkdownEditor;
