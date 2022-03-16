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
import { User } from "../../types/models";

export default function SocialProfileSimple(props: User) {
  const {
    userName,
    firstName,
    lastName,
    profilePicture,
    jobTitle,
    userDescription,
    date_created,
    _id,
    skills,
  } = props;

  return (
    <a href={'/profile/' + userName}>
      <Center py={6}>
        <Box
          maxW={"320px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"lg"}
          rounded={"2xl"}
          p={6}
          textAlign={"center"}
          borderWidth="1px"
          _hover={{ bg: "grey.300", boxShadow: "outline" }}
          cursor={"pointer"}
        >
          <Avatar
            size={"2xl"}
            src={profilePicture}
            name={firstName + " " + lastName}
            mb={4}
            pos={"relative"}
          />

          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {firstName + " " + lastName}
          </Heading>
          <Text fontWeight={600} mt="2" color={"gray.500"} mb={4}>
            {jobTitle}
          </Text>

          <VStack alignItems="flex-start" mt="2">
            <chakra.h2 fontSize="md" fontWeight="600">
              Skills
            </chakra.h2>
          </VStack>

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
        </Box>
      </Center>
    </a>
  );
}
