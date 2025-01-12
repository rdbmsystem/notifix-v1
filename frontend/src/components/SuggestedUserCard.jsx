import { useState } from "react";
import NetworkList from "./NetworkList";
import SuggestedUser from "./SuggestedUser";

function SuggestedUserCard({ usersToShow }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div
      className={`hidden xl:block w-[18.8rem] fixed top-30   h-full ml-[59.2rem] space-y-4 ${
        isModalOpen ? "z-30" : "z-1"
      }  `}
    >
      <div className=" bg-secondary rounded-lg shadow p-2 ">
        <h2 className="font-semibold mb-2">Add to your network</h2>
        {usersToShow.map((user) => (
          <SuggestedUser key={user._id} user={user} />
        ))}
        <NetworkList
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          users={usersToShow}
        />
      </div>

      <div
        className="bg-secondary rounded-lg shadow p-4 h-40 bg-cover bg-center"
        style={{
          backgroundImage: "url('/itsupport.jpg')",
          opacity: 0.8,
        }}
      >
        <h1 className="inline-flex flex-col space-y-1">
          <span className="bg-accent font-semibold px-2 inline w-max text-lg">
            See available IT Support
          </span>
          <span className="bg-accent px-2 inline w-max text-lg">
            on Notifix.
          </span>
        </h1>
      </div>
      <div className="px-2 ">
        <div className="break-words  inline-block space-x-2 ">
          <span className="text-slate-400 pt-1 text-[13px] inline-block ml-2">
            About
          </span>
          <span className="text-slate-400 pt-1 text-[13px] inline-block">
            Business
          </span>
          <span className="text-slate-400 pt-1 text-[13px]">Careers</span>
          <span className="text-slate-400 pt-1 text-[13px]">
            Documentations
          </span>
          <span className="text-slate-400 pt-1 text-[13px] inline-block">
            Help center
          </span>
          <span className="text-slate-400 pt-1 text-[13px] inline-block">
            Privacy & terms
          </span>
        </div>
        <p className="text-slate-400 pt-1 ml-2 text-[13px]">
          Copyright &copy; 2024 by Rain Kun. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default SuggestedUserCard;
