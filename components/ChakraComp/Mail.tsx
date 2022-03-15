import React, { useEffect, useState } from "react";
import  Link  from "next/link";
import { EmailIcon } from "@chakra-ui/icons";

import {Helmet} from "react-helmet";
import { Button } from "@chakra-ui/react";




const MailButton = ({ mailto, label, closer }) => {

    const [mailClick, setMailClick] = useState(false);

    useEffect(() => {
        console.log(mailClick);
        if (mailClick) closer();

        // Needs authentication check here and redirect 


    }, [setMailClick])
      
    return (
        <>

            <div >
                <Button onClick={() => { setMailClick(true)} }>

                    {/* NEED TO STYLE MAIL CONTENT */}
                    <a className="mailtoui" href="mailto:thor@example.com"  >
                        <EmailIcon />
                    </a>
                </Button>
                
                <Helmet>
                
                    <script src="https://cdn.jsdelivr.net/npm/mailtoui@1.0.3/dist/mailtoui-min.js"></script>

                    {/* <script src="https://cdn.jsdelivr.net/npm/mailtoui@1.0.3/dist/mailtoui-min.js"></script> */}
                </Helmet>

            </div>
            
        </>
    );
};

export default MailButton;
