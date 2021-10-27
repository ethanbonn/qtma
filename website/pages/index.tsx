import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Link from "next/link";

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

const Demo = () => {
  const { email, signOut } = useAuthUser();
  return (
    <div>
      {email ? (
        <>
          <p>Signed in as {email}</p>
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
          <p>You are not signed in.</p>
          <Link href="/login">
            <a>
              <button type="button" style={styles.button}>
                Sign in
              </button>
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser }) => {
    return {
      props: {},
    };
  }
);

export default withAuthUser()(Demo);
