import Image from "next/image";

export default function ProjectCard() {
  return (
    <div className="max-w-auto mx-10 bg-white rounded-xl shadow-lg flex m-10 ">
      <div className="max-w-sm  rounded-xl  overflow-hidden shadow-lg">
        <div className="block mx-auto rounded-full w-32 h-32 sm:flex-shrink-0 mt-3">
          <Image
            src="https://image.shutterstock.com/image-photo/studio-closeup-portrait-blond-mature-600w-1713936394.jpg"
            width="200"
            height="200"
            alt="Person's Face"
            className="rounded-full block mx-auto "
          />
        </div>

        <div className="px-6 py-4">
          <div className="content-center">
            <div className=" text-center font-bold text-xl ">Theil Doe</div>
            <p className=" text-center text-gray-500 font-semibold mb-3">
              Sofware Developer
            </p>
          </div>

          {/* <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p> */}
          <p className="text-gray-500 font-normal">Skills and Interests:</p>
        </div>
        <div className="px-6  pb-2">
          <span className="inline-block bg-blue-normal rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            UX Design
          </span>
          <span className="inline-block bg-blue-normal rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            Knime Master
          </span>
          <span className="inline-block bg-blue-normal rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            Pool
          </span>
        </div>
      </div>
    </div>
  );
}
