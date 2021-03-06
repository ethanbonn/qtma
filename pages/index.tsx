import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Link from "next/link";
import { FunctionComponent, useEffect } from "react";
import type { User } from "../types/models";
import getUserData from "../functions/server/getUserData";
import LandingPage from "../components/LandingPage";
import firebase from "firebase";
import { isUser, handleUserType } from "../functions/typeGuards";
import { useRouter } from "next/router";
import { UnregisteredUser } from "../types";

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

const Index = (props: UnregisteredUser | User) => {
  handleUserType(props);
  return (
    <div>
      <LandingPage {... props} />
    </div>
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

export default withAuthUser()(Index as FunctionComponent<unknown>);
