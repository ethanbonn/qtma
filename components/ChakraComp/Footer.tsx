import {
  Box,
  chakra,
  Container,
  Link,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ReactNode } from "react";
// import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";



export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
        
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "center" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>Made with 💚 by Team 4</Text>
        </Container>
      </Box>

      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
      
        <Stack direction={"row"} spacing={6}>
          <Link href={"#"}>LinkedIn</Link>
          <Link href={"#"}>Twitter</Link>
          <Link href={"#"}>Instagram</Link>
        </Stack>


        
      </Container>

    </Box>
  );
}
