import {
  Flex,
  Box,
  FormControl,
  Center,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Signup() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Welcome to Soar ⭐</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Sign up to enjoy all of our features
          </Text>
        </Stack>
        <Box
          rounded={"3xl"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input rounded="3xl" type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input rounded="3xl" type="password" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Re-enter Password</FormLabel>
              <Input rounded="3xl" type="password" />
            </FormControl>
            <Stack spacing={10}>
              {" "}
              <Button
                rounded="3xl"
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
          <Center> </Center>

          <Stack pt={6}>
            <Text align={"center"}>
              Already have an account?{" "}
              <Link href="/login" color={"green.400"}>
                Click here to login
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
