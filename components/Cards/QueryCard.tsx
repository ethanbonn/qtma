import { useState } from "react";
import queryDB from "../../functions/server/queryDB";

const buttonHandler = async (relationship_type: string | undefined, skills: [string] | undefined, tags: [string] | undefined) => {
  const response = await queryDB(relationship_type, tags, skills)
  .then(response => response);
  return response;
}

export default function Card({ stateChanger }) {
  const [relationship_type, set_relationship_type] = useState("");
  const [skill, set_skill] = useState("");
  const [tag, set_tag] = useState("");

  return (
    <div className=" p-4 m-10 max-w-auto mx-auto bg-white rounded-xl shadow-lg flex  ">
      <div className="flex flex-wrap content-center">
        <div className="mx-2">
          <div className="text-xl font-medium text-black">I'm looking for </div>
          <input className="my-3 border border-black rounded-lg  px-1 " onChange={(e) => set_relationship_type(e.target.value)}/>
        </div>
        <div className="mx-2">
          <div className="text-xl font-medium text-black">that are skilled in </div>
          <input className="my-3 border border-black rounded-lg  px-1 " onChange={(e) => set_skill(e.target.value)}/>
        </div>
        <div className="mx-2">
          <div className="text-xl font-medium text-black">to build </div>
          <input className="my-3 border border-black rounded-lg  px-1 " onChange={(e) => set_tag(e.target.value)}/>
        </div>

        <div>
        <div className="text-xl font-medium text-black"> </div>
          <button className="px-3 py-1 mt-9 text-white bg-green-normal rounded-lg" onClick={() => stateChanger(buttonHandler(relationship_type, skill, tag))}>
            S
          </button>
        </div>
      </div>
    </div>
  );
}
