import ProjectCard from "../Cards/ProjectCard";
import ProfileCard from "../Cards/ProfileCard";
import NavBar from "../NavBar/NavBar";

import QueryCard from "../Cards/QueryCard";

export default function LandingPage() {
  return (
    <div>
      <NavBar />
      <div class=" bg-white ">
        <div class="grid justify-items-center absolute inset-x-0 top-5 ">
          <QueryCard />
        </div>
      </div>
      <div class=" bg-white py-5">
        <div class="grid justify-items-center mx-30">
          <div class="pt-20 px-20 ">
            <p class="font-sans text-3xl font-bold  text-black ">Projects</p>
            <div class="flex flex-wrap content-center">
              <ProjectCard />
              <ProjectCard />

              <ProjectCard />
            </div>
          </div>
 

          <div class="pt-20 px-20">
            <p class="font-sans text-3xl font-bold  text-black ">Profiles</p>
            <div class="flex flex-wrap content-center">
              <ProfileCard />
              <ProfileCard />

              <ProfileCard />
            </div>
          </div>
     
        </div>
      </div>

      <div class=" bg-white-dark py-10">
        <div class="grid justify-items-center mx-30">
          <p class="font-sans text-md    px-20">Made with ❤️ by Team 4</p>
        </div>
      </div>
    </div>
  );
}
