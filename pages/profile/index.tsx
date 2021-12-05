import {
  useAuthUser,
  withAuthUser,
  AuthAction,
  withAuthUserSSR,
} from "next-firebase-auth";
import Link from "next/link";
import type { FunctionComponent } from "react";
import type { User } from "../../types/models";
import getUserData from "../../functions/server/getUserData";
import type { UnregisteredUser } from "../../types";
import { isUser } from "../../functions/typeGuards";
import ProfilePageCard from "../../components/Cards/ProfilePageCard";
import SkillCard from "../../components/Cards/SkillCard";
import LinkCard from "../../components/Cards/LinkCard";
import ProjectCard from "../../components/Cards/ProfileCard";
import NavBar from "../../components/NavBar/NavBar";

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

const Profile = (props: UnregisteredUser | User) => {
  const { signOut } = useAuthUser();
  const isUserType = isUser(props);
  return (
    <div>
      {isUserType ? (
        <>
          <NavBar />
          <ProfilePageCard user={props} />
          <SkillCard user={props} />
          <LinkCard user={props} />
          <div className="pt-20 px-20">
            <p className="font-sans text-3xl font-bold  text-black ">
              Projects
            </p>
            <div className="flex flex-wrap content-center">
              <ProjectCard />
              <ProjectCard />
            </div>
          </div>
          <Link href="/profile/edit">
            <button type="button" style={styles.button}>
              Edit Profile
            </button>
          </Link>
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
            style={styles.button}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <p>Complete your profile</p>
          <Link href="/profile/edit">
            <button type="button" style={styles.button}>
              Complete
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const { email, id } = AuthUser;
  const userData = await getUserData(id);

  return {
    props: userData ?? { email, firebaseId: id },
  };
});

export default withAuthUser()(Profile as FunctionComponent<unknown>);
