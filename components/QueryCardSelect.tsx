// async 
// https://react-select.com/async

import { useAuthUser } from 'next-firebase-auth';
import React, { Component, useEffect, useState } from 'react';
import dbConnect from "../utils/dbConnect";
import AsyncCreatableSelect from 'react-select/async-creatable';
import getSkills from '../functions/server/getSkills';
import type { Skill } from "../types/models";
import baseUrl from "../utils/baseUrl";

export interface SkillOption {
    readonly value: string;
    readonly label: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }



export default function AsyncMulti({stateChanger}) {
  const [inputValue, setInputValue] = useState("");
  // const [selectedValue, setSelectedValue] = useState([]);
  // const [userSelected, setUserSelected] = useState([]);


  // change this using mongo to a search
  function filterSkills(inputValue: string, skillOptions: SkillOption[]) {
    if (inputValue === "") return skillOptions;
    return skillOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );


  }

  // const promiseOptions = async (inputValue: string | object) => {
  const promiseOptions = async (inputValue) => {
    var options : Skill[] =  await getSkills();
    if (options) {
      var sOptions : SkillOption[] = options.map((x : Skill) => {return {    
                                                                      value: x.name, 
                                                                      label: x.name,
                                                                      }});      
      if (typeof(inputValue) === "string"){
        return filterSkills(inputValue, sOptions);
        }
      else {
        setInputValue(inputValue);
        stateChanger(inputValue);
        return sOptions;
      }
    } 
    return []
  }
  
  const { getIdToken } = useAuthUser();

  async function createSkill(inputValue) {

    const token = await getIdToken();

    await fetch(
      `${baseUrl}/api/skill/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {})
        },
        body: JSON.stringify({
          name: inputValue,
        })
      }
    );
  }

    return (
      <AsyncCreatableSelect
        value={inputValue}
        onChange={promiseOptions}
        isMulti
        isSearchable
        // cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        onCreateOption={createSkill}
      />

    );

}



