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
import ProjectCard from "../../../components/ChakraComp/ProjectCard";
import Navbar from "../../../components/ChakraComp/Navbar";
import Footer from "../../../components/Footer";
import getProjectByUID from "../../../functions/server/getProjectByID";

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
        <div className="grid grid-cols-4 auto-cols-min">
          <div className="col-span-4">
            <Navbar {...props} />
          </div>
          <div className="col-span-1">
            <ProfilePageCard user={userProfile} />
            <SkillCard user={userProfile} />
            <LinkCard user={userProfile} />
          </div>
          <div className="col-span-3 pt-10 px-20">
            <div className="flex flex-row justify-between">
              <p className="font-sans text-3xl font-bold  text-black ">
                Projects
              </p>
              <div className="content-end">
                {isSelf && (
                  <Link href={`/profile/${props._id}/edit`}>
                    <button
                      type="button"
                      style={styles.button}
                      className="px-4 py-2 text-black bg-gray-light rounded-full shadow-md self-center"
                    >
                      Edit Profile
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex flex-wrap content-center -mx-12 -my-2 ">
              {userProjects.map((Proj) => {
                console.log("ADDING PROJECT", Proj);
                return <ProjectCard {... Proj}/>
              })}
            </div>
          </div>
          <div className="col-span-4">
            <Footer />
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
