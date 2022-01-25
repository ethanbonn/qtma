import {
  useAuthUser,
  withAuthUser,
  AuthAction,
  withAuthUserSSR,
} from "next-firebase-auth";
import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { User } from "../../types/models";
import getUserData from "../../functions/server/getUserData";
import getUserByUsername from "../../functions/server/getUserByUsername";
import type { UnregisteredUser } from "../../types";
import { handleUserType, isUser } from "../../functions/typeGuards";
import ProfilePageCard from "../../components/Cards/ProfilePageCard";
import SkillCard from "../../components/Cards/SkillCard";
import LinkCard from "../../components/Cards/LinkCard";
import ProjectCard from "../../components/Cards/ProjectCard";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer";
import ViewProfile from "./[userName]/index";

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
export const Profile = (props: UnregisteredUser | User) => {
  const isUserType = isUser(props);
  const router = useRouter();

  useEffect(() => {
    if (isUserType) {
      const { userName } = props;
      router.push(`/profile/${userName}`);
    } else {
      const { _id } = props;
      router.push(`/profile/${_id}/edit`);
    }
  });
  return null;
};
export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const { email, id, emailVerified } = AuthUser;

  const userData = await getUserData(id);

  return {
    props: userData ?? { email, firebaseId: id, emailVerified },
  };
});

export default withAuthUser()(Profile as FunctionComponent<unknown>);
