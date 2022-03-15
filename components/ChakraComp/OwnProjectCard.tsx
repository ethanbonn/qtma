import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  VStack,
  chakra,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  SimpleGrid,
  Badge,
  Grid,
  Avatar,
  useColorModeValue,
  AvatarGroup,
  Tooltip,
  Flex,
  Divider,
} from "@chakra-ui/react";

import { Project } from "../../types/models";
import { EditIcon } from "@chakra-ui/icons";

// // create a clickable primitive
// const Clickable = (props) => {
//   const clickable = useClickable(props)
//   return <chakra.button display="inline-flex" {...clickable} />
// }

export default function ProjectCard(props: Project) {
  // const { name, skills, author_timezone, duration, author_name, author_picture, author_title, date_created } = props;
  const {
    name,
    skills,
    duration,
    date_created,
    authors,
    description,
    active,
    desired_relationship_type,
    _id,
  } = props;
  var current_date = new Date();
  var date_parsed = new Date(JSON.parse('"' + date_created + '"'));
  var diffence_in_days =
    (current_date.getTime() - date_parsed.getTime()) / (1000 * 3600 * 24);

  if (diffence_in_days <= 1) {
    var display_date = "today";
  } else if (diffence_in_days <= 7) {
    var display_date = "this week";
  } else {
    var display_date = date_parsed.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(Date(date_created).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  return (
    <Flex 
    // onClick={onOpen}
    >
      <Center py={6}>
        <Box
          maxW={"445px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"lg"}
          rounded={"2xl"}
          p={6}
          overflow={"hidden"}
          borderWidth="1px"
          _hover={{ bg: "grey.300", boxShadow: "outline" }}
          cursor={"pointer"}
        >
       
          <Stack>
            {/* <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              Project
            </Text> */}
            <Heading
              color={useColorModeValue("blue.500", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
              mb="2px"
            >
              {name}
            </Heading>

            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
              <AvatarGroup size="md" max={2}>
                {authors.map((user) => {
                  return (
                    <Avatar
                      src={user.profilePicture}
                      name={user.firstName + " " + user.lastName}
                    />
                  );
                })}
              </AvatarGroup>

              <Stack direction={"column"} mt="3px" spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>
                  {authors[0].firstName + " " + authors[0].lastName}
                </Text>
                <Text color={"gray.500"}>{authors[0].jobTitle}</Text>
              </Stack>
            </Stack>

            <Text mt="2px" color={"gray.500"}>
              <Text mb="2px" color={"gray.500"}>
                Timezone:{" "}
                <chakra.span fontWeight={600} color="blue.600">
                  {authors[0].timezone}
                </chakra.span>
              </Text>
            </Text>
            <Text mb="2px" color={"gray.500"}>
              Project Duration:{" "}
              <chakra.span
                fontWeight={600}
                color={
                  duration == "short"
                    ? "green.400"
                    : duration == "medium"
                    ? "yellow.400"
                    : "red.400"
                }
              >
                {" "}
                {duration}{" "}
              </chakra.span>{" "}
            </Text>

            <Text mb="2px" color={"gray.500"}>
              Date Created:{" "}
              <chakra.span fontWeight={600} color={"green.400"}>
                {" "}
                {display_date}{" "}
              </chakra.span>{" "}
            </Text>

            {/* <Text color={"gray.500"}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
              et ea rebum.
            </Text> */}
          </Stack>

          <VStack alignItems="flex-start" mt="3" mb="2px">
            <chakra.h2 fontSize="md" fontWeight="600">
              Skills
            </chakra.h2>
          </VStack>

          <Stack p="2" direction={["column", "row"]} spacing="5px">
            {skills.map((x) => {
              return (
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue("blue.500", "gray.800")}
                  fontWeight={"400"}
                  color="white"
                  rounded="xl"
                >
                  {x.name}
                </Badge>
              );
            })}
          </Stack>
          <Divider/>
          <a href={`/projects/${_id}/edit`}>
            <Button mt="3"
              type="button"
              colorScheme="green"
              // className="px-4 py-2 text-black bg-gray-light rounded-full shadow-md self-center"
            >
              Edit Project
              {"  "} <EditIcon />
            </Button>
          </a>
          {/* <Center>
            {" "}
            <Button borderRadius="2xl" mt="2" colorScheme="green" onClick={onOpen}>
              View Project
            </Button>
          </Center> */}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> {name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {" "}
                <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                  <AvatarGroup size="md" max={10}>
                    {authors.map((user) => {
                      return (
                        <Avatar
                          src={user.profilePicture}
                          name={user.firstName + " " + user.lastName}
                        />
                      );
                    })}
                  </AvatarGroup>

                  <Stack
                    direction={"column"}
                    mt="3px"
                    spacing={0}
                    fontSize={"sm"}
                  >
                    <Text fontWeight={600}>
                      {authors[0].firstName + " " + authors[0].lastName}
                    </Text>
                    <Text color={"gray.500"}>{authors[0].jobTitle}</Text>
                  </Stack>
                </Stack>
                <Text mt="2px" color={"gray.500"}>
                  <Text mb="2px" color={"gray.500"}>
                    Timezone:{" "}
                    <chakra.span fontWeight={600} color="blue.600">
                      {authors[0].timezone}
                    </chakra.span>
                  </Text>
                </Text>
                <Text mb="2px" color={"gray.500"}>
                  Project Duration:{" "}
                  <chakra.span
                    fontWeight={600}
                    color={
                      duration == "short"
                        ? "green.400"
                        : duration == "medium"
                        ? "yellow.400"
                        : "red.400"
                    }
                  >
                    {" "}
                    {duration}{" "}
                  </chakra.span>{" "}
                </Text>
                <Text mb="2px" color={"gray.500"}>
                  Date Created:{" "}
                  <chakra.span fontWeight={600} color={"green.400"}>
                    {" "}
                    {display_date}{" "}
                  </chakra.span>{" "}
                </Text>
                <br></br>
                <Text mb="2px" fontWeight={700} color={"black.500"}>
                  {description}
                </Text>
                <br></br>
                <VStack alignItems="flex-start" mt="3" mb="2px">
                  <chakra.h2 fontSize="md" fontWeight="600">
                    Desired Skills
                  </chakra.h2>
                </VStack>
                <Stack p="2" direction={["column", "row"]} spacing="5px">
                  {skills.map((x) => {
                    return (
                      <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue("blue.500", "gray.800")}
                        fontWeight={"400"}
                        color="white"
                        rounded="xl"
                      >
                        {x.name}
                      </Badge>
                    );
                  })}
                </Stack>
                <br></br>
                <Text mb="2px" color={"gray.500"}>
                  Working:{" "}
                  <chakra.span fontWeight={600} color={"green.400"}>
                    {" "}
                    {desired_relationship_type}{" "}
                  </chakra.span>{" "}
                </Text>
                <Text mb="2px" color={"gray.500"}>
                  Status:{" "}
                  {active ? (
                    <chakra.span fontWeight={600} color={"green.400"}>
                      Active
                    </chakra.span>
                  ) : (
                    <chakra.span fontWeight={600} color={"red.400"}>
                      Idle
                    </chakra.span>
                  )}
                </Text>
              </ModalBody>

              {/* 
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter> */}
            </ModalContent>
          </Modal>
        </Box>
      </Center>
    </Flex>
  );
}
function useClickable(props: any) {
  throw new Error("Function not implemented.");
}
