// async 
// https://react-select.com/async

import { useAuthUser } from 'next-firebase-auth';
import React, { Component, useEffect, useState } from 'react';
import dbConnect from "../../../utils/dbConnect";
import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select';

import getSkills from '../../../functions/server/getSkills';
import type { Skill } from "../../../types/models";
import baseUrl from "../../../utils/baseUrl";

export interface SkillOption {
    readonly value: string;
    readonly label: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
    readonly _id: string;
  }



export default function AsyncMulti({stateChanger, initSkills}) {
  const [inputValue, setInputValue] = useState<SkillOption[] | []>([]);
  const [reloadOptions, setReloadOption] = useState(0);

  // initSkills = [
  //   {
  //     _id: '61ef67b73c5bc285d88b36a2',
  //     name: 'javascript',
  //     followers: [],
  //     project_ids: []
  //   }
  // ];
  // var def = initSkills.map((x : Skill) =>  { return  { value: x.name, label: x.name, _id: x._id } })
  // console.log(def);
  console.log("INIT SKILLS", initSkills);
  useEffect(() => {
    if (inputValue){
      const temp = initSkills.map((x : Skill) => {return {    
        value: x.name, 
        label: x.name,
        _id: x._id
        }});
      console.log(temp);
      setInputValue(temp);
    }
  },[initSkills]);
  // },[]);


  useEffect(() => {
    console.log("MAPPING", inputValue);
    stateChanger(inputValue.map((x) => { return x._id}));
  }, [inputValue]);

  // change this using mongo to a search
  function filterSkills(inputValue: string, skillOptions: SkillOption[]) {
    if (inputValue === "") return skillOptions;
    return skillOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );


  }

  const promiseOptions = async (inValue) => {
    var options : Skill[] =  await getSkills();
    if (options) {
      var sOptions : SkillOption[] = options.map((x : Skill) => {return {    
                                                                      value: x.name, 
                                                                      label: x.name,
                                                                      _id: x._id
                                                                      }});      
      if (typeof(inValue) === "string"){
        return filterSkills(inValue, sOptions);
        }
      else {
        setInputValue(inValue);
        return sOptions;
      }
    } 

    return []
  }
  
  const { getIdToken } = useAuthUser();

  async function createSkill(inValue) {

    const token = await getIdToken();

    const response  = await fetch(
      `${baseUrl}/api/skill/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {})
        },
        body: JSON.stringify({
          name: inValue,
        })
      }
    );
    const res = await response.json();
    // console.log("response", response);
    // console.log(response.json);
    // console.log(JSON.stringify(response.body));
    // console.log(data['data']);
    
    // console.log(data['data']._id);
    setInputValue(inputValue => [...inputValue, {value: inValue, label: inValue, _id: res['data']._id}]);

    setReloadOption(reloadOptions + 1);


  }
      return (
        <AsyncCreatableSelect
        // // <AsyncSelect
        //   value={inputValue}
        //   onChange={promiseOptions}
        //   isMulti
        //   isSearchable
        //   defaultOptions
        //   loadOptions={promiseOptions}
        // />
          key={reloadOptions}
          value={inputValue}
          // defaultValue={def}
          onChange={promiseOptions}
          isMulti
          isSearchable
          // cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          onCreateOption={createSkill}
          formatCreateLabel={userInput => `Add "${userInput}"`}
        />
      );
   

}



