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
  import Navbar from "../../components/ChakraComp/Navbar";
  import baseUrl from "../../utils/baseUrl";
import { Button, chakra, Input, Select, Textarea } from "@chakra-ui/react";
  
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
        author_ids: [_id],
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
        <Navbar {...props}/>
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
            <Input
                placeholder="Mars Rover 2.0"                 
                type="text"
                id="projectName"
                className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                {...register("name", { required: true, maxLength: 100 })}>
            </Input>
            {errors.projectName && <span>This field is required</span>}
        </label>
        <br />
        <label htmlFor="relationship" className="text-black-normal font-bold">
            Relationship Type
            <br />
            <Select id="country" {...register("desired_relationship_type", { required: true})}>
              <option value="collaborator">collaborator</option>
              <option value="sponsor">sponsor</option>
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
        <label htmlFor="timezone" className="text-black-normal font-bold">
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
            {errors.timezone && <span>This field is required</span>}
        </label>
        <br />
        <label
            htmlFor="description"
            className="font-sans text-black-normal font-bold"
        >
            Description
            <br />
            <Textarea
                placeholder="Here are my mars rover plans"                 
                type="text"
                id="description"
                className="font-sans my-1 border border-gray-200 rounded-lg w-full pl-1"
                {...register("description", { required: true, maxLength: 1000 })}>
            </Textarea>
        </label>
        <br />
          <label
            htmlFor="duration"
            className="font-sans text-black-normal font-bold"
          >
            Duration
            <br />
            <Select id="country" {...register("duration", { required: true})}>
              {/* <option value="short"   style={{color: "green"}}>short (less than 1 month)</option>
              <option value="medium" style={{color: "yellow"}}>medium (1-4 months)</option>
              <option value="long" style={{color: "red"}}>long (4+ months)</option> */}
              <option value="short"   >short (less than 1 month)</option>
              <option value="medium" >medium (1-4 months)</option>
              <option value="long" >long (4+ months)</option>
            </Select>
        </label>
        <br />
        <Button
            type="submit"
            // className=" font-sans px-4 py-2 text-white bg-green-normal rounded-full shadow-md w-1/5 self-center"
            className=" font-sans px-4 py-2 text-black bg-green-normal rounded-full shadow-md w-1/5 self-center"

            value="Create">
        Create
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
  
  export default withAuthUser()(CreateProject as FunctionComponent<unknown>);
  