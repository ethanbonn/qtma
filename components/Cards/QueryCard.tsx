import React, { useState, useEffect } from "react";

import { Listbox, Transition } from "@headlessui/react";
import {
  Box,
  Center,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  IconButton,
  Button,
  Input,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import queryDB from "../../functions/server/queryDB";
import QueryCardRelationship from "../QueryCardRelationship";
import QueryCardSelect from "../QueryCardSelect";

export default function Card({ projectStateChanger, profileStateChanger }) {
  const [relationship_type, set_relationship_type] = useState("");
  const [skill, set_skill] = useState([]);
  const [search, set_search] = useState("");

  const [button_pressed, set_button_press] = useState(0);

  useEffect(() => {
    async function updateHandlers(res) {
      console.log("yoyo", res[0], typeof res[0]);
      const projects = res[0];
      const users = res[1];
      projectStateChanger(projects);
      profileStateChanger(users);
    }

    async function handler() {
      console.log("QUERYING", relationship_type);
      console.log(search);
      console.log(skill.map((x) => x.value));
      await queryDB(
        relationship_type,
        search,
        skill.map((x) => x.value)
      )
        .then((response) => response)
        .then((res) => updateHandlers(res));
    }
    handler();
  }, [button_pressed]);

  useEffect(() => {}, [skill]);

  return (
    <Center>
      <Box
        maxW="650px"
        w="full"
        bg={useColorModeValue("white", "gray.900")}
        boxShadow="2xl"
        rounded="lg"
        p={3}
        mb="10"
        // textAlign={"center"}
      >
        {/* <Stack direction={["column", "row"]} spacing="24px">
                <Box >

                </Box>

                <Box >
                                <Button colorScheme="green">Search</Button>

                </Box>

              </Stack> */}

        <Grid
          // h="200px"
          templateColumns={["repeat(5, 2fr)", "repeat(7, 2fr)"]}
          gap={3}
        >
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel htmlFor="country">I'm Looking for</FormLabel>
              <Select
                id="country"
                onChange={(event) =>
                  set_relationship_type(event.currentTarget.value)
                }
              >
                <option value="" />
                <option value="project">projects</option>
                <option value="people">people</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel htmlFor="country">
                {relationship_type == "people"
                  ? "Skilled In"
                  : "Using These Skills"}
              </FormLabel>
              <QueryCardSelect projectStateChanger={set_skill} />
            </FormControl>
          </GridItem>{" "}
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel htmlFor="country">
                {relationship_type == "people" ? "Interested In" : "To Build"}
              </FormLabel>
              <Input
                id="country"
                placeholder="anything you want!"
                onChange={(event) => set_search(event.currentTarget.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            {" "}
            <IconButton
              mt="8"
              colorScheme="green"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<SearchIcon />}
              onClick={() => set_button_press(button_pressed + 1)}
            />
          </GridItem>
        </Grid>

        <Center mt="4"> </Center>
      </Box>
    </Center>
  );
}
