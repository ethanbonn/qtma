import {
  withAuthUser,
  AuthAction,
  withAuthUserSSR,
  useAuthUser,
} from "next-firebase-auth";
import { useForm } from "react-hook-form";
import { FunctionComponent, useState, useEffect } from "react";
import {
  Select,
  Textarea,
  Flex,
  HStack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserMetadata } from "firebase-admin/lib/auth/user-record";
import type { User, Link, Skill } from "../../../types/models";
import getUserData from "../../../functions/server/getUserData";
import type { UnregisteredUser } from "../../../types";
import { isUser } from "../../../functions/typeGuards";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/ChakraComp/Navbar";
import baseUrl from "../../../utils/baseUrl";
import QueryCard from "../../../components/Cards/QueryCard";
import SkillQuery from "../../../components/SkillQuery";
import ProfileSkills from "../../../components/Cards/SelectSkills/ProfileSkills";

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

// const EditProfile = (props: UnregisteredUser | UserMetadata) => {
const EditProfile = (props: UnregisteredUser | User) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const isTypeUser = isUser(props);

  console.log("USER DATA", props);

  // need skills in profile

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
  const [skillIDList, setSkillIDList] = useState(
    isTypeUser && props.skill_ids ? props.skill_ids : []
  );
  const [projectsList, setProjectsList] = useState(
    isTypeUser && props.project_ids ? props.project_ids : []
  );

  useEffect(() => {
    // register("skill_ids");
    if (skillIDList.length < 3) {
      setError("skillsList", {
        types: {
          required: "This is required",
        },
        message: "Please enter at least three skills!",
      });
    } else {
      clearErrors("skillsList");
    }
    // setMinThreeSkills(skillsList.length >= 3);
  }, [skillIDList]);

  const { _id, email } = props;
  const { getIdToken } = useAuthUser();

  const onSubmit = async (data: any) => {
    const token = await getIdToken();
    console.log("ON SUBMIT", data);

    // let allSkills = skillsList;
    // if (isTypeUser && props.skills) {
    //   allSkills = props.skills;
    //   Array.prototype.push.apply(allSkills, skillsList);
    // }

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
        skill_ids: skillIDList,
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
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-sans flex flex-col content-center  w-3/4 h-3/4 py-10 m-auto "
        >
          <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
            <Stack align="center">
              <Heading fontSize="4xl" textAlign="center">
                Complete Your Profile
              </Heading>
              <Text fontSize="lg" color="gray.600" />
            </Stack>
            <Box
              rounded="lg"
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="lg"
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="username" isRequired>
                  <FormLabel>Profile Picture:</FormLabel>
                  <input
                    type="file"
                    accept="image/*"
                    id="profilePicture"
                    {...register("profilePicture")}
                  />{" "}
                </FormControl>
                <FormControl id="username" isRequired>
                  <FormLabel>User Name</FormLabel>
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
                  {!uniqueUsername && (
                    <span>Username exists already, try again</span>
                  )}{" "}
                </FormControl>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        id="firstName"
                        className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                        defaultValue={isTypeUser ? props.firstName : undefined}
                        {...register("firstName", {
                          required: true,
                          maxLength: 24,
                        })}
                      />
                      {errors.firstName && <span>This field is required</span>}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        id="lastName"
                        className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                        defaultValue={isTypeUser ? props.lastName : undefined}
                        {...register("lastName", {
                          required: true,
                          maxLength: 24,
                        })}
                      />
                      {errors.lastName && <span>This field is required</span>}
                    </FormControl>
                  </Box>
                </HStack>

                <FormControl id="jobtitle" isRequired>
                  <FormLabel>Job Title</FormLabel>
                  <Input
                    type="text"
                    id="jobTitle"
                    className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                    defaultValue={isTypeUser ? props.jobTitle : undefined}
                    {...register("jobTitle", { maxLength: 24 })}
                  />
                </FormControl>

                <FormControl id="username" isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Help our community get to know you by introducing yourself"
                    // type="text"
                    id="userDescription"
                    className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                    defaultValue={
                      isTypeUser ? props.userDescription : undefined
                    }
                    {...register("userDescription", { maxLength: 240 })}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Timezone</FormLabel>
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
                  </Select>{" "}
                  {errors.timezone && <span>This field is required</span>}
                </FormControl>
                {/*
                <FormControl id="username" isRequired>
                  <SkillQuery stateChanger={setSkillsList} />
                </FormControl> */}

                <FormControl id="username">
                  <FormLabel>Links</FormLabel>
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
                                handleInputChange(
                                  e,
                                  i,
                                  "url",
                                  linksList,
                                  setLinksList
                                ),
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
                </FormControl>
                <FormControl id="Skills">
                  <FormLabel>Skills</FormLabel>

                  <div id="user-skills" className="font-sans text-black-normal">
                    <ProfileSkills
                      stateChanger={setSkillIDList}
                      initSkills={skillsList}
                    />
                  </div>

                  {errors.skillsList && <p>{errors.skillsList.message}</p>}
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    type="submit"
                    bg="green.400"
                    color="white"
                    _hover={{
                      bg: "green.500",
                    }}
                    value={isTypeUser ? "Save Changes" : "Finish"}
                  >
                    Save Changes
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align="center">
                    {/* Already a user? <Link color={"blue.400"}>Login</Link> */}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </form>
        {unexpectedError && (
          <span>
            Sorry, an unexpected error occurred. Please try again later.
          </span>
        )}
      </Flex>
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
