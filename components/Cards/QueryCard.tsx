import React from "react";
import { useState, useEffect } from "react";
import queryDB from "../../functions/server/queryDB";
import { Listbox, Transition } from "@headlessui/react";
import QueryCardRelationship from "../QueryCardRelationship";
import QueryCardSelect from "../QueryCardSelect";
import { Box, Center, FormControl, FormLabel, IconButton, Input, Select, SimpleGrid,   useColorModeValue } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";


export default function Card({ stateChanger }) {
  const [relationship_type, set_relationship_type] = useState("collaborator");
  const [skill, set_skill] = useState([]);
  const [search, set_search] = useState("");

  const [button_pressed, set_button_press] = useState(0);

  useEffect(() => {
    async function handler() {
      console.log("QUERYING", relationship_type);
      console.log( search);
      console.log( skill.map((x) => x.value));
      await queryDB(relationship_type, search, skill.map((x) => x.value)).then(response => response)
      .then((res) => stateChanger(res))
    }
    handler();

  }, [button_pressed]);

  useEffect( () => {
  }, [skill]);

  return (
    // <div className=" p-4 m-10 max-w-auto mx-auto bg-white rounded-xl shadow-lg flex  ">
    //   <div className="flex flex-wrap content-center">
    //     <div className="mx-2"> 
    //       <div className="text-xl font-medium text-black">I'm looking for </div>
    //       <QueryCardRelationship stateChanger={set_relationship_type} />
    //       {/* <input className="my-3 border border-black rounded-lg  px-1 " onChange={(e) => set_relationship_type(e.target.value)}/> */}
    //     </div>
    //     <div className="mx-2">
    //       <div className="text-xl font-medium text-black">that are skilled in </div>
    //       <QueryCardSelect stateChanger={set_skill} />
    //       {/* <input className="my-3 border border-black rounded-lg  px-1 " onChange={(e) => set_skill(e.target.value)}/> */}
    //     </div>
    //     <div className="mx-2">
    //       <div className="text-xl font-medium text-black">to build </div>
    //       <input className="my-3 border border-black rounded-lg  px-1 " onChange={(e) => set_search(e.target.value)}/>
    //     </div>

    //     <div>
    //     <div className="text-xl font-medium text-black"> </div>
    //       <button className="px-3 py-1 mt-9 text-white bg-green-normal rounded-lg" onClick={() => set_button_press(button_pressed + 1)}>
    //         S
    //       </button>
    //     </div>
    //   </div>
    // </div>

          <Center>
            <Box
              maxW={"650px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              rounded={"lg"}
              p={5}
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
              <SimpleGrid
                minChildWidth="70px"
                spacing="30px"
                columns={[2, 2, 2, 1]}
              >
                <Box>
                  {/* <Text fontWeight={600} fontSize="lg">
                    I'm looking for{" "}
                  </Text>
                  <Input placeholder="a partner" />{" "} */}
                  <FormControl>
                    <FormLabel htmlFor="country">I'm Looking for</FormLabel>
                    <Select id="country" onSelect={(text) => set_relationship_type(String(text))} >
                      <option>collaborator</option>
                      <option>sponsor</option>
                    </Select>
                  </FormControl>
                </Box>
                <Box >
                  <FormControl>
                    <FormLabel htmlFor="country">Skilled In</FormLabel>
                      <QueryCardSelect stateChanger={set_skill} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="country">To Build</FormLabel>
                    <Input id="country" placeholder="anything you want!" onChange={(text) => set_search(String(text))}>
                    </Input>
                  </FormControl>
                </Box>

                {/* <Box>
             
                  <FormControl>
                    <FormLabel htmlFor="country">⭐</FormLabel>
                    <Button colorScheme="green">
                    Search
                  </Button>
                  </FormControl>
                </Box> */}

                <Box mt="8" >
                  {/* <Text fontSize="md">  </Text> */}

                  <IconButton
                    colorScheme="green"
                    aria-label="Call Sage"
                    fontSize="20px"
                    icon={<SearchIcon />}
                    onClick={() => set_button_press(button_pressed + 1)}
                  />
                </Box>
              </SimpleGrid>
              <Center mt="4"> </Center>
            </Box>
          </Center> 
  );
}
