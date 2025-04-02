import { useLayoutEffect, useRef, useState } from "react";

const TextareaAutoResize = () => {
  const [text, setText] = useState("demo");
  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  // const [parentHeight, setParentHeight] = useState("auto");

  const handleChange = (event) => {
    // setTextareaHeight(`${textareaRef?.current?.scrollHeight}px`);
    setTextareaHeight("auto");
    // setParentHeight(`${textareaRef?.current?.scrollHeight}px`);
    setText(event.target.value);
  };

  // sử dụng useEffect hoặc useLayoutEffect để tính toán lại height khi nhập text
  // nếu không có, sẽ bị trường hợp ban đầu height mặc định quá cao, trong khi text ít thì box sẽ bị thu gọn lại khi nhập text
  useLayoutEffect(() => {
    // cập nhật lại height của text area khi mà nhập text
    setTextareaHeight(`${textareaRef?.current?.scrollHeight}px`);
    // setParentHeight(`${textareaRef?.current?.scrollHeight}px`);
  }, [text]);

  return (
    <div
      className="p-5"
      // style={{
      //   minHeight: parentHeight,
      // }}
    >
      <textarea
        className="transition-all overflow-hidden w-full max-w-[400px] p-5 rounded-lg border border-gray-300 focus:border-blue-400 resize-none leading-normal outline-none"
        placeholder="Please enter your content..."
        value={text}
        ref={textareaRef}
        style={{
          height: textareaHeight,
        }}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default TextareaAutoResize;
