import {
  withAuthUser,
  AuthAction,
  withAuthUserSSR,
  useAuthUser,
} from "next-firebase-auth";
import { useForm } from "react-hook-form";
import { FunctionComponent, useState, useEffect } from "react";
import {
  Input,
  Select,
  Textarea,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import type { User, Link, Skill } from "../../../types/models";
import getUserData from "../../../functions/server/getUserData";
import type { UnregisteredUser } from "../../../types";
import { isUser } from "../../../functions/typeGuards";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/ChakraComp/Navbar";
import baseUrl from "../../../utils/baseUrl";
import QueryCard from "../../../components/Cards/QueryCard";
import SkillQuery from "../../../components/SkillQuery";

const timezones = [
  "ACST",
  "AEST",
  "AKST",
  "AST",
  "AWST",
  "CET",
  "CST",
  "EET",
  "EST",
  "MST",
  "PST",
  "WET",
];

const EditProfile = (props: UnregisteredUser | User) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const isTypeUser = isUser(props);

  const [uniqueUsername, setUniqueUsername] = useState(true);
  const [unexpectedError, setUnexpectedError] = useState(false);
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
    isTypeUser && props.skills ? props.skills : []
  );
  const [projectsList, setProjectsList] = useState(
    isTypeUser && props.projectIds ? props.projectIds : []
  );
  const { _id, email } = props;
  const { getIdToken } = useAuthUser();

  const onSubmit = async (data: any) => {
    const token = await getIdToken();

    let allSkills = skillsList;
    if (isTypeUser && props.skills) {
      allSkills = props.skills;
      Array.prototype.push.apply(allSkills, skillsList);
    }

    const toBase64 = (file: File) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    await fetch(`${baseUrl}/api/users/${!isTypeUser ? "create" : "update"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      body: JSON.stringify({
        _id,
        email,
        skills: allSkills,
        ...data,
        profilePicture:
          data.profilePicture.length !== 0
            ? await toBase64(data.profilePicture[0] as File)
            : isTypeUser
            ? props.profilePicture
            : "",
      }),
    }).then((response) => {
      if (response.status === 450) {
        setUniqueUsername(false);
      }
      if (response.status === 200) {
        setUniqueUsername(true);
        window.location.href = `/profile/`;
      } else {
        setUnexpectedError(true);
      }
    });
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

  // useEffect(() => {
  //   async function handler() {
  //     console.log(skillsList);
  //     console.log(typeof props.skills, props.skills, props.links);
  //     //   await queryDB(skill.map((x) => x.value))
  //     //     .then((response) => response)
  //     //     .then((res) => stateChanger(res));
  //     setSkillsList((existingSkills) => ({
  //       ...existingSkills,
  //     }));
  //   }
  //   handler();
  // }, []);

  return (
    <>
      <Navbar {...props} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-sans flex flex-col content-center  w-3/4 h-3/4 py-10 m-auto "
      >
        {!isTypeUser && (
          <div className="font-sans text-3xl font-bold text-black">
            Complete Your Profile
          </div>
        )}
        <label
          htmlFor="profilePicture"
          className="font-sans text-green-normal font-bold"
        >
          Change Profile Picture
          <br />
          <input
            type="file"
            accept="image/*"
            id="profilePicture"
            {...register("profilePicture")}
          />
        </label>
        <br />
        <label
          htmlFor="userName"
          className="font-sans text-black-normal font-bold"
        >
          Username
          <br />
          <Input
            type="text"
            id="userName"
            className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
            defaultValue={isTypeUser ? props.userName : undefined}
            {...register("userName", { required: true, maxLength: 12 })}
          />
          {/* <input
            type="text"
            id="userName"
            className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
            defaultValue={isTypeUser ? props.userName : undefined}
            {...register("userName", { required: true, maxLength: 12 })}
          /> */}
          {errors.userName && <span>This field is required</span>}
          {!uniqueUsername && <span>Username exists already, try again</span>}
        </label>
        <br />
        <label htmlFor="firstName" className="text-black-normal font-bold">
          First Name
          <br />
          <Input
            type="text"
            id="firstName"
            className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
            defaultValue={isTypeUser ? props.firstName : undefined}
            {...register("firstName", { required: true, maxLength: 24 })}
          />
          {errors.firstName && <span>This field is required</span>}
        </label>
        <br />
        <label
          htmlFor="lastName"
          className="font-sans text-black-normal font-bold"
        >
          Last Name
          <br />
          <Input
            type="text"
            id="lastName"
            className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
            defaultValue={isTypeUser ? props.lastName : undefined}
            {...register("lastName", { required: true, maxLength: 24 })}
          />
          {errors.lastName && <span>This field is required</span>}
        </label>
        <br />
        <label
          htmlFor="jobTitle"
          className="font-sans text-black-normal font-bold"
        >
          Job Title
          <br />
          <Input
            type="text"
            id="jobTitle"
            className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
            defaultValue={isTypeUser ? props.jobTitle : undefined}
            {...register("jobTitle", { maxLength: 24 })}
          />
        </label>
        <br />
        <label
          htmlFor="userDescription"
          className="font-sans text-black-normal font-bold"
        >
          Description
          <br />
          <Textarea
            placeholder="Help our community get to know you by introducing yourself"
            type="text"
            id="userDescription"
            className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
            defaultValue={isTypeUser ? props.userDescription : undefined}
            {...register("userDescription", { maxLength: 240 })}
          />
          {/* <input
            type="text"
            id="userDescription"
            className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
            defaultValue={isTypeUser ? props.userDescription : undefined}
            {...register("userDescription", { maxLength: 240 })}
          /> */}
        </label>
        <br />
        <label
          htmlFor="timezone"
          className="font-sans text-black-normal font-bold"
        >
          Timezone
          <br />
          <Select
            id="timezone"
            defaultValue={isTypeUser ? props.timezone : undefined}
            {...register("timezone", { required: true, maxLength: 4 })}
          >
            <option value="EST">Eastern Standard Time (EST)</option>
            <option value="PST">Pacific Standard Time (PST)</option>
            <option value="ACST">
              Australian Central Standard Time (ACST)
            </option>
            <option value="AEST">
              Australian Eastern Standard Time (AEST)
            </option>
            <option value="AKST">Alaska Standard Time (AKST)</option>
            <option value="AST">Atlantic Standard Time (AST)</option>
            <option value="AWST">
              Australian Western Standard Time (AWST)
            </option>
            <option value="CET">Central European Time (CET)</option>
            <option value="CST">Central Standard Time (CST)</option>
            <option value="EET">Eastern European Time (EET)</option>
            <option value="MST">Mountain Standard Time (MST)</option>
            <option value="WET">Western European Time (WET)</option>
          </Select>
          {/* <select
            id="timezone"
            className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
            defaultValue={isTypeUser ? props.timezone : undefined}
            {...register("timezone", { required: true, maxLength: 4 })}
          >
            {timezones.map((x) => (
              <option value={x}>{x}</option>
            ))}
          </select> */}
          {errors.timezone && <span>This field is required</span>}
        </label>

        <br />

        <SkillQuery stateChanger={setSkillsList} />

        <br />

        <label
          htmlFor="user-links"
          className="font-sans text-black-normal font-bold"
        >
          Links
        </label>
        <div id="user-links" className="font-sans text-black-normal">
          {linksList.map((x, i) => (
            <>
              {i < 3 && i !== 0 && <br />}
              <label htmlFor={`links${i}`}>
                {i !== 0 && <br />}
                {i < 3 && x.site}
                {i < 3 && setValue(`links.${i}.site`, x.site)}
                <br />
                {i >= 3 && (
                  <>
                    <label htmlFor={`site${i}`}>
                      Add Link:
                      <br />
                      <Input
                        type="text"
                        className="font-sans my-1 border border-gray-200 rounded-lg mr-1 pl-1"
                        style={{ width: "49%" }}
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
                <Input
                  type="text"
                  placeholder="your url here"
                  id={`url${i}`}
                  className="font-sans my-1 border border-gray-200 rounded-lg pl-1"
                  style={{ width: "49%" }}
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
                    className="font-sans px-2 py-0.5 ml-1 rounded-lg text-white bg-green-normal shadow-md h-3/4"
                    onClick={() =>
                      setLinksList([
                        ...linksList,
                        { site: "", url: "" } as Link,
                      ])
                    }
                  >
                    +
                  </button>
                )}
              </label>
            </>
          ))}
        </div>
        <br />

        {/* {projectsList.map((_, i) => (
          <>
            <br />
            <label
              htmlFor={`projects${i}`}
              className={
                i === 0
                  ? "font-sans text-black-normal font-bold"
                  : "font-sans text-black-normal"
              }
            >
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
        ))} */}
        <br />
        <input
          type="submit"
          className=" font-sans px-4 py-2 text-white bg-green-normal rounded-full shadow-md w-1/5 self-center"
          value={isTypeUser ? "Save Changes" : "Finish"}
        />
      </form>
      {unexpectedError && (
        <span>
          Sorry, an unexpected error occurred. Please try again later.
        </span>
      )}
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

export default withAuthUser()(EditProfile as FunctionComponent<unknown>);
