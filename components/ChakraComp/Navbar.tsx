import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuthUser } from "next-firebase-auth";
import { UnregisteredUser } from "../../types";
import { isUser, handleUserType, isRegistered } from "../../functions/typeGuards";
import type { User } from "../../types/models";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href="#"
  >
    {children}
  </Link>
);

export default function Nav(props: UnregisteredUser | User | undefined) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isTypeUser = isUser(props);
  const isReg = isRegistered(props);
  const { signOut } = useAuthUser();
  return (
    <>
      <Box bg={useColorModeValue("green.300", "gray.600")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box>
            <Image alt="Soar Logo" src="/soarlogo.png" />
          </Box>

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              <a href="/projects/create">                
                <Button colorScheme="green" >
                  New Project
                </Button>
              </a>

              <Button colorScheme="green" onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {isTypeUser ? (
                <Menu>
                  <MenuButton as={Button} colorScheme="green">
                    {props.firstName} 
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                    <Avatar
                      size={"2xl"}
                      src={props.profilePicture}
                      name={props.firstName + " " + props.lastName}
                      mb={4}
                      pos={"relative"}
                    />
                    </Center>
                    <br />
                    <Center>
                      <p>{props.userName}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <Link href="/profile">
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link href={`/profile/${props._id}/edit`}>
                      <MenuItem>Edit Profile</MenuItem>
                    </Link>
                    <Link href="/" >
                      <a onClick={() => {
                        signOut()
                      }} >
                        <MenuItem>Sign Out</MenuItem>
                      </a>
                    </Link>
                  </MenuList>
                </Menu>
              )
               : isReg ? (
                <Menu>
                  <MenuButton as={Button} colorScheme="green">
                    {props.email}
                  </MenuButton>
                  <MenuList alignItems="center">
                    <br />
                    {/* <Center>
                      <Avatar
                        size={"2xl"}
                        src={props.profilePicture ? props.profilePicture : "https://avatars.dicebear.com/api/male/username.svg"}
                      />
                    </Center> */}
                    <br />
                    <Center>
                      <p>"Finish Your Profile"</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <Link href={`/profile/${props._id}/edit`}>
                      <MenuItem>Edit Profile</MenuItem>
                        </Link>
                        <Link href="/">
                          <a
                            onClick={() => {
                              signOut();
                            }}
                        >
                            <MenuItem>Sign Out</MenuItem>
                          </a>
                        </Link>
                      </MenuList>
                    </Menu>
                )  : (
                <Link href="/profile">
                  <Button as={Button} colorScheme="green">
                      Get Started 
                  </Button>
                </Link>
              )}

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
