// async 
// https://react-select.com/async

import { useAuthUser } from 'next-firebase-auth';
import React, { Component, useEffect, useState } from 'react';
import dbConnect from "../../utils/dbConnect";
import AsyncSelect from 'react-select/async';
import type { User } from "../../types/models";
import baseUrl from "../../utils/baseUrl";
import { Avatar } from '@chakra-ui/react';

export interface UserOption {
    readonly value: string;
    readonly label: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly profilePicture?: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }

export default function AsyncMulti({stateChanger, initUsers}) {
  const [inputValue, setInputValue] = useState<UserOption[] | []>([]);
  const [reloadOptions, setReloadOption] = useState(0);

  useEffect(() => {
    if (inputValue){
      const temp = initUsers.map((x : User) => {return {    
        value: x.firstName + " " + x.lastName,
        label: "@" + x.userName + " (" + x.firstName + " " + x.lastName + ")",
        _id: x._id,
        firstName: x.firstName,
        lastName: x.lastName,
        profilePicture: x.profilePicture,
        isFixed: true,
        }});
      console.log(temp);
      setInputValue(temp);
    }
  },[initUsers]);
  // },[]);


  useEffect(() => {
    console.log("MAPPING", inputValue);
    stateChanger(inputValue.map((x) => { return x._id }));
  }, [inputValue]);

  // change this using mongo to a search
  function filterUsers(inputValue: string, userOptions: UserOption[]) {
    if (inputValue === "") return userOptions;
    return userOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  // const promiseOptions = async (inputValue: string | object) => {
  const promiseOptions = async (inputValue) => {
    var options : User[] = await fetch(`${baseUrl}/api/users/search/query=${inputValue}`)
      .then((response) => response.json())
      .then((res) => res.data);
    if (options) {
      var uOptions : UserOption[] = options.map((x : User) => {
        return {
          _id: x._id,
          value: x.firstName + " " + x.lastName,
          label: "@" + x.userName + " (" + x.firstName + " " + x.lastName + ")",

          // email: x.email,
          // userName: x.userName,
          firstName: x.firstName,
          lastName: x.lastName,
          profilePicture: x.profilePicture,
          // jobTitle: x.jobTitle,
          // userDescription: x.userDescription,
          // links: x.links,
          // date_created: x.date_created,
          // timezone: x.timezone,
          // project_ids: x.project_ids,
          // // projects: x.projects,
          // // skills: x.skills,
          // skill_ids: x.skill_ids
        }
      });
      if (typeof(inputValue) === "string"){
        return filterUsers(inputValue, uOptions);
        }
      else {
        setInputValue(inputValue);
        stateChanger(inputValue);
        return uOptions;
      }
    } 
    return []
  }
  
  const { getIdToken } = useAuthUser();

    return (
      <AsyncSelect
        value={inputValue}
        onChange={promiseOptions}
        isMulti
        isSearchable
        // cacheOptions
        formatOptionLabel={opt => (
          <div>
            <Avatar
            size={"xs"}
            src={opt.profilePicture}
            name={opt.firstName + " " + opt.lastName}
            mb={4}
            pos={"relative"}
          />
          <span>&ensp; {opt.label}</span>
            
          </div>
        )}
        defaultOptions
        // styles={{multiValue: (provided, state) => ({
          
        // })}}
        loadOptions={promiseOptions}
        isOptionDisabled={(option) => option.isDisabled}
        isClearable={true}

      />

    );

}



