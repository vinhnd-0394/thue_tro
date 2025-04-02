/* eslint-disable react/prop-types */
import useClickOutSide from '../../hooks/useClickOutSide';

const DropdownSample = ({ data, value, title, defaultValue, handleClick }) => {
  const { show, setShow, nodeRef } = useClickOutSide();

  const handleClickDropdownItem = (e) => {
    handleClick(e);
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
    <div className="relative w-full min-w-[200px]" ref={nodeRef}>
      <div
        className="w-full p-2 border border-gray-200 rounded-lg cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <div className="text-[10px]">{title}</div>
        <div className="text-sm font-bold"> {value || defaultValue}</div>
      </div>
      <div
        className={`z-10 top-full left-0 w-full rounded-md bg-white absolute max-h-[400px] border border-gray-400 overflow-y-auto${
          show ? '' : 'opacity-0 invisible'
        }`}
      >
        {data.length > 0 ? (
          <>
            <div
              onClick={handleClickDropdownItem}
              className="p-2 border-t cursor-pointer hover:bg-blue-100 "
            >
              {defaultValue}
            </div>
            {renderDropdownItems()}
          </>
        ) : (
          <div>Không có lựa chọn</div>
        )}
      </div>
    </div>
  );
};

export default DropdownSample;
