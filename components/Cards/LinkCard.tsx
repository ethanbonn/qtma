import type { User, Link } from "../../types/models";
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

export default function LinkCard(props: userWrapper) {
  const { user } = props;
  // const  usr : User = props;
  // console.log(user);
  // console.log(usr)
  // console.log(usr.user.timezone);
  const links: Link[] = user.links!;
  const { timezone } = user;

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
        <Text fontWeight="bold" mb="3">
          TimeZone:{" "}
          <Badge ml="1" fontSize="0.8em" colorScheme="green">
            {" "}
            {timezone}
          </Badge>
        </Text>

        <VStack alignItems="flex-start" mt="2">
          Links
          {/* <chakra.h2 fontSize="md">{`${}`}</chakra.h2> */}
        </VStack>
        <Text fontWeight="500" alignItems="flex-start">
          External Links
        </Text>

        <Stack>
          {" "}
          {links.map(
            (x) =>
              x.url && (
                <Button
                  m="2"
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="green"
                  variant="outline"
                >
                  {x.site}

                  <a target="_blank" href={`${x.url}`} rel="noreferrer"></a>
                </Button>
              )
          )}
        </Stack>
      </Box>
    </>
  );
}
