import { useEffect, useRef } from "react";

export default function useLinkNewTab() {
  const nodeRef = useRef(null);
  useEffect(() => {
    if (nodeRef) {
      const links = nodeRef.current.querySelectorAll("a");
      links.length > 0 &&
        links.forEach((item) => item.setAttribute("target", "_blank"));
    }
  }, []);
  return {
    nodeRef,
  };
}
