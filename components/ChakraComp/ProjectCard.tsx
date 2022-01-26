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
import { Project } from "../../types/models";


export default function ProjectCard(props : Project) {
  // const { name, skills, author_timezone, duration, author_name, author_picture, author_title, date_created } = props;
  const { name, skills, author_timezone, duration, author_name, author_picture, author_title, date_created } = props;

  // console.log(Date(date_created).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
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
            {name}
          </Heading>

          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={author_picture}
              alt={"Author"}
            />
            <Stack direction={"column"} mt="3px" spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>{author_name}</Text>
              <Text color={"gray.500"}>{author_title}</Text>
            </Stack>
          </Stack>

          <Text mt="2px" color={"gray.500"}>
            <Text mb="2px" color={"gray.500"}>Timezone: <chakra.span fontWeight={600}  color="blue.600">{author_timezone}</chakra.span></Text>
          </Text>
          <Text mb="2px" color={"gray.500"}>Project Duration: <chakra.span fontWeight={600}  color={duration == "short" ? "green.400" : duration == "medium" ? "yellow.400" : "red.400"}> {duration} </chakra.span>  </Text>
          
          <Text mb="2px" color={"gray.500"}>Date Created: <chakra.span fontWeight={600}  color={"green.400" }> {String(date_created.toLocaleString())} </chakra.span>  </Text>


          {/* <Text color={"gray.500"}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </Text> */}
        </Stack>

        <VStack alignItems="flex-start" mt="40px" mb="2px">
          <chakra.h2 fontSize="md" fontWeight="600">
            Skills
          </chakra.h2>
        </VStack>

        <Stack direction={["column", "row"]} spacing="5px">
          {skills.map((x) => {return (
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
            )}
          )}
        </Stack>
      </Box>
    </Center>
  );
}
