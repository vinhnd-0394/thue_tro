/* eslint-disable react/prop-types */
import { useController } from 'react-hook-form';
import useClickOutSide from '../../hooks/useClickOutSide';
import { useEffect, useState } from 'react';

const DropdownHookForm = ({
  control,
  setValue,
  name,
  defaultValue = '',
  text = 'Lựa chọn',
  label,
  showError,
  required = false,
  data = [],
}) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const [dropdownText, setDropdownText] = useState(text);

  const {
    field: { value },
    fieldState,
  } = useController({
    control,
    name,
    defaultValue,
  });

  useEffect(() => {
    if (!value) setDropdownText(text);
  }, [text, value]);

  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.getAttribute('data-value'));
    setDropdownText(e.target.innerHTML);
    setShow(false);
  };

  const renderDropdownItems = () => {
    return (
      <ul className="shadow-lg">
        {data.map((item) => (
          <li
            data-value={item.value}
            key={item.id}
            onClick={handleClickDropdownItem}
            className="p-2 border-t cursor-pointer hover:bg-blue-100"
          >
            {item.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col w-full my-4">
      <label htmlFor={name} className="font-bold cursor-pointer">
        <span className="mr-1">{label}</span>
        {required && <small className="text-red-500">*</small>}
      </label>
      <div className="relative" ref={nodeRef}>
        <div
          className={`flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md cursor-pointer ${
            fieldState.error ? 'border-red-500' : ''
          }`}
          onClick={() => setShow(!show)}
        >
          <span>{value || dropdownText}</span>
        </div>
        <div
          className={`z-10 top-full left-0 w-full rounded-md bg-white absolute max-h-[400px] border border-gray-400 overflow-y-auto${
            show ? '' : 'opacity-0 invisible'
          }`}
        >
          {data.length > 0 ? (
            <>
              <div
                data-value=""
                onClick={handleClickDropdownItem}
                className="p-2 border-t cursor-pointer hover:bg-blue-100 "
              >
                {text}
              </div>
              {renderDropdownItems()}
            </>
          ) : (
            <div>Không có lựa chọn</div>
          )}
        </div>
      </div>
      {showError && fieldState.error && (
        <small className="text-red-500">{fieldState.error.message}</small>
      )}
    </div>
  );
};

export default DropdownHookForm;
