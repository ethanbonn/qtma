import {
  Box,
  Flex,
  Center,
  Image,
  Heading,
  IconButton,
  Button,
  Stack,
  Collapse,
  Stack,
  Container,
  Link,
  useColorModeValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChatIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <Box>
      <Box>
        <Flex
          bg={useColorModeValue("green.300", "gray.800")}
          color={useColorModeValue("gray.600", "green.300")}
          minH={"55px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              colorScheme={"green"}
              // variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>

          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Link href="/">
              <Flex display={{ base: "none", md: "flex" }} ml={1}>
                <Image alt="Soar Logo" src="/soarlogo.png"></Image>
              </Flex>
            </Link>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {/* <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color="current"
              ml={{ base: "0", md: "3" }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            /> */}
            <IconButton
              colorScheme="green"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<ChatIcon />}
            />
            <Button colorScheme="green">Profile</Button>
          </Stack>
        </Flex>

        {/* <Collapse in={isOpen} animateOpacity children={<MobileNav />} /> */}
      </Box>
    </Box>

{/* <Container maxW={'3xl'}>
<Stack
  as={Box}
  textAlign={'center'}
  spacing={{ base: 8, md: 14 }}
  py={{ base: 20, md: 36 }}>
  <Heading
    fontWeight={600}
    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
    lineHeight={'110%'}>
    Make money from <br />
    <Text as={'span'} color={'green.400'}>
      your audience
    </Text>
  </Heading>
  <Text color={'gray.500'}>
    Monetize your content by charging your most loyal readers and reward
    them loyalty points. Give back to your loyal readers by granting
    them access to your pre-releases and sneak-peaks.
  </Text>

</Container> */}
  );
}
