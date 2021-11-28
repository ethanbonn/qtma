import Link from "next/link";
import PreviewCard from "./PreviewCard";
import ProjectCard from "./ProjectCard";
import ProfileCard from "./ProfileCard";

import Card from "./QueryCard";
export default function LandingPage() {
  return (
    <div>
      <nav class="container flex justify-around py-3 mx-auto bg-gradient-to-b from-green-300 to-green-400">
        <div class="flex items-center">
          <h3 class="font-sans  text-2xl font-medium text-white">Soar</h3>
        </div>
        <div class="items-center hidden space-x-8 lg:flex">
          <h3 class="font-sans  text-1xl font-medium text-white">Explore</h3>
        </div>
        <div class="flex items-center space-x-2">
          <Link href="/login">
            <button class=" font-sans  px-4 py-2 text-white bg-green-600 rounded-md shadow-md">
              Sign in
            </button>
          </Link>
        </div>
      </nav>

      <div class="container bg-green-400 py-20">
        <div class="grid justify-items-center mx-30">
          <p class="font-sans text-4xl font-bold  text-white px-3">
            Build the dream team to soar your ideas to the moon
          </p>

          <Card />
          <div class="flex flex-wrap content-center">
            <PreviewCard />
            <PreviewCard />

            <PreviewCard />
          </div>
        </div>
      </div>
      <div class="container bg-gray-100 py-40">
        <div class="grid justify-items-center mx-30">
          <p class="font-sans text-3xl font-bold  text-blue-500 px-20">
            Discover hundreds of projects to build, and connect with other
            brightminded individuals{" "}
          </p>

          <div class="pt-20 px-20">
            <p class="font-sans text-3xl font-bold  text-black ">
              Featured Projects
            </p>
            <div class="flex flex-wrap content-center">
              <ProjectCard />
              <ProjectCard />

              <ProjectCard />
            </div>
          </div>
          <button class=" font-sans  px-4 py-2 text-white bg-green-500 rounded-full shadow-md">
            Explore more projects{" "}
          </button>

          <div class="pt-20 px-20">
            <p class="font-sans text-3xl font-bold  text-black ">Profiles</p>
            <div class="flex flex-wrap content-center">
              <ProfileCard />
              <ProfileCard />

              <ProfileCard />
            </div>
          </div>
          <button class=" font-sans  px-4 py-2 text-white bg-green-500 rounded-full shadow-md">
            Explore more profiles{" "}
          </button>
        </div>
      </div>

      <div class="container bg-gray-300 py-10">
        <div class="grid justify-items-center mx-30">
          <p class="font-sans text-md    px-20">Made with ❤️ by Team 4</p>
        </div>
      </div>
    </div>
  );
}
