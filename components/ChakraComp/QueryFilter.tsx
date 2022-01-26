import {
  Center,
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Input,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

export default function QueryFilter() {
  return (
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
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={2}
        >
          <GridItem rowSpan={0} colSpan={5}>
            <SimpleGrid minChildWidth="70px" spacing="30px" columns={[2, 2, 2]}>
              <Box>
                {/* <Text fontWeight={600} fontSize="lg">
            I'm looking for{" "}
          </Text>
          <Input placeholder="a partner" />{" "} */}
                <FormControl>
                  <FormLabel htmlFor="country">I'm Looking for</FormLabel>
                  <Select id="country">
                    <option>Profiles</option>
                    <option>Projects</option>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel htmlFor="country">Skilled In</FormLabel>
                  <Input placeholder="Unity" />
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel htmlFor="country">To Build</FormLabel>
                  <Input placeholder="Indie Games" />
                </FormControl>
              </Box>
            </SimpleGrid>
          </GridItem>

          <GridItem colSpan={0} mt="8" ml="3">
            {/* <Button colorScheme="green">Search</Button> */}
            <IconButton
              colorScheme="green"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<SearchIcon />}
            />
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
}
