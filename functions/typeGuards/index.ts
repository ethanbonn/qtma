import firebase from "firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import type { UnregisteredUser } from "../../types";
import type { User } from "../../types/models";

export const isUser = (user: UnregisteredUser | User): user is User =>
  (user as User).userName !== undefined;

export const isRegistered = (
  user: UnregisteredUser | null | undefined
): user is UnregisteredUser => (user as UnregisteredUser).email != undefined;

export const handleUserType = (props: UnregisteredUser | User) => {
  const router = useRouter();
  const { email } = props;

  var displayName = email;

  // redirects
  useEffect(() => {
    if (!isUser(props) && email !== null) {
      const { _id, emailVerified, email } = props;
      const display_name = email;
      console.log("IsVerified: ", emailVerified);

      console.log("Unregistered User", props);
      // verify email here
      // router.push("/profile/edit");
      if (!emailVerified) {
        router.push("/verify");
        // router.reload();
      } else {
        router.push(`/profile/${_id}/edit`);
        // router.reload();
      }
      if (isUser(props)) {
        const displayName = props.firstName;
      }
    }
  });

  if (isUser(props)) {
    var displayName = props.firstName;
  }

  return displayName;
};
