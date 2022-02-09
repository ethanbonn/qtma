import { Avatar } from "@chakra-ui/react";
import Image from "next/image";
import profile from "../../pages/profile";
import type { User } from "../../types/models";

interface userWrapper {
  user: User;
}

export default function ProfilePageCard(props: userWrapper) {
  const { user } = props;
  const { profilePicture, firstName, lastName, jobTitle, userDescription } =
    user;

  console.log(profilePicture);
  return (
    <>
      <div className="font-sans max-w-auto min-w-auto mx-10 bg-white rounded-xl shadow-lg flex flex-row m-10 border-2 border-green-normal">
        <div className="max-w-xs w-full rounded-xl  overflow-hidden shadow-lg">
          <Avatar
            className="block mx-auto rounded-full w-32 h-32 sm:flex-shrink-0 mt-3"
            size="2xl"
            name={`${firstName} ${lastName}`}
            src={profilePicture}
          />
          <Image src={profilePicture} width={500} height={500} />
          <img
            className="block mx-auto rounded-full w-32 h-32 sm:flex-shrink-0 mt-3"
            src={profilePicture}
            alt="Author"
          />

          <div className="px-6 py-4">
            <div className="content-center">
              <div className=" text-center font-bold text-xl ">{`${firstName} ${lastName}`}</div>
              <p className=" text-center text-gray-500 font-semibold mb-3">
                {jobTitle}
              </p>
            </div>

            <p className="text-gray-400 font-normal">{`${userDescription}`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
