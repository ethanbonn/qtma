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


interface State {
  readonly inputValue: string;
  current: string[];
}


// async function getSkillsDB () {
//     var skillOptions : [SkillOption] = await getSkills();
//     return skillOptions;
// }

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
    }, 1000);
  });



// export default function AsyncMulti() {
//   const [inputValue, setInputValue] = useState("");


//   // change this using mongo to a search
//   function filterSkills(inputValue: string, skillOptions: SkillOption[]) {
//     return skillOptions.filter((i) =>
//       i.label.toLowerCase().includes(inputValue.toLowerCase())
//     );
//   }

//   function promiseOptions(inputValue: string){
//       setInputValue(inputValue);
//       new Promise<Skill[]>((resolve) => {
//       setTimeout(async () => {
//           var options : Skill[] =  await getSkills();
//           console.log("options", options);
//           // map Skill type to SkillOption
//           if (options) {
//           var sOptions : SkillOption[] = options.map((x : Skill) => {return {    
//                                                                           value: x.name, 
//                                                                           label: x.name,
//                                                                           colour: x.colour}});
//           resolve(filterSkills(inputValue, sOptions));
//           }
//       }, 100);
//     });
//   }

//     return (
//       <AsyncSelect
//         value={inputValue}
//         // onChange={promiseOptions}
//         isMulti
//         cacheOptions
//         defaultOptions
//         loadOptions={promiseOptions}
//       />

//     );




// }

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

