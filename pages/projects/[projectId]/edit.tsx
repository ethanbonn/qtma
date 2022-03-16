import {
    withAuthUser,
    AuthAction,
    withAuthUserSSR,
    useAuthUser,
  } from "next-firebase-auth";
  import { useForm } from "react-hook-form";
  import { useRouter } from "next/router";
  import { FunctionComponent, useState, useEffect } from "react";
  import type { User, Link, Skill } from "../../../types/models";
  import getUserData from "../../../functions/server/getUserData";
  import type { UnregisteredUser } from "../../../types";
  import { isUser } from "../../../functions/typeGuards";
  import Footer from "../../../components/Footer";
  import Navbar from "../../../components/ChakraComp/Navbar";
  import baseUrl from "../../../utils/baseUrl";
import { Button, chakra, FormControl, Input, Select, Textarea } from "@chakra-ui/react";
import SkillSelect from "../SkillSelect";
import ProjectSkills from "../../../components/Cards/SelectSkills/ProjectSkills";
import UserSelect from "../UserSelect";
import getProjectByUID from "../../../functions/server/getProjectByID";

const EditProject = (props: UnregisteredUser | User) => {
    const [proj_name, set_name] = useState("");
    const [proj_relationship_type, set_relationship_type] = useState("");
    const [proj_desc, set_desc] = useState("");
    const [proj_duration, set_duration] = useState("");
    const [skills, set_skills] = useState([]);
    const [skillIDs, set_skill_ids] = useState([]);
    const [users, set_users] = useState([]);
    const [userIDs, set_user_ids] = useState([]);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      setError,
      clearErrors,
    } = useForm();
    const isTypeUser = isUser(props);
  
    const { _id, email } = props;
    const { getIdToken } = useAuthUser();

  
    const router = useRouter();
    const projectId = router.query.projectId;

    useEffect(() => {
        async function handler() {
            await fetch(`${baseUrl}/api/projects/id=${projectId}`, {
                method: "GET"
            })
            .then((response) => response.json())
            .then((project) => {
                const data = project.data[0];
                console.log("PROJECT", data);
                set_name(data.name);
                set_relationship_type(data.desired_relationship_type);
                set_desc(data.description);
                set_duration(data.duration);
                set_skills(data.skills);
                set_skill_ids(data.skill_ids);
                set_users(data.users);
                set_user_ids(data.author_ids);

                console.log("SKILLS HERE", data.skills);
            });

            console.log("Passing into ProjectSkills", skills);
        };
        handler();
    }, []);

    useEffect(() => {
      // register("skill_ids");
      console.log("Users in effect", users);
      if (users.length < 1) {
        setError("users", {
          types: {
            required: "This is required",
          },
          message: "You must have atleast one project author",
        });
      } else {
        clearErrors("users");
      }
      // setMinThreeSkills(skillsList.length >= 3);
    }, [users]);

    const onSubmit = async (data: any) => {
      console.log(data);
      // var skills = skills.map((x: Skill) => {return {
      //   _id: x._id,
      //   name: x.name,
      //   followers: x.followers,
      //   project_ids: x.project_ids
      // }});

      // var skill_ids = skills.map((x: Skill) => 
      //   x._id
      // );
      console.log("SKILLs", skills);

      const token = await getIdToken();
      var reqBody = isTypeUser ? JSON.stringify({
        author_ids: userIDs,
        // author_picture: (props.profilePicture ?? "https://avatars.dicebear.com/api/male/username.svg"),
        // author_name: (props.firstName + " " + props.lastName),
        // author_title: props.jobTitle,
        // author_username: props.userName,
        skill_ids: skillIDs,
        name: data.name ? data.name : proj_name,
        desired_relationship_type: proj_relationship_type,
        description: data.description ? data.description : proj_desc,
        duration: proj_duration,
        _id: projectId
        
      }) : JSON.stringify({
        author_id: userIDs,
  
        skill_ids: skillIDs,
        name: proj_name,
        desired_relationship_type: proj_relationship_type,
        description: proj_desc,
        duration: proj_duration,
        _id: projectId
        // skills: skills
      });

      console.log("REQ BODY", reqBody);

      await fetch(
        `${baseUrl}/api/projects/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: token } : {}),
          },
          body: reqBody
        }
      );
      window.location.href = "/";
    };
  
    return (
      <>
        <Navbar {...props}/>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-sans flex flex-col content-center  w-3/4 h-3/4 py-10 m-auto "
        >
        <div className="font-sans text-3xl font-bold text-black">
            Edit Project
        </div>
        <br />
        <label
            htmlFor="projectName"
            className="font-sans text-black-normal font-bold"
        >
            Name
            <br />
            <Input
                placeholder="Mars Rover 2.0"
                defaultValue={proj_name}
                type="text"
                id="projectName"
                className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                {...register("name", { maxLength: 40 })}>
            </Input>
            {errors.name && errors.name.type === "required" && <span>This field is required</span>}
            {errors.name && errors.name.type === "maxLength" && <span>Project name should be less than 40 characters</span>}
        </label>
        <br />
        <label htmlFor="relationship" className="text-black-normal font-bold">
            Work Style
            <br />
            <Select 
                id="relationship"
                defaultValue={proj_relationship_type}
                {...register("desired_relationship_type", { required: true})}
            >
              <option value="collaborative">collaborative</option>
              <option value="independent">independent</option>
            </Select>
            {/* <input
                type="text"
                id="relationship"
                className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                defaultValue={"collaborator"}
                
            /> */}
            {errors.relationship && <span>This field is required</span>}
        </label>
        <br />
        {/* <label htmlFor="timezone" className="text-black-normal font-bold">
            Timezone
            <br />
            <Select id="country" {...register("author_timezone", { required: true})}>
              <option value="EST">Eastern Standard Time (EST)</option>
              <option value="PST">Pacific Standard Time (PST)</option>
              <option value="ACST">Australian Central Standard Time (ACST)</option>
              <option value="AEST">Australian Eastern Standard Time (AEST)</option>
              <option value="AKST">Alaska Standard Time (AKST)</option>
              <option value="AST">Atlantic Standard Time (AST)</option>
              <option value="AWST">Australian Western Standard Time (AWST)</option>
              <option value="CET">Central European Time (CET)</option>
              <option value="CST">Central Standard Time (CST)</option>
              <option value="EET">Eastern European Time (EET)</option>
              <option value="MST">Mountain Standard Time (MST)</option>
              <option value="WET">Western European Time (WET)</option>
            </Select>
            {/* <input
                type="text"
                id="timezone"
                className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                defaultValue={"EST"}
                
            /> */}
            {/* {errors.timezone && <span>This field is required</span>}
        </label> */} 
        <br />
        <label
            htmlFor="description"
            className="font-sans text-black-normal font-bold"
        >
            Description
            <br />
            <Textarea
                placeholder="Here are my mars rover plans"                 
                defaultValue={proj_desc}
                id="description"
                className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                {...register("description", { maxLength: 100 })}>
            </Textarea>
            {errors.description && errors.description.type === "required" && <span>This field is required</span>}
            {errors.description && errors.description.type === "maxLength" && <span>Project description should be less than 100 characters</span>}
        </label>
        <br />
          <label
            htmlFor="duration"
            className="font-sans text-black-normal font-bold"
          >
            Duration
            <br />
            <Select
                id="duration"
                defaultValue={proj_duration}
                {...register("duration", { required: true})}>
              {/* <option value="short"   style={{color: "green"}}>short (less than 1 month)</option>
              <option value="medium" style={{color: "yellow"}}>medium (1-4 months)</option>
              <option value="long" style={{color: "red"}}>long (4+ months)</option> */}
              <option value="short"   >short (less than 1 month)</option>
              <option value="medium" >medium (1-4 months)</option>
              <option value="long" >long (4+ months)</option>
            </Select>
        </label>
        <br/>
        <label
          htmlFor="skills"
          className="font-sans text-black-normal font-bold"
        >
          Required Skills
          <br />
            <ProjectSkills stateChanger={set_skill_ids} initSkills={skills}/>
          <br />
        </label>
        <FormControl id="users">
        <label
          htmlFor="users"
          className="font-sans text-black-normal font-bold"
        >
          People
          <br />
            <UserSelect stateChanger={set_user_ids} initUsers={users}/>
          <br />
        </label>
        {errors.users && <p>{errors.users.message}</p>}
        </FormControl>
        

        <Button
            type="submit"
            // className=" font-sans px-4 py-2 text-white bg-green-normal rounded-full shadow-md w-1/5 self-center"
            className=" font-sans px-4 py-2 text-black bg-green-normal rounded-full shadow-md w-1/5 self-center"

            value="Create">
        Submit
        </Button>

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
  
  export default withAuthUser()(EditProject as FunctionComponent<unknown>);
  