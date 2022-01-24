import React from "react";
import { useState, useEffect } from "react";
import queryDB from "../../functions/server/queryDB";
import { Listbox, Transition } from "@headlessui/react";
import QueryCardRelationship from "../QueryCardRelationship";
import QueryCardSelect from "../QueryCardSelect";


export default function Card({ stateChanger }) {
  const [relationship_type, set_relationship_type] = useState("");
  const [skill, set_skill] = useState([]);
  const [search, set_search] = useState("");

  const [button_pressed, set_button_press] = useState(0);

  useEffect(() => {
    async function handler() {
      await queryDB(relationship_type, search, skill.map((x) => x.value)).then(response => response)
      .then((res) => stateChanger(res))
    }
    handler();

  }, [button_pressed]);

  useEffect( () => {
    console.log("skills", skill);
  }, [skill]);

  return (
    <div className=" p-4 m-10 max-w-auto mx-auto bg-white rounded-xl shadow-lg flex  ">
      <div className="flex flex-wrap content-center">
        <div className="mx-2">
          
          <div className="text-xl font-medium text-black">I'm looking for </div>
          <QueryCardRelationship stateChanger={set_relationship_type} />
          {/* <input className="my-3 border border-black rounded-lg  px-1 " onChange={(e) => set_relationship_type(e.target.value)}/> */}
        </div>
        <div className="mx-2">
          <div className="text-xl font-medium text-black">that are skilled in </div>
          <QueryCardSelect stateChanger={set_skill} />
          {/* <input className="my-3 border border-black rounded-lg  px-1 " onChange={(e) => set_skill(e.target.value)}/> */}
        </div>
        <div className="mx-2">
          <div className="text-xl font-medium text-black">to build </div>
          <input className="my-3 border border-black rounded-lg  px-1 " onChange={(e) => set_search(e.target.value)}/>
        </div>

        <div>
        <div className="text-xl font-medium text-black"> </div>
          <button className="px-3 py-1 mt-9 text-white bg-green-normal rounded-lg" onClick={() => set_button_press(button_pressed + 1)}>
            S
          </button>
        </div>
      </div>
    </div>
  );
}
