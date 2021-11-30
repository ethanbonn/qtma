import {
  withAuthUser,
  AuthAction,
  withAuthUserSSR,
  useAuthUser,
} from "next-firebase-auth";
import { useForm } from "react-hook-form";
import { FunctionComponent, useState } from "react";
import type { User, Link } from "../../types/models";
import getUserData from "../../functions/server/getUserData";
import type { UnregisteredUser } from "../../types";
import { isUser } from "../../functions/typeGuards";
import mongoose, { Schema, model, Types } from "mongoose";

const EditProfile = (props: UnregisteredUser | User) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isTypeUser = isUser(props);


  const [linksList, setLinksList] = useState(
    isTypeUser && props.links ? props.links : [{ links: "" }]
  );

  // const [interestsList, setInterestsList] = useState(
  //   isTypeUser && props.interests ? props.interests : [{ interests: "" }]
  // );

  const [skillsList, setSkillsList] = useState(
    isTypeUser && props.skills ? props.skills : [{ skills: "" }]
  );
  // const [projectsList, setProjectsList] = useState(
  //   isTypeUser && props.project_ids ? props.project_ids : [{ projects: "" }]//[{ projects: "" }]
  // );


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
          links : {Link},
          // project_ids : [10394849, 382920],
          skills : {"skillA" : Types.ObjectId('619d4315dbd941432e007e6b')},
          // interests: [""],
        }),
      }
    );
  };

  const handleInputChange = (
    e: { target: { value: any } },
    index: number,
    param: string,
    originalList:
      | string[]
      | { links: object }[]
      // | { interests: string }[]
      | { skills: object }[],
      // | { projects: object }[],
    listToUpdate: any
  ) => {
    const { value } = e.target;
    const list = [...originalList];
    list[index][param] = value;
    listToUpdate(list);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="userName">
        Username:
        <input
          type="text"
          id="userName"
          defaultValue={isTypeUser ? props.userName : undefined}
          {...register("userName", { required: true, maxLength: 12 })}
        />
        {errors.userName && <span>This field is required</span>}
      </label>
      <br />
      <label htmlFor="firstName">
        First Name:
        <input
          type="text"
          id="firstName"
          defaultValue={isTypeUser ? props.firstName : undefined}
          {...register("firstName", { required: true, maxLength: 24 })}
        />
        {errors.firstName && <span>This field is required</span>}
      </label>
      <br />
      <label htmlFor="lastName">
        Last Name:
        <input
          type="text"
          id="lastName"
          defaultValue={isTypeUser ? props.lastName : undefined}
          {...register("lastName", { required: true, maxLength: 24 })}
        />
        {errors.lastName && <span>This field is required</span>}
      </label>
      <br />
      <label htmlFor="profilePicture">
        Profile Picture:
        <input
          type="text"
          id="profilePicture"
          defaultValue={isTypeUser ? props.profilePicture : undefined}
          {...register("profilePicture")}
        />
      </label>
      <br />
      <label htmlFor="jobTitle">
        Job Title:
        <input
          type="text"
          id="jobTitle"
          defaultValue={isTypeUser ? props.jobTitle : undefined}
          {...register("jobTitle", { maxLength: 24 })}
        />
      </label>
      <br />
      <label htmlFor="userDescription">
        Description:
        <input
          type="text"
          id="userDescription"
          defaultValue={isTypeUser ? props.userDescription : undefined}
          {...register("userDescription", { maxLength: 240 })}
        />
      </label>
      <br />
      <label htmlFor="timezone">
        Timezone:
        <input
          type="text"
          id="timezone"
          defaultValue={isTypeUser ? props.timezone : undefined}
          {...register("timezone", { required: true, maxLength: 4 })}
        />
        {errors.timezone && <span>This field is required</span>}
      </label>
      <br />

      {linksList.map((_, i) => (
        <>
          <br />
          <label htmlFor={`links${i}`}>
            {i === 0 && "Links:"}
            <br />
            <input
              type="text"
              id={`links${i}`}
              defaultValue={isTypeUser ? props.links : undefined}
              {...register(`links.${i}`, {
                maxLength: 500,
                onChange: (e) =>
                  handleInputChange(e, i, "links", linksList, setLinksList),
              })}
            />
            {i === 0 && (
              <button
                type="button"
                onClick={() => setLinksList([...linksList, { links: "" }])}
              >
                +
              </button>
            )}
          </label>
        </>
      ))}
      <br />


      {skillsList.map((_, i) => (
        <>
          <br />
          <label htmlFor={`skills${i}`}>
            {i === 0 && "Skills:"}
            <br />
            <input
              type="text"
              id={`skills${i}`}
              defaultValue={isTypeUser ? props.skills : undefined}
              {...register(`skills.${i}`, {
                maxLength: 500,
                onChange: (e) =>
                  handleInputChange(e, i, "skills", skillsList, setSkillsList),
              })}
            />
            {i === 0 && (
              <button
                type="button"
                onClick={() => setSkillsList([...skillsList, { skills: "" }])}
              >
                +
              </button>
            )}
          </label>
        </>
      ))}
      <br />


      {JSON.stringify(linksList)}
      <br />
      {JSON.stringify(skillsList)}
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
