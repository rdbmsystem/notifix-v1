import { HiPhoto } from "react-icons/hi2";
import AddPostForm from "./AddPostForm";
import Modal from "./Modal";

const PostCreation = ({ user }) => {
  return (
    <div className="bg-secondary rounded-lg shadow mb-4 p-4  ">
      <div className="flex space-x-3">
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="size-10 rounded-full border border-gray-300"
        />
        <Modal>
          <Modal.Open opens="post-form">
            <button className=" size-10 w-full px-4 text-gray-600 rounded-full bg-base-200 hover:bg-base-300 focus:bg-base-300 focus:outline-none resize-none transition-colors duration-200 text-left justify-start">
              What&lsquo;s on your mind?
            </button>
          </Modal.Open>
          <Modal.Window name="post-form">
            <AddPostForm user={user} />
          </Modal.Window>
        </Modal>
      </div>
      <Modal>
        <div className="flex justify-between items-center mt-4 border-t">
          <div className="flex space-x-4">
            <Modal.Open opens="post-form">
              <label className="rounded-full flex mt-3 items-center  cursor-pointer text-info px-3 py-1 hover:bg-base-200 hover:text-info-dark transition-colors duration-200">
                <HiPhoto size={20} className="mr-2" />
                <span>Photo</span>
              </label>
            </Modal.Open>
          </div>
        </div>
        <Modal.Window name="post-form">
          <AddPostForm user={user} />
        </Modal.Window>
      </Modal>
    </div>
  );
};
export default PostCreation;
