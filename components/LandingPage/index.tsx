import { useState, useEffect } from "react";
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
import PreviewCard from "./PreviewCard";
// import ProjectCard from "../ChakraComp/ProjectCard";
// import ProfileCard from "../ChakraComp/ProfileCard";
// import NavBar from "../NavBar/NavBar";
// import Footer from "../Footer";
import Card from "../Cards/QueryCard";
import queryDB from "../../functions/server/queryDB";
import ProfileSearchBar from "../ProfileSearchBar";

import Footer from "../ChakraComp/Footer";
import Navbar from "../ChakraComp/Navbar";
import ProjectCard from "../ChakraComp/ProjectCard";
import Login from "../ChakraComp/Login";

import ProfileCard from "../ChakraComp/ProfileCard";
import { UnregisteredUser } from "../../types";
import { User } from "../../types/models";
import QueryCard from "../Cards/QueryCard";
import getProfiles from "../../functions/server/getProfiles";

export default function LandingPage(props: UnregisteredUser | User) {
  const [projects, update_projects] = useState([]);
  const [profiles, update_profiles] = useState([]);

  const { isOpen, onToggle } = useDisclosure();
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  useEffect(() => {
    async function loadProfiles() {
      const display_profiles = await getProfiles();
      update_profiles(display_profiles);
    }
    loadProfiles();
  // }, [projects]);
  }, []);

  useEffect(() => {}, [profiles]);

  return (
    <div>
      {/* <ProfileSearchBar/> */}
      <Box>
        <Navbar {...props} />
        <Flex
          bg={useColorModeValue("green.300", "gray.800")}
          color={useColorModeValue("gray.600", "green.300")}
          //   minH={"55px"}
          //   py={{ base: 2 }}
          //   px={{ base: 4 }}
          //   borderBottom={1}
          //   borderStyle={"solid"}
          //   borderColor={useColorModeValue("gray.200", "gray.900")}
          //   align={"center"}
          // >

          //   <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          //     <Link href="/">
          //       <Flex
          //         display={{ base: "flex", md: "flex" }}
          //         ml={{ base: 20, md: 20, sm: 0 }}
          //       >
          //         <Image alt="Soar Logo" src="/soarlogo.png"></Image>
          //       </Flex>
          //     </Link>
          //   </Flex>

          //   <Stack
          //     flex={{ base: 1, md: 0 }}
          //     justify={"flex-end"}
          //     direction={"row"}
          //     spacing={6}
          //     mr={{ base: 20, md: 20, sm: 0 }}
          //   >
          //     <IconButton
          //       size="md"
          //       aria-label={`Switch to ${text} mode`}
          //       colorScheme="green"
          //       //   aria-label="Call Sage"
          //       ml={{ base: "0", md: "3" }}
          //       onClick={toggleMode}
          //       icon={<SwitchIcon />}
          //     />
          //     <IconButton
          //       colorScheme="green"
          //       aria-label="Call Sage"
          //       fontSize="20px"
          //       icon={<ChatIcon />}
        />

        {/* <Flex alignItems={"center"}>
              <Menu>
                <MenuButton as={Button} colorScheme="green" minW={0}>
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuItem>Edit Profile</MenuItem>
                  <MenuItem>About</MenuItem>
                  <MenuDivider />
                  <MenuItem>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Stack>
        </Flex> */}

        {/* <Collapse in={isOpen} animateOpacity children={<MobileNav />} /> */}
      </Box>
      {/* <Divider color="blue" /> */}
      <Center bg={useColorModeValue("green.300", "gray.700")}>
        <Container maxW="5xl">
          <Stack
            as={Box}
            textAlign="center"
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

            <Heading color="white" mb="10">
              {" "}
              Build the dream team to soar your ideas to the moon. 🚀
            </Heading>
          </Stack>

          <QueryCard
            projectStateChanger={update_projects}
            profileStateChanger={update_profiles}
          />

          <Container maxW="7xl" p="10">
            <SimpleGrid columns={[1, 1, 3]} spacing="40px">
              <Flex
                flex={1}
                justify="center"
                align="center"
                position="relative"
                w="full"
              >
                <Box
                  position="relative"
                  height="100%"
                  width="100%"
                  rounded="2xl"
                  boxShadow="2xl"
                  overflow="hidden"
                >
                  <Image
                    alt="Hero Image"
                    fit="cover"
                    align="center"
                    w="100%"
                    h="100%"
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  />
                </Box>
              </Flex>
              <Flex
                flex={1}
                justify="center"
                align="center"
                position="relative"
                w="full"
              >
                <Box
                  position="relative"
                  height="100%"
                  width="100%"
                  rounded="2xl"
                  boxShadow="2xl"
                  // width={"full"}
                  overflow="hidden"
                >
                  <Image
                    alt="Hero Image"
                    fit="cover"
                    align="center"
                    w="100%"
                    h="100%"
                    src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  />
                </Box>
              </Flex>

              <Flex
                flex={1}
                justify="center"
                align="center"
                position="relative"
                w="full"
              >
                <Box
                  position="relative"
                  height="100%"
                  width="100%"
                  rounded="2xl"
                  boxShadow="2xl"
                  // width={"full"}
                  overflow="hidden"
                >
                  <Image
                    alt="Hero Image"
                    fit="cover"
                    align="center"
                    w="100%"
                    h="100%"
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  />
                </Box>
              </Flex>
            </SimpleGrid>
          </Container>
        </Container>
      </Center>

      <Center mt="15" bg={useColorModeValue("white", "gray.800")}>
        <Container maxW="5xl">
          <Stack
            as={Box}
            textAlign="center"
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
          </VStack>

          <SimpleGrid alignItems="center" columns={[1, 1, 3]} spacing="40px">
            {projects.length === 0 ? (
              <>
                <p>No data</p>
              </>
            ) : (
              <>
                {projects.map((proj) => (
                  <ProjectCard
                    name={proj.name}
                    skills={proj.skills}
                    {...proj}
                  />
                ))}
              </>
            )}
          </SimpleGrid>

          <Center mt="8px">
            {" "}
            <Button colorScheme="green" rounded="3xl">
              Explore more projects
            </Button>
          </Center>

          <VStack alignItems="flex-start" spacing="20px" mt="30">
            <chakra.h2 mt="30" fontSize="2xl" fontWeight="700">
              Profiles
            </chakra.h2>
          </VStack>

          <SimpleGrid alignItems="center" columns={[1, 1, 3]} spacing="40px">
            {profiles.length === 0 ? (
              <>
                <p>No data</p>
              </>
            ) : (
              <>
                {profiles.map((profile) => (
                  <ProfileCard {...profile} />
                ))}
              </>
            )}
          </SimpleGrid>

          <Center mt="8px" mb="30px">
            {" "}
            <Button colorScheme="green" rounded="3xl">
              Explore more profiles
            </Button>
          </Center>
        </Container>
      </Center>
      {/* <Login /> */}

      <Footer />
    </div>
  );
}
