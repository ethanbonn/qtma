import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  VStack,
  Divider,
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
} from "@chakra-ui/react";

import { EmailIcon } from "@chakra-ui/icons";

import { Project } from "../../types/models";
import MailButton from "./Mail";
import { Helmet } from "react-helmet";
import { useRef, useEffect, useState } from "react";

// // create a clickable primitive
// const Clickable = (props) => {
//   const clickable = useClickable(props)
//   return <chakra.button display="inline-flex" {...clickable} />
// }

export default function ProjectCard(props: Project) {
  const inputRef = useRef(null);

  const [mail, setMail] = useState(false);

  const {
    name,
    skills,
    duration,
    date_created,
    authors,
    description,
    active,
    desired_relationship_type,
  } = props;

  var author_emails = "";
  for (var i = 0; i < authors.length; i++) {
    author_emails += authors[i].email + ",";
  }
  const author_email_text = author_emails.slice(0, -1);

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

  useEffect(() => {
    if (mail) {
      setMail(false);
      setTimeout(() => {
        inputRef.current.click();
      }, 500);
    }
  }, [mail]);

  // console.log(Date(date_created).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  return (
    <Center py={6}>
      <Flex>
        <Helmet>
            
          <script src="https://cdn.jsdelivr.net/npm/mailtoui@1.0.3/dist/mailtoui-min.js"></script>

        </Helmet>
        <a
          ref={inputRef}
          className="mailtoui"
          href={
            "mailto:" +
            author_email_text +
            "?subject=Soar%20Project:%20" +
            name +
            "&bcc=team@soarup.io&body=Introduce%20yourself!%20"
          }
          // style={{
          //   visibility: "hidden",
          //   zIndex: 1,
          //   padding: "0px",
          //   margin: "0px",
          // }}
        ></a>
        

        <Flex onClick={onOpen}>
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
                    <a href={'profile/' + user.userName}>  
                      <Avatar
                        src={user.profilePicture}
                        name={user.firstName + " " + user.lastName}
                      />
                    </a>
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

            {/* <Stack p="2" direction={["column", "row"]} spacing="5px"> */}

            <div>
              {skills.map((x) => {
                return (
                  <Badge
                    mr="1"
                    my="1"
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
            </div>

            {/* </Stack> */}
            {/* <Center>
            {" "}
            <Button borderRadius="2xl" mt="2" colorScheme="green" onClick={onOpen}>
              View Project
            </Button>
          </Center> */}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                {/* <ModalHeader> {name}</ModalHeader> */}

                <ModalHeader
                  color={useColorModeValue("blue.500", "white")}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                  mb="2px"
                >
                  {name}
                </ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                  {/* {" "} */}
                  <Center>
                    <div>
                      <Stack
                        mt={1}
                        direction={"row"}
                        spacing={2}
                        align={"center"}
                      >
                        {/* <AvatarGroup size="md" max={10}>
                          {authors.map((user) => {
                            return (
                              <Avatar
                                src={user.profilePicture}
                                name={user.firstName + " " + user.lastName}
                              />
                            );
                          })}
                        </AvatarGroup> */}

                        <Stack
                          // direction={"column"}
                          direction={[ "column", "row"]}

                          mt="3px"
                          spacing={5}
                          fontSize={"sm"}
                        >
                        {authors.map((user) => {
                            return (
                            <div>
                              <Center>
                                <Avatar
                                src={user.profilePicture}
                                name={user.firstName + " " + user.lastName}
                                />
                              </Center>
                              <Center>
                                <a href={'profile/' + user.userName}>
                                  <Text fontWeight={600}>
                                  {user.firstName + " " + user.lastName}
                                  </Text>
                                </a>
                              </Center>
                              <Center>
                                <Text color={"gray.500"}>{user.jobTitle}</Text>
                              </Center>
                            </div>
                              
                            );
                          })}
                          {/* <Text fontWeight={600}>
                            {authors[0].firstName + " " + authors[0].lastName}
                          </Text>
                          <Text color={"gray.500"}>{authors[0].jobTitle}</Text> */}
                        </Stack>
                      </Stack>
                      <Center>
                        <div>
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
                          <Text mb="4" color={"gray.500"}>
                            Date Created:
                            <chakra.span fontWeight={600} color={"green.400"}>
                              {" "}
                              {display_date}{" "}
                            </chakra.span>{" "}
                          </Text>
                        </div>
                      </Center>
                    </div>
                  </Center>
                  {/* <Center>
                    {" "}
                    <Button mb="3" colorScheme="green">
                      View Profile
                    </Button>
                  </Center> */}

                  <Divider />

                  <Text my="5" mb="5" fontWeight={700} color={"black.500"}>
                    {description}
                  </Text>

                  <Divider />
                  <VStack alignItems="flex-start" mt="3" mb="2px">
                    <chakra.h2 fontSize="md" fontWeight="600">
                      Desired Skills
                    </chakra.h2>
                  </VStack>

                  <Box mb="2">
                    {skills.map((x) => {
                      return (
                        <Badge
                          mr="1"
                          my="1"
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
                  </Box>
                  <Divider />

                  <Text mt="2" color={"gray.500"}>
                    Working:{" "}
                    <chakra.span fontWeight={600} color={"green.400"}>
                      {" "}
                      {desired_relationship_type}{" "}
                    </chakra.span>{" "}
                  </Text>
                  <Text color={"gray.500"}>
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

                  <Center m="5">
                    {" "}
                    <Button colorScheme="blue" onClick={() => {
                      setMail(true);
                      onClose();
                    }
                    
                    }> Message  </Button>
                    {/* <MailButton
                      mailto={"recepient"}
                      label={"My Label"}
                      closer={onClose}
                    >
                      {" "}
                    </MailButton> */}
                  </Center>
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
        </Flex>
      </Flex>
    </Center>
  );
}
function useClickable(props: any) {
  throw new Error("Function not implemented.");
}
