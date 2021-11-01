import { withAuthUser, AuthAction, withAuthUserSSR } from "next-firebase-auth";
import type { User } from "../../types/models";
import getUserData from "../../functions/server/getUserData";
import type { UnregisteredUser } from "../../types";
import { useForm } from "react-hook-form";
import { isUser } from "../../functions/typeGuards";

const EditProfile = (props: UnregisteredUser | User) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isTypeUser = isUser(props);
  const { _id, email } = props;

  const onSubmit = (data: any) => {
    fetch(
      `http://localhost:3000/api/users/${!isTypeUser ? "create" : "update"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      <input
        defaultValue={isTypeUser ? props.userName : undefined}
        {...register("userName", { required: true, maxLength: 12 })}
      />
      {errors.userName && <span>This field is required</span>}
      <br />
      <input
        defaultValue={isTypeUser ? props.firstName : undefined}
        {...register("firstName", { required: true, maxLength: 24 })}
      />
      {errors.firstName && <span>This field is required</span>}
      <br />
      <input
        defaultValue={isTypeUser ? props.lastName : undefined}
        {...register("lastName", { required: true, maxLength: 24 })}
      />
      {errors.lastName && <span>This field is required</span>}
      <br />
      <input
        defaultValue={isTypeUser ? props.profilePicture : undefined}
        {...register("profilePicture")}
      />
      <br />
      <input
        defaultValue={isTypeUser ? props.jobTitle : undefined}
        {...register("jobTitle", { maxLength: 24 })}
      />
      <br />
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

export default withAuthUser()(EditProfile);
