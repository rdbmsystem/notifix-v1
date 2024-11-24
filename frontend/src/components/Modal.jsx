import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: openWindowName }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openWindowName) });
};

const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (name !== openName) return null;
  return createPortal(
    <div className="fixed inset-0 w-full h-screen bg-gray-100/90 z-[1000] transition-all duration-500 rounded-lg">
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--color-grey-0)] rounded-[var(--border-radius-lg)] shadow-[var(--shadow-lg)] transition-all duration-500"
      >
        <button
          onClick={close}
          className=" bg-none border-non p-[0.4rem] rounded-full translate-x-[0.8rem] transition-all duration-200 absolute top-[.7rem] right-[1.3rem] hover:bg-gray-100"
        >
          <HiXMark className="w-[1.4rem] h-[1.4rem] text-gray-500" />
        </button>
        <div>
          {cloneElement(children, {
            onCloseModal: close,
          })}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
