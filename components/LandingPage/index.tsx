import PreviewCard from "./PreviewCard";
import ProjectCard from "../Cards/ProjectCard";
import ProfileCard from "../Cards/ProfileCard";
import NavBar from "../NavBar/NavBar";

import Card from "../Cards/QueryCard";
export default function LandingPage() {
  return (
    <div>
      <NavBar />
      <div className=" bg-green-normal py-20">
        <div className="grid justify-items-center mx-30">
          <p className="font-nunito text-4xl font-bold  text-white px-3">
            Build the dream team to soar your ideas to the moon.
          </p>
          <Card />
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
              <ProjectCard />
              <ProjectCard />

              <ProjectCard />
            </div>
          </div>
          <button className=" font-sans  px-4 py-2 text-white bg-green-normal rounded-full shadow-md">
            Explore more projects{" "}
          </button>

          <div className="pt-20 px-20">
            <p className="font-sans text-3xl font-bold  text-black ">Profiles</p>
            <div className="flex flex-wrap content-center">
              <ProfileCard />
              <ProfileCard />

              <ProfileCard />
            </div>
          </div>
          <button className=" font-sans  px-4 py-2 text-white bg-green-normal rounded-full shadow-md">
            Explore more projects{" "}
          </button>
        </div>
      </div>

      <div className=" bg-white-dark py-10">
        <div className="grid justify-items-center mx-30">
          <p className="font-sans text-md    px-20">Made with ❤️ by Team 4</p>
        </div>
      </div>
    </div>
  );
}
