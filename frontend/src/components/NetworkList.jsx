import DialogBox from "./DialogBox";
// import SuggestedUser from "./SuggestedUser";
// import { axiosInstance } from "../lib/axios";
// import { useQuery } from "@tanstack/react-query";
import SuggestedUserList from "./SuggestedUserList";

const NetworkList = ({ isModalOpen, openModal, closeModal, user }) => {
  // const { data: recommendedUsers } = useQuery({
  //   queryKey: ["recommendedUsers"],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get("/users/suggestions");
  //     return res.data;
  //   },
  // });

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

// import DialogBox from "./DialogBox";
// import { useState } from "react";
// import SuggestedUser from "./SuggestedUser";
// import { axiosInstance } from "../lib/axios";
// import { useQuery } from "@tanstack/react-query";

// const NetworkList = ({ user }) => {
//   const [isModalOpen, setModalOpen] = useState(false);

//   const openModal = () => setModalOpen(true);
//   const closeModal = () => setModalOpen(false);

//   const { data: recommendedUsers } = useQuery({
//     queryKey: ["recommendedUsers"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/users/suggestions");
//       return res.data;
//     },
//   });

//   return (
//     <div>
//       <button onClick={openModal} className="w-full pt-2">
//         <span className="items-center justify-center p-1 flex text-info text-sm bg-gray-100 hover:bg-gray-200 hover:text-gray-700 rounded-md w-full transition-all">
//           See all suggestions
//         </span>
//       </button>
//       <DialogBox isOpen={isModalOpen} onClose={closeModal} user={user}>
//         {{
//           header: (
//             <h2 className="text-xl font-semibold">People you may know</h2>
//           ),
//           body:
//             recommendedUsers && recommendedUsers.length > 0 ? (
//               recommendedUsers.map((user) => (
//                 <SuggestedUser key={user._id} user={user} />
//               ))
//             ) : (
//               <p>No recommendations available.</p>
//             ),
//         }}
//       </DialogBox>
//     </div>
//   );
// };
// export default NetworkList;
