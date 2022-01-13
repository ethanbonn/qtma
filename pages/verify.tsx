import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import getUserData from "../functions/server/getUserData";
import { isUser } from "../functions/typeGuards";
import { UnregisteredUser } from "../types";
import { User } from "../types/models";
import firebase from "firebase";


async function sendEmail() {
  await firebase.auth().currentUser?.sendEmailVerification({   // props.email?
    url: "http://localhost:3000/profile/edit",
    }).then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return errorMessage;
        
      });
} 

const Verify = (props: UnregisteredUser | User) => {
    var displayError;
    const isUserType = isUser(props);
    const router = useRouter();
    // var display_name = null; // for NavMenu Component
    if (isUserType) {
      // user account already created
      router.push("/");
    } else {
      useEffect(() => {
        // if (!isUserType) {
        const {emailVerified} = props;
        console.log("verified: ",emailVerified);

        if (!emailVerified){
          displayError = sendEmail();
        } else {
          // user is already verified
          console.log("verified should be true: ", emailVerified);
          router.push("/profile/edit");
        }
      }, []);
    }
  
    
  
    return (
      <div>
        <h1>Verify Your Email Before Creating Account</h1>
        <body>{displayError} </body>
      </div>
    );
}

export const getServerSideProps = withAuthUserTokenSSR()(
    async ({ AuthUser }) => {
      const { email, id, emailVerified } = AuthUser;
      const userData = await getUserData(id);


  
      return {
        props: userData ?? { email, id, emailVerified},
      };
    }
  );
  
  export default withAuthUser()(Verify as FunctionComponent<unknown>);
