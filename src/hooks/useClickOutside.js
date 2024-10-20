import { useEffect, useRef, useState } from "react";

function useClickOutside() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleOutsideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return [ref, open, setOpen];
}

export default useClickOutside;
