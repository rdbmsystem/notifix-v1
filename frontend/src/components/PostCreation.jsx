import { HiPhoto } from "react-icons/hi2";
import DialogBox from "./DialogBox";
import { useState } from "react";
import AddPostForm from "./AddPostForm";

const PostCreation = ({ user }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="bg-secondary rounded-lg shadow mb-4 p-4  ">
      <div className="flex flex-grow">
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="size-10 rounded-full  object-cover border-gray-300 mr-3"
        />
        <button
          onClick={openModal}
          className=" size-10 w-full px-4 text-gray-600 rounded-full bg-base-200 hover:bg-base-300  resize-none transition-colors duration-200 text-left justify-start"
        >
          What&lsquo;s on your mind?
        </button>
        <DialogBox isOpen={isModalOpen} onClose={closeModal} user={user}>
          {{
            header: <h2 className="text-xl font-semibold">Create a post</h2>,
            body: <AddPostForm user={user} onClose={closeModal} />,
          }}
        </DialogBox>
      </div>

      <div className="flex justify-between items-center mt-4 border-t">
        <div className="flex space-x-4" onClick={openModal}>
          <label className="rounded-full flex mt-4 items-center  cursor-pointer text-info px-3 py-1 hover:bg-base-200 hover:text-info-dark transition-colors duration-200">
            <HiPhoto size={20} className="mr-2" />
            <span>Photo</span>
          </label>
        </div>
      </div>
    </div>
  );
};
export default PostCreation;
