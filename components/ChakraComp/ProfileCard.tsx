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
            "https://i.pinimg.com/originals/4c/b0/fd/4cb0fd75c75f71b0f9fcb70a93e8dd1b.jpg"
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
          <chakra.h2 fontSize="smmd" fontWeight="600">
            Skills and Interests
          </chakra.h2>
        </VStack>
        {/* <Stack mt={8} direction={"row"}> */}

        <Stack direction={["column", "row"]} spacing="24px">
          <Box>
          <Button
           
           fontSize={"sm"}
           rounded={"full"}
           color="white"
           bg={"blue.400"}
         >
           UX Design
         </Button>
          </Box>

          <Box>
          <Button
           
           fontSize={"sm"}
           rounded={"full"}
           color="white"
           bg={"blue.400"}
         >
           UX Design
         </Button>
          </Box>

          <Box>
          <Button
           
           fontSize={"sm"}
           rounded={"full"}
           color="white"
           bg={"blue.400"}
         >
           UX Design
         </Button>
          </Box>
          
         
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          {" "}
          <Button
           
            fontSize={"sm"}
            rounded={"full"}
            color="white"
            bg={"blue.400"}
          >
            UX Design
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            color="white"
            bg={"blue.400"}
          >
            Frontend Development
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            color="white"
            bg={"blue.400"}
          >
            JavaScript
          </Button>
        </SimpleGrid>

        {/* </Stack> */}
      </Box>
    </Center>
  );
}
