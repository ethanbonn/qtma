import {
    withAuthUser,
    AuthAction,
    withAuthUserSSR,
    useAuthUser,
  } from "next-firebase-auth";
  import { useForm } from "react-hook-form";
  import { FunctionComponent, useState } from "react";
  import type { User, Link, Skill } from "../../types/models";
  import getUserData from "../../functions/server/getUserData";
  import type { UnregisteredUser } from "../../types";
  import { isUser } from "../../functions/typeGuards";
  import Footer from "../../components/Footer";
  import NavBar from "../../components/NavBar/NavBar";
  import baseUrl from "../../utils/baseUrl";
  
  const CreateProject = (props: UnregisteredUser | User) => {
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm();
    const isTypeUser = isUser(props);
  
    const { _id, email } = props;
    const { getIdToken } = useAuthUser();

  
    const onSubmit = async (data: any) => {
      const token = await getIdToken();
      var reqBody = isTypeUser ? JSON.stringify({
        author_id: _id,
        author_picture: (props.profilePicture ?? "https://avatars.dicebear.com/api/male/username.svg"),
        author_name: (props.firstName + " " + props.lastName),
        author_title: props.jobTitle,
        author_username: props.userName,

  
  
        ...data
      }) : JSON.stringify({
        author_id: _id,
  
        ...data
      });
      await fetch(
        `${baseUrl}/api/projects/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: token } : {}),
          },
          body: reqBody,
        }
      );
      window.location.href = "/";
    };
  
    return (
      <>
        <NavBar login_name={isTypeUser ? props.firstName : email}/>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-sans flex flex-col content-center  w-3/4 h-3/4 py-10 m-auto "
        >
        <div className="font-sans text-3xl font-bold text-black">
            Create a Project
        </div>
        <br />
        <label
            htmlFor="projectName"
            className="font-sans text-black-normal font-bold"
        >
            Name
            <br />
            <input
                type="text"
                id="projectName"
                className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                {...register("name", { required: true, maxLength: 100 })}
            />
            {errors.projectName && <span>This field is required</span>}
        </label>
        <br />
        <label htmlFor="relationship" className="text-black-normal font-bold">
            Relationship Type
            <br />
            <input
                type="text"
                id="relationship"
                className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                defaultValue={"collaborator"}
                {...register("desired_relationship_type", { required: true, maxLength: 12 })}
            />
            {errors.relationship && <span>This field is required</span>}
        </label>
        <br />
        <label htmlFor="timezone" className="text-black-normal font-bold">
            Timezone
            <br />
            <input
                type="text"
                id="timezone"
                className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                defaultValue={"EST"}
                {...register("author_timezone", { required: true, minLength: 3, maxLength: 3 })}
            />
            {errors.timezone && <span>This field is required</span>}
        </label>
        <br />
        <label
            htmlFor="description"
            className="font-sans text-black-normal font-bold"
        >
            Description
            <br />
            <input
              type="text"
              id="description"
              className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
              {...register("description", { required: true, maxLength: 1000 })}
            />
        </label>
        <br />
          <label
            htmlFor="duration"
            className="font-sans text-black-normal font-bold"
          >
            Duration
            <br />
            <input
              type="text"
              id="duration"
              className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
              {...register("duration", { maxLength: 24 })}
            />
        </label>
        <br />
        <input
            type="submit"
            className=" font-sans px-4 py-2 text-white bg-green-normal rounded-full shadow-md w-1/5 self-center"
            value="Create"
          />
        </form>
        {isTypeUser && <Footer />}
      </>
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
  
  export default withAuthUser()(CreateProject as FunctionComponent<unknown>);
  