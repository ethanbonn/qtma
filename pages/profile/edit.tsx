import {
  withAuthUser,
  AuthAction,
  withAuthUserSSR,
  useAuthUser,
} from "next-firebase-auth";
import { useForm } from "react-hook-form";
import type { FunctionComponent } from "react";
import type { User } from "../../types/models";
import getUserData from "../../functions/server/getUserData";
import type { UnregisteredUser } from "../../types";
import { isUser } from "../../functions/typeGuards";

const EditProfile = (props: UnregisteredUser | User) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isTypeUser = isUser(props);
  console.log("isTypeUser", isTypeUser);
  const { _id, email } = props;
  console.log(_id, email);
  const { getIdToken } = useAuthUser();
  const onSubmit = async (data: any) => {
    const token = await getIdToken();

    fetch(
      `http://localhost:3000/api/users/${!isTypeUser ? "create" : "update"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({
          _id,
          email,
          ...data,
          links: [""],
          interests: [""],
        }),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>userName: </h1>
      <input
        defaultValue={isTypeUser ? props.userName : undefined}
        {...register("userName", { required: true, maxLength: 12 })}
      />
      {errors.userName && <span>This field is required</span>}
      <br />
      <h1>firstName: </h1>
      <input
        defaultValue={isTypeUser ? props.firstName : undefined}
        {...register("firstName", { required: true, maxLength: 24 })}
      />
      {errors.firstName && <span>This field is required</span>}
      <br />
      <h1>lastName: </h1>
      <input
        defaultValue={isTypeUser ? props.lastName : undefined}
        {...register("lastName", { required: true, maxLength: 24 })}
      />
      {errors.lastName && <span>This field is required</span>}
      <br />
      <h1>Profile Pic (dont need): </h1>
      <input
        defaultValue={isTypeUser ? props.profilePicture : undefined}
        {...register("profilePicture")}
      />
      <br />
      <h1>timezone: </h1>
      <input
        defaultValue={isTypeUser ? props.timezone : undefined}
        {...register("timezone", { required : true, maxLength: 240 })}
      />
      <br />
      <h1>Job Title (Dont need): </h1>
      <input
        defaultValue={isTypeUser ? props.jobTitle : undefined}
        {...register("jobTitle", { maxLength: 24 })}
      />
      <br />
      <h1>Description (Dont need): </h1>
      <input
        defaultValue={isTypeUser ? props.userDescription : undefined}
        {...register("userDescription", { maxLength: 240 })}
      />
      <br />


      <input type="submit" />
    </form>
  );
};

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const { email, id } = AuthUser;
  const userData = await getUserData(id);

  return {
    props: userData ?? { email, _id: id },
  };
});

export default withAuthUser()(EditProfile as FunctionComponent<unknown>);
