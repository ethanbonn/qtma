// this file is not in use
// refer to ProjectSkills instead



import React, { useState, useEffect } from "react";

import { Listbox, Transition } from "@headlessui/react";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import queryDB from "../functions/server/queryDB";
import QueryCardRelationship from "./QueryCardRelationship";
import QueryCardSelect from "./QueryCardSelect";
import ProjectSkills from "./Cards/SelectSkills/ProjectSkills";

export default function Card({ stateChanger }) {
  const [skill, setSkill] = useState([]);

  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor="country">Skilled In</FormLabel>
        <ProjectSkills stateChanger={stateChanger} initSkills={null}/>
      </FormControl>
    </Box>
  );
}
