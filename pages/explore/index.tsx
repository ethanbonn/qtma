import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
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
  InputLeftAddon,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChatIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import Footer from "../../components/ChakraComp/Footer";
import Navbar from "../../components/ChakraComp/Navbar";
import ProjectCard from "../../components/ChakraComp/ProjectCard";
import Login from "../../components/ChakraComp/Login";
import Signup from "../../components/ChakraComp/Signup";
import QueryFilter from "../../components/ChakraComp/QueryFilter";
import QueryCard from "";

import { useState, useEffect } from "react";

import ProfileCard from "../../components/ChakraComp/ProfileCard";

import ProfileSearchBar from "../components/ProfileSearchBar";

export default function ExplorePage() {
  const { isOpen, onToggle } = useDisclosure();
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const [projects, update_projects] = useState([]);

  return (
    <div>
      <Navbar />

      <Center mt="15" bg={useColorModeValue("white", "gray.700")}>
        <Container maxW={"5xl"}>
          <QueryCard stateChanger={update_projects} />

          <VStack alignItems="flex-start" spacing="20px" mt="20">
            <chakra.h2 fontSize="2xl" fontWeight="700">
              Featured Projects
            </chakra.h2>
          </VStack>
          <ProfileSearchBar />
          <SimpleGrid
            alignItems={"center"}
            columns={[1, 1, 3]}
            spacing="40px"
          ></SimpleGrid>

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

          <SimpleGrid
            alignItems={"center"}
            columns={[1, 1, 3]}
            spacing="40px"
          ></SimpleGrid>

          <Center mt="8px" mb="30px">
            {" "}
            <Button colorScheme="green" rounded="3xl">
              Explore more profiles
            </Button>
          </Center>
        </Container>
      </Center>
      <Login />
      <Signup />

      <Footer />
    </div>
  );
}
