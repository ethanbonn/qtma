import type { User } from "../../types/models";

interface userWrapper {
  user: User;
}

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
  // Link,
  Badge,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";

interface userWrapper {
  user: User;
}
export default function SkillCard(props: userWrapper) {
  const user: User = props.user;
  const { skills } = user;

  // query for each skill in the db to get the "skill name"
  // display each skill

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
        mt="5"
        mb="5"
      >
         <Text fontWeight="bold" mb="3">
         Skills
        </Text>
        <div>
          {skills.map((x) => (
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
          ))}
        </div>
      </Box>
    </>
  );
}
