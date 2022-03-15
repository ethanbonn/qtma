import {
  useAuthUser,
  withAuthUser,
  AuthAction,
  withAuthUserSSR,
} from "next-firebase-auth";
import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { User } from "../../../types/models";
import getUserData from "../../../functions/server/getUserData";
import getUserByUsername from "../../../functions/server/getUserByUsername";
import type { UnregisteredUser } from "../../../types";
import { handleUserType, isUser } from "../../../functions/typeGuards";
import ProfilePageCard from "../../../components/Cards/ProfilePageCard";
import SkillCard from "../../../components/Cards/SkillCard";
import LinkCard from "../../../components/Cards/LinkCard";
import ProjectCard from "../../../components/ChakraComp/OwnProjectCard";
import Navbar from "../../../components/ChakraComp/Navbar";
import Footer from "../../../components/Footer";
import getProjectByUID from "../../../functions/server/getProjectByID";
import {
  Heading,
  Avatar,
  VStack,
  chakra,
  Box,
  Center,
  Text,
  Grid,
  GridItem,
  Stack,
  Button,
  Badge,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
  },
  button: {
    marginLeft: 16,
    cursor: "pointer",
  },
};

export const ViewProfile = (props: UnregisteredUser | User) => {
  const [userProfile, setUserProfile] = useState(props as User);

  const [userProjects, setUserProjects] = useState([]);
  const isUserType = isUser(props);
  // handles user access and redirects & returns nav menu arg
  const displayName = handleUserType(props);

  const router = useRouter();
  const targetUserName = router.query.userName;

  useEffect(() => {
    async function getTargetUser(username) {
      try {
        const user = await getUserByUsername(username);
        // const usersProjects = await getProjectByUID(user._id);
        console.log(user);
        console.log(user.projects);
      
        setUserProfile(user);
        setUserProjects(user.projects);
      } catch (err) {
        console.log("error", err);
      }
    }
    getTargetUser(targetUserName);
  }, [targetUserName]);

  const AuthUser = useAuthUser();
  const isSelf = userProfile && AuthUser.id === userProfile._id;
  return (
    <div>
      {!userProfile && (
        <div>Sorry, the user you are trying to access does not exist.</div>
      )}
      {isUserType && userProfile && (
        <div>
          <Navbar {...props} />
          <Grid
            h="200px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
            p="10"
          >
            <GridItem rowSpan={2} colSpan={1} bg="tomato" />
            <GridItem colSpan={2} bg="papayawhip" />
            <GridItem colSpan={2} bg="papayawhip" />
            <GridItem colSpan={2} bg="tomato" />
            <GridItem colSpan={2} bg="tomato" />

          </Grid>
          <Grid
            p="10"
            // h="200px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={4}
          >
            <GridItem rowSpan={2} colSpan={1}>
              <ProfilePageCard user={userProfile} />
              <SkillCard user={userProfile} />
              <LinkCard user={userProfile} />
            </GridItem>

            <GridItem rowSpan={2} colSpan={3}>
              <Heading size="lg">Projects</Heading>
              {isSelf && (
                <Link href={`/profile/${props._id}/edit`}>
                  <Button colorScheme="green">Edit Profile </Button>
                </Link>
              )}
              {userProjects.map((Proj) => {
                console.log("ADDING PROJECT", Proj);
                return <ProjectCard {...Proj} />;
              })}
            </GridItem>
          </Grid>

          <div className="grid grid-cols-4 auto-cols-min">
            <div className="col-span-4"></div>
            <div className="col-span-1">
              <ProfilePageCard user={userProfile} />
              <SkillCard user={userProfile} />
            <LinkCard user={userProfile} />
            </div>
            
            {/* <div className="col-span-3 pt-10 px-20">
              <div className="flex flex-row justify-between">
                <p className="font-sans text-3xl font-bold  text-black ">
                  Projects
                </p>
                <div className="content-end">
                  {isSelf && (
                    <Link href={`/profile/${props._id}/edit`}>
                      <Button colorScheme="green">Edit Profile </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap content-center -mx-12 -my-2 ">
                {userProjects.map((Proj) => {
                  console.log("ADDING PROJECT", Proj);
                  return <ProjectCard {...Proj} />;
                })}
              </div>
            </div> */}
            <div className="col-span-4">
              <Footer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const { email, id, emailVerified } = AuthUser;

  const userData = await getUserData(id);
  // console.log("ID", id);
  // console.log("user data", userData);
  // console.log("Verified", emailVerified);

  return {
    props: userData ?? { email, firebaseId: id, emailVerified },
  };
});

export default withAuthUser()(ViewProfile as FunctionComponent<unknown>);
