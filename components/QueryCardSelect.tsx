// async 
// https://react-select.com/async


import React, { Component, useEffect } from 'react';
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


interface State {
  readonly inputValue: string;
  current: string[];
}


// async function getSkillsDB () {
//     var skillOptions : [SkillOption] = await getSkills();
//     return skillOptions;
// }

// change this using mongo to a search
const filterSkills = (inputValue: string, skillOptions: SkillOption[]) => {
  return skillOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};



const promiseOptions = (inputValue: string) =>
//   new Promise<SkillOption[]>((resolve) => {
    new Promise<Skill[]>((resolve) => {
    setTimeout(async () => {
        var options : Skill[] =  await getSkills();
        // map Skill type to SkillOption
        if (options) {
        var sOptions : SkillOption[] = options.map((x : Skill) => {return {    
                                                                        value: x.name, 
                                                                        label: x.name,
                                                                        colour: x.colour}});
        resolve(filterSkills(inputValue, sOptions));
        }
    }, 100);
  });

export default class AsyncMulti extends Component<{}, State> {
  state: State = { inputValue: '' , current : []};


  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    console.log(inputValue);
    return inputValue;
  };
  render() {
    return (
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />

    );
  }
}

