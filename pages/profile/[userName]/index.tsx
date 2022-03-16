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
import OwnProfilePageCard from "../../../components/Cards/OwnProfilePageCard";
import ProfilePageCard from "../../../components/Cards/ProfilePageCard";
import SkillCard from "../../../components/Cards/SkillCard";
import LinkCard from "../../../components/Cards/LinkCard";
import ProjectCard from "../../../components/ChakraComp/ProjectCard";
import OwnProjectCard from "../../../components/ChakraComp/OwnProjectCard";
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


          {/* {isSelf && (
            <Link href={`/profile/${props._id}/edit`}>
              <Button colorScheme="green">Edit Profile </Button>
            </Link>
          )} */}
          <Grid
            // h="200px"
            templateRows= {["repeat(1, 1fr)","repeat(2, 1fr)"]}
            templateColumns= {["repeat(1, 2fr)","repeat(3, 1fr)"]}
            gap={4}
            p="50"
          >
            <GridItem rowSpan={[2,3]} colSpan={1}>
              {" "}
              {isSelf ?  <ProfilePageCard user={userProfile} /> : <OwnProfilePageCard user={userProfile} /> }
              <SkillCard user={userProfile} />
              <LinkCard user={userProfile} />
            </GridItem>

            {isSelf ? userProjects.map((Proj) => {
              console.log("ADDING PROJECT", Proj);
              return <OwnProjectCard {...Proj} />;
            }) : 
            userProjects.map((Proj) => {
              console.log("ADDING PROJECT", Proj);
              return <ProjectCard {...Proj} />;
            })}
          </Grid>
     
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
