import { useState, useEffect } from "react";
import PreviewCard from "./PreviewCard";
import ProjectCard from "../Cards/ProjectCard";
// import ProfileCard from "../Cards/ProfileCard";
// import ProjectCard from "../ChakraComp/ProjectCard";
import ProfileCard from "../ChakraComp/ProfileCard";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import Card from "../Cards/QueryCard";
import queryDB from "../../functions/server/queryDB";


export default function LandingPage() {
  const [projects, update_projects] = useState([]);



  useEffect( () => {
  }, [projects]);

  return (
    <div>
      {/* <NavBar /> */}
      <div className=" bg-green-normal py-20">
        <div className="grid justify-items-center mx-30">
          <p className="font-nunito text-4xl font-bold  text-white px-3">
            Build the dream team to soar your ideas to the moon.
          </p>
          <Card stateChanger={update_projects} />
          <div className="flex flex-wrap content-center">
            <PreviewCard />
            <PreviewCard />
            <PreviewCard />
          </div>
        </div>
      </div>
      <div className=" bg-white py-40">
        <div className="grid justify-items-center mx-30">
          <p className="font-sans text-center text-4xl font-bold  text-blue-normal px-40">
            Discover hundreds of projects to build, and connect with other
            brightminded individuals.
          </p>

          <div className="pt-20 px-20">
            <p className="font-sans text-3xl font-bold  text-black ">
              Featured Projects
            </p>
            <div className="flex flex-wrap content-center">
              {
                projects.length === 0 ? (
                  <>
                    <p>No data</p>
                  </>
                ) : (
                  <>
                    {
                      projects.map((proj) => {
                        return (<ProjectCard name={proj.name} skills={proj.skills} {... proj} />)
                      })
                    }
                  </>
                )
              }
            </div>
          </div>
          <button className=" font-sans  px-4 py-2 text-white bg-green-normal rounded-full shadow-md">
            Explore more projects{" "}
          </button>

          <div className="pt-20 px-20">
            <p className="font-sans text-3xl font-bold  text-black ">
              Profiles
            </p>
            <div className="flex flex-wrap content-center">
              <ProfileCard />
              <ProfileCard />

              <ProfileCard />
            </div>
          </div>
          <button className=" font-sans  px-4 py-2 text-white bg-green-normal rounded-full shadow-md">
            Explore more profiles{" "}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
