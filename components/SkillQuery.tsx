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

export default function Card({ stateChanger }) {
  const [skill, setSkill] = useState([]);

  //   const [button_pressed, set_button_press] = useState(0);

  //   useEffect(() => {
  //     async function handler() {
  //       console.log(skill.map((x) => x.value));
  //       //   await queryDB(skill.map((x) => x.value))
  //       //     .then((response) => response)
  //       //     .then((res) => stateChanger(res));
  //     }
  //     handler();
  //   }, [skill]);

  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor="country">Skilled In</FormLabel>
        <QueryCardSelect stateChanger={stateChanger} />
      </FormControl>
    </Box>
  );
}
