// import { Avatar } from "@chakra-ui/react";
import profile from "../../pages/profile";
import type { User } from "../../types/models";

import {
  Heading,
  Avatar,
  VStack,
  chakra,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

interface userWrapper {
  user: User;
}

export default function ProfilePageCard(props: userWrapper) {
  const { user } = props;
  const { profilePicture, firstName, lastName, jobTitle, userDescription } =
    user;

  console.log(profilePicture);
  return (
    <>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"md"}
        rounded={"2xl"}
        p={6}
        textAlign={"center"}
        borderWidth="1px"
        borderColor="green.300"
      >
        <Avatar
          size={"2xl"}
          src={profilePicture}
          name={firstName + " " + lastName}
          mb={4}
          pos={"relative"}
          borderWidth="1px"
          borderColor="green.300"
        />

        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {firstName + " " + lastName}
        </Heading>
        <Text fontWeight={600} mt="2" color={"gray.500"} mb={4}>
          {jobTitle}
        </Text>

        <VStack alignItems="flex-start" mt="2">
          <chakra.h2 fontSize="md">{`${userDescription}`}</chakra.h2>
        </VStack>
      </Box>
    </>
  );
}
