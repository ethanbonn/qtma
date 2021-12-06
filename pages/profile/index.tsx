import {
  useAuthUser,
  withAuthUser,
  AuthAction,
  withAuthUserSSR,
} from "next-firebase-auth";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { User } from "../../types/models";
import getUserData from "../../functions/server/getUserData";
import type { UnregisteredUser } from "../../types";
import { isUser } from "../../functions/typeGuards";
import ProfilePageCard from "../../components/Cards/ProfilePageCard";
import SkillCard from "../../components/Cards/SkillCard";
import LinkCard from "../../components/Cards/LinkCard";
import ProjectCard from "../../components/Cards/ProfileCard";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer";

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
  const router = useRouter();

  useEffect(() => {
    if (!isUserType) {
      router.push("/profile/edit");
    }
  });

  return (
    <div>
      {isUserType && (
        <div className="grid grid-cols-4 auto-cols-min">
          <div className="col-span-4">
            <NavBar />
          </div>
          <div className="col-span-1">
            <ProfilePageCard user={props} />
            <SkillCard user={props} />
            <LinkCard user={props} />
          </div>
          <div className="col-span-3 pt-10 px-20">
            <div className="flex flex-row justify-between">
              <p className="font-sans text-3xl font-bold  text-black ">
                Projects
              </p>
              <div className="content-end">
                <Link href="/profile/edit">
                  <button
                    type="button"
                    style={styles.button}
                    className="px-4 py-2 text-black bg-gray-light rounded-full shadow-md self-center"
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap content-center -mx-12 -my-2 ">
              <ProjectCard />
              <ProjectCard />
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
  const { email, id } = AuthUser;
  const userData = await getUserData(id);

  return {
    props: userData ?? { email, firebaseId: id },
  };
});

export default withAuthUser()(Profile as FunctionComponent<unknown>);
