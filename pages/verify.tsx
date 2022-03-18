import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import firebase from "firebase";
import getUserData from "../functions/server/getUserData";
import { isUser } from "../functions/typeGuards";
import { UnregisteredUser } from "../types";
import { User } from "../types/models";
import baseUrl from "../utils/baseUrl";
import { Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";



const Verify = (props: UnregisteredUser | User) => {
  const [verifyMessage, setVerifyMessage] = useState("");

  let message;
  const isUserType = isUser(props);
  const router = useRouter();
  // var display_name = null; // for NavMenu Component
  if (isUserType) {
    // user account already created
    useEffect(() => {
      router.push("/");
    }, [])
    
  } else {
    useEffect(()  => {
    const { _id, emailVerified } = props;
     async function handle(_id, emailVerified) {
       // if (!isUserType) {
      
      console.log("verified: ", emailVerified);

      if (!emailVerified) {
        await sendEmail(_id);
        // console.log("Message", message);
        // setVerifyMessage(message);
      } else {
        // user is already verified
        console.log("verified should be true: ", emailVerified);
        router.push(`/profile/${_id}/edit`);
      }
       
     }
     handle(_id, emailVerified);
      
    }, [verifyMessage]);
  }

  async function sendEmail(_id : string) {
    // var verified = "";
    await firebase
      .auth()
      .currentUser?.sendEmailVerification({
        // props.email?
        url: `${baseUrl}/profile/${_id}/edit`,
      })
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        // ...
        setVerifyMessage("verification link has been sent (check your spam folder just in case)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // return errorMessage;
        setVerifyMessage(errorMessage);
      });
  }

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
            Check Your Email for a verification link
          </Text>
        </Stack>
        {/* <Box
          rounded={"3xl"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        > */}
          {/* <Stack spacing={4}>
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
        </Box> */}
      </Stack>
    </Flex>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser }) => {
    const { email, id, emailVerified } = AuthUser;
    const userData = await getUserData(id);

    return {
      props: userData ?? { email, id, emailVerified },
    };
  }
);

export default withAuthUser()(Verify as FunctionComponent<unknown>);
