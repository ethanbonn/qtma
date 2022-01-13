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
import ExplorePage from "../../components/ExplorePage";

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
  const { email } = props;
  return (
    <div>
      <ExplorePage />
      {isUserType ? (
        <>
          <p>
            Signed in as
            {email}
          </p>
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
          <p>Search for Projects</p>
          <p>Skills</p>
          {/* <input> </input> */}

          <button>Submit</button>
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
