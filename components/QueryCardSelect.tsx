// async 
// https://react-select.com/async


import React, { Component, useEffect, useState } from 'react';
import dbConnect from "../utils/dbConnect";
import AsyncSelect from 'react-select/async';
import getSkills from '../functions/server/getSkills';
import type { Skill } from "../types/models";

export interface SkillOption {
    readonly value: string;
    readonly label: string;
    readonly colour: string;
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
                                                                      colour: x.colour}});      
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
  
    return (
      <AsyncSelect
        value={inputValue}
        onChange={promiseOptions}
        isMulti
        isSearchable
        // cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />

    );

}



