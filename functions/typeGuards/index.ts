import firebase from "firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import type { UnregisteredUser } from "../../types";
import type { User } from "../../types/models";
import { UserMetadata } from "firebase-admin/lib/auth/user-record";

export const isUser = (user: UnregisteredUser | User | UserMetadata): user is User =>
  (user as User).userName !== undefined;

export const isRegistered = (
  user: UnregisteredUser | null | undefined
): user is UnregisteredUser => (user as UnregisteredUser).email != undefined;

export const handleUserType = (props: UnregisteredUser | User | null | undefined) => {
  const router = useRouter();
//   const { email } = props;

  // redirects
  useEffect(() => {
    if (!isUser(props) && isRegistered(props)) {
      const { _id, emailVerified, email } = props;
      const display_name = email;
      console.log("IsVerified: ", emailVerified);
      console.log("Unregistered User", props);
      // verify email here
      if (!emailVerified) {
        router.push("/verify");
        // router.reload();
      } else {
        router.push(`/profile/${_id}/edit`);
        // router.reload();
      }
    }
  });
};
