import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  VStack,
  chakra,
  Badge,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ProjectCard() {
  return (
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
            COVID-19 Predictor
          </Heading>

          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={"https://www.cs.queensu.ca/people/images/user/51.jpg"}
              alt={"Author"}
            />
            <Stack direction={"column"} mt="3px" spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>John West</Text>
              <Text color={"gray.500"}>Software Developer</Text>
            </Stack>
          </Stack>

          <Text mt="2px" color={"gray.500"}>
            Timezone: EST
          </Text>
          <Text mb="2px" color={"gray.500"}>Project Duration: <chakra.span fontWeight={600}  color="green.300">Short </chakra.span>  </Text>

          {/* <Text color={"gray.500"}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </Text> */}
        </Stack>

        <VStack alignItems="flex-start" mt="40px" mb="2px">
          <chakra.h2 fontSize="md" fontWeight="600">
            Desired Skills
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
            SQL
          </Badge>

          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("blue.500", "gray.800")}
            fontWeight={"400"}
            color="white"
            rounded="xl"
          >
            Big Data
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("blue.500", "gray.800")}
            fontWeight={"400"}
            color="white"
            rounded="xl"
          >
            Statsistics
          </Badge>
        </Stack>
      </Box>
    </Center>
  );
}
