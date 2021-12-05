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

const EditProfile = (props: UnregisteredUser | User) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const isTypeUser = isUser(props);

  const [linksList, setLinksList] = useState(
    isTypeUser && props.links
      ? props.links
      : ([
          { site: "Linkedin", url: "" },
          { site: "GitHub", url: "" },
          { site: "Website", url: "" },
        ] as Link[])
  );
  const [skillsList, setSkillsList] = useState(
    isTypeUser && props.skillIdList ? props.skillIdList : []
  );
  const [projectsList, setProjectsList] = useState(
    isTypeUser && props.projectIds ? props.projectIds : []
  );
  const { _id, email } = props;
  const { getIdToken } = useAuthUser();
  const onSubmit = async (data: any) => {
    const token = await getIdToken();

    const toBase64 = (file: File) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

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
          profilePicture: await toBase64(data.profilePicture[0] as File),
        }),
      }
    );
    window.location.reload();
  };

  const handleInputChange = (
    e: { target: { value: any } },
    index: number,
    param: string,
    originalList: Record<string, unknown>[],
    listToUpdate: any
  ) => {
    const { value } = e.target;
    const list = [...originalList];
    list[index][param] = value;
    listToUpdate(list);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="profilePicture">
        Change Profile Picture:&nbsp;
        <input
          type="file"
          accept="image/*"
          id="profilePicture"
          {...register("profilePicture")}
        />
      </label>
      <br />
      <label htmlFor="userName">
        Username:&nbsp;
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
        First Name:&nbsp;
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
        Last Name:&nbsp;
        <input
          type="text"
          id="lastName"
          defaultValue={isTypeUser ? props.lastName : undefined}
          {...register("lastName", { required: true, maxLength: 24 })}
        />
        {errors.lastName && <span>This field is required</span>}
      </label>
      <br />
      <label htmlFor="email">
        Email:&nbsp;
        <input
          type="text"
          id="email"
          defaultValue={isTypeUser ? props.email : undefined}
          {...register("email", { required: true, maxLength: 24 })}
        />
        {errors.lastName && <span>This field is required</span>}
      </label>
      <br />
      <label htmlFor="jobTitle">
        Job Title:&nbsp;
        <input
          type="text"
          id="jobTitle"
          defaultValue={isTypeUser ? props.jobTitle : undefined}
          {...register("jobTitle", { maxLength: 24 })}
        />
      </label>
      <br />
      <label htmlFor="userDescription">
        Description:&nbsp;
        <input
          type="text"
          id="userDescription"
          defaultValue={isTypeUser ? props.userDescription : undefined}
          {...register("userDescription", { maxLength: 240 })}
        />
      </label>
      <br />
      <label htmlFor="timezone">
        Timezone:&nbsp;
        <input
          type="text"
          id="timezone"
          defaultValue={isTypeUser ? props.timezone : undefined}
          {...register("timezone", { required: true, maxLength: 4 })}
        />
        {errors.timezone && <span>This field is required</span>}
      </label>

      {skillsList.map((_, i) => (
        <>
          <br />
          <label htmlFor={`skills${i}`}>
            {i === 0 && "Skills:"}
            <br />
            <input
              type="text"
              id={`skills${i}`}
              // defaultValue={isTypeUser ? props.skills : undefined}
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

      {linksList.map((x, i) => (
        <>
          <br />
          <label htmlFor={`links${i}`}>
            {i === 0 && "Links:"}
            <br />
            {i < 3 && x.site}
            {i < 3 && setValue(`links.${i}.site`, x.site)}

            <br />
            {i >= 3 && (
              <>
                <label htmlFor={`site${i}`}>
                  Add Link:
                  <br />
                  <input
                    type="text"
                    placeholder="website name"
                    id={`site${i}`}
                    defaultValue={isTypeUser ? x.site : undefined}
                    {...register(`links.${i}.site`, {
                      maxLength: 500,
                      onChange: (e) =>
                        handleInputChange(
                          e,
                          i,
                          "site",
                          linksList,
                          setLinksList
                        ),
                    })}
                  />
                </label>
              </>
            )}
            <input
              type="text"
              placeholder="your url here"
              id={`url${i}`}
              // key={site.}
              defaultValue={isTypeUser ? x.url : undefined}
              {...register(`links.${i}.url`, {
                maxLength: 500,
                onChange: (e) =>
                  handleInputChange(e, i, "url", linksList, setLinksList),
              })}
            />
            {i === 0 && (
              <button
                type="button"
                onClick={() =>
                  setLinksList([...linksList, { site: "", url: "" } as Link])
                }
              >
                +
              </button>
            )}
          </label>
        </>
      ))}
      <br />

      {projectsList.map((_, i) => (
        <>
          <br />
          <label htmlFor={`projects${i}`}>
            {i === 0 && "Projects:"}
            <br />
            <input
              type="text"
              id={`projects${i}`}
              {...register(`projects.${i}`, {
                maxLength: 500,
                onChange: (e) =>
                  handleInputChange(
                    e,
                    i,
                    "projects",
                    projectsList,
                    setProjectsList
                  ),
              })}
            />
            {i === 0 && (
              <button
                type="button"
                onClick={() =>
                  setProjectsList([...projectsList, { projects: "" }])
                }
              >
                +
              </button>
            )}
          </label>
        </>
      ))}
      <br />
      <input type="submit" value="Save Changes" />
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
