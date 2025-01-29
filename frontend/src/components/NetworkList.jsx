import DialogBox from "./DialogBox";
import SuggestedUserList from "./SuggestedUserList";

const NetworkList = ({ isModalOpen, openModal, closeModal, user }) => {
  return (
    <div>
      <button onClick={openModal} className="w-full pt-2">
        <span className="items-center justify-center p-1 flex text-info text-sm bg-gray-100 hover:bg-gray-200 hover:text-gray-700 rounded-md w-full transition-all">
          See all suggestions
        </span>
      </button>
      <DialogBox isOpen={isModalOpen} onClose={closeModal} user={user}>
        {{
          header: (
            <h2 className="text-xl font-semibold">People you may know</h2>
          ),
          body: <SuggestedUserList />,
        }}
      </DialogBox>
    </div>
  );
};
export default NetworkList;
