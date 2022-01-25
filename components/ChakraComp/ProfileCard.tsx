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

export default function SocialProfileSimple() {
  return (
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
      >
        <Avatar
          size={"2xl"}
          src={
           "https://www.cs.queensu.ca/people/images/user/51.jpg"
          }
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          John West
        </Heading>
        <Text fontWeight={600} mt="2" color={"gray.500"} mb={4}>
          Software Developer
        </Text>

        <VStack alignItems="flex-start" mt="2">
          <chakra.h2 fontSize="md" fontWeight="600">
            Skills and Interests
          </chakra.h2>
        </VStack>

        <Stack direction={["column", "row"]} spacing="5px">
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("blue.500", "gray.800")}
            fontWeight={"400"}
            color="white"
            rounded="xl"
          >
            Python
          </Badge>

          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("blue.500", "gray.800")}
            fontWeight={"400"}
            color="white"
            rounded="xl"
          >
            JavaScript
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("blue.500", "gray.800")}
            fontWeight={"400"}
            color="white"
            rounded="xl"
          >
            FL Studio
          </Badge>
        </Stack>
        {/* </Stack> */}
      </Box>
    </Center>
  );
}
