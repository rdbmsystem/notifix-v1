import { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import FocusLock from "react-focus-lock";
// import AddPostForm from "./AddPostForm";

const DialogBox = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll when the modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Enable body scroll when the modal is closed
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);

      // Restore body scroll on cleanup
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50 "
      onClick={onClose} // Close modal when clicking the background
    >
      <div
        className="bg-white rounded-lg relative shadow "
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        tabIndex="-1" // Prevent the modal background from being focusable
      >
        <div className="flex justify-between items-center mb-1 border-b p-4 ">
          {children.header}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full  transition-all duration-200 p-[0.4rem] hover:bg-gray-300 bg-gray-200"
          >
            <HiXMark className="w-[1.4rem] h-[1.4rem] text-gray-500" />
          </button>
        </div>
        <FocusLock
          returnFocus={true} // Focus trapping handled by react-focus-lock
          onActivation={(node) => {
            const firstInput = node.querySelector("input, textarea, button");
            firstInput?.focus(); // Set initial focus to the first focusable element
          }}
        >
          {children.body}
        </FocusLock>
      </div>
    </div>
  );
};

export default DialogBox;
