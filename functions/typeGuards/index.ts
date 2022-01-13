import firebase from "firebase";
import { useEffect } from "react";
import type { UnregisteredUser } from "../../types";
import type { User } from "../../types/models";
import { useRouter } from "next/router";


export const isUser = (user: UnregisteredUser | User): user is User => {
    return (user as User).userName !== undefined;
}

export const handleUserType = (props: UnregisteredUser | User) => {
    const router = useRouter();
    const {email} = props;

    var displayName = email;

    // redirects 
    useEffect(() => {
        if (!isUser(props) &&  email !== null) {
        const {emailVerified, email} = props;
        var display_name = email;
        console.log("IsVerified: ", emailVerified);
        
        console.log("Unregistered User", props);
        // verify email here
        // router.push("/profile/edit");
        if (!emailVerified){
            router.push("/verify");
            // router.reload();
        } else {
            router.push("/profile/edit")
            // router.reload();
        }
        

        }
    });

    if (isUser(props)) {
        var displayName = props.firstName;
      }
    
    return displayName
}

