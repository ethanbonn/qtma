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
  Divider,
  Link,
  Badge,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import {useRef} from "react";
import {Helmet} from "react-helmet";

interface userWrapper {
  user: User;
}

export default function ProfilePageCard(props: userWrapper) {
  const { user } = props;
  const { profilePicture, firstName, lastName, jobTitle, userDescription, email } =
    user;
  const inputRef = useRef(null);

  console.log(profilePicture);
  return (
    <>
      <Helmet>
        
        <script src="https://cdn.jsdelivr.net/npm/mailtoui@1.0.3/dist/mailtoui-min.js"></script>

      </Helmet>

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
        {/* <Divider /> */}
        <Button > 
          <a
            ref={inputRef}
            className="mailtoui"
            href={
              "mailto:" +
              email +
              "?subject=Soar Message" +
              
              "&bcc=team@soarup.io&body=Introduce%20yourself!%20"
            }
            // style={{
            //   visibility: "hidden",
            //   zIndex: 1,
            //   padding: "0px",
            //   margin: "0px",
            // }}
          >
            Message 
          </a>
        </Button>

      </Box>
    </>
  );
}


