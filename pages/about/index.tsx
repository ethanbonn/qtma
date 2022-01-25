import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Center,
  Divider,
  SimpleGrid,
  Image,
  Heading,
  Input,
  IconButton,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Collapse,
  Stack,
  Container,
  Text,
  Link,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  VStack,
  chakra,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChatIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import ProfileCard from "../../components/ChakraComp/ProfileCard";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <div>
      <Box>
        <Flex
          bg={useColorModeValue("green.300", "gray.800")}
          color={useColorModeValue("gray.600", "green.300")}
          minH={"55px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              colorScheme={"green"}
              // variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>

          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Link href="/">
              <Flex
                display={{ base: "none", md: "flex" }}
                ml={{ base: 20, md: 20, sm: 0 }}
              >
                <Image alt="Soar Logo" src="/soarlogo.png"></Image>
              </Flex>
            </Link>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
            mr={{ base: 20, md: 20, sm: 0 }}
          >
            <IconButton
              size="md"
              aria-label={`Switch to ${text} mode`}
              colorScheme="green"
              //   aria-label="Call Sage"
              fontSize="20px"
              ml={{ base: "0", md: "3" }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
            <IconButton
              colorScheme="green"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<ChatIcon />}
            />

            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton as={Button} colorScheme="green" minW={0}>
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Stack>
        </Flex>

        {/* <Collapse in={isOpen} animateOpacity children={<MobileNav />} /> */}
      </Box>
      {/* <Divider color="blue" /> */}
      <Center bg={useColorModeValue("green.300", "gray.700")}>
        <Container maxW={"5xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            pt={{ base: 10, md: 10 }}
          >
            {/* <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
              lineHeight={"130%"}
              color={"white"}
              mx="8"
            >
              Build the dream team to soar your ideas to the moon. 🚀
            </Heading> */}

            <Heading color={"white"} mb="10">
              {" "}
              Build the dream team to soar your ideas to the moon. 🚀
            </Heading>
          </Stack>

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
                columns={[2, 2, 2]}
              >
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
                    <Select id="country">
                      <option>Profiles</option>
                      <option>Projects</option>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="country">To Build</FormLabel>
                    <Select id="country">
                      <option>Profiles</option>
                      <option>Projects</option>
                    </Select>
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

                {/* <Box mt="6">
                  <Text fontSize="md">  </Text>

                  <IconButton
                    colorScheme="green"
                    aria-label="Call Sage"
                    fontSize="20px"
                    icon={<SearchIcon />}
                  />
                </Box> */}
              </SimpleGrid>
              {/* <Center mt="4"> */}{" "}
              {/* </Center> */}
            </Box>
          </Center>

          <Container maxW={"7xl"} p="10">
            <SimpleGrid columns={[1, 1, 3]} spacing="40px">
              <Flex
                flex={1}
                justify={"center"}
                align={"center"}
                position={"relative"}
                w={"full"}
              >
                <Box
                  position={"relative"}
                  height={"100%"}
                  width={"100%"}
                  rounded={"2xl"}
                  boxShadow={"2xl"}
                  overflow={"hidden"}
                >
                  <Image
                    alt={"Hero Image"}
                    fit={"cover"}
                    align={"center"}
                    w={"100%"}
                    h={"100%"}
                    src={
                      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                    }
                  />
                </Box>
              </Flex>
              <Flex
                flex={1}
                justify={"center"}
                align={"center"}
                position={"relative"}
                w={"full"}
              >
                <Box
                  position={"relative"}
                  height={"100%"}
                  width={"100%"}
                  rounded={"2xl"}
                  boxShadow={"2xl"}
                  // width={"full"}
                  overflow={"hidden"}
                >
                  <Image
                    alt={"Hero Image"}
                    fit={"cover"}
                    align={"center"}
                    w={"100%"}
                    h={"100%"}
                    src={
                      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                    }
                  />
                </Box>
              </Flex>

              <Flex
                flex={1}
                justify={"center"}
                align={"center"}
                position={"relative"}
                w={"full"}
              >
                <Box
                  position={"relative"}
                  height={"100%"}
                  width={"100%"}
                  rounded={"2xl"}
                  boxShadow={"2xl"}
                  // width={"full"}
                  overflow={"hidden"}
                >
                  <Image
                    alt={"Hero Image"}
                    fit={"cover"}
                    align={"center"}
                    w={"100%"}
                    h={"100%"}
                    src={
                      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                    }
                  />
                </Box>
              </Flex>
            </SimpleGrid>
          </Container>
        </Container>
      </Center>

      <Center mt="15" bg={useColorModeValue("white", "gray.700")}>
        <Container maxW={"5xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            pt={{ base: 10, md: 10 }}
          >
            {/* <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
              lineHeight={"130%"}
              color={"white"}
              mx="8"
            >
              Build the dream team to soar your ideas to the moon. 🚀
            </Heading> */}

            <Heading color={useColorModeValue("blue.500", "white")}>
              {" "}
              Discover hundreds of projects to build, and connect with other
              bright-minded individuals. ⭐
            </Heading>
          </Stack>

          <VStack alignItems="flex-start" spacing="20px" mt="20">
            <chakra.h2 fontSize="2xl" fontWeight="700">
              Featured Projects
            </chakra.h2>

            <SimpleGrid columns={[1, 1, 3]} spacing="40px">
              <ProfileCard />
              <ProfileCard />

              <ProfileCard />

              <ProfileCard />

              <ProfileCard />
              <ProfileCard />
            </SimpleGrid>

            <chakra.h2 fontSize="2xl" fontWeight="700">
              Profiles
            </chakra.h2>

            <SimpleGrid columns={[1, 1, 3]} spacing="40px">
              <ProfileCard />
              <ProfileCard />

              <ProfileCard />

              <ProfileCard />

              <ProfileCard />
              <ProfileCard />
            </SimpleGrid>
          </VStack>
        </Container>
      </Center>
    </div>
  );
}
