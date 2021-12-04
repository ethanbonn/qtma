export default function ProjectCard() {
  return (
    <div class=" max-w-auto mx-10 bg-white rounded-xl shadow-lg flex m-10 ">
      <div class="max-w-sm  rounded-xl  overflow-hidden shadow-lg">
        <img
          class="block mx-auto rounded-full w-32 h-32 sm:flex-shrink-0 mt-3"
          src="https://image.shutterstock.com/image-photo/studio-closeup-portrait-blond-mature-600w-1713936394.jpg"
          alt="Woman's Face"
        />

        <div class="px-6 py-4">
          <div class="content-center">
            <div class=" text-center font-bold text-xl ">Theil Doe</div>
            <p class=" text-center text-gray-500 font-semibold mb-3">Sofware Developer</p>
          </div>

          {/* <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p> */}
          <p class="text-gray-500 font-normal">Skills and Interests:</p>
        </div>
        <div class="px-6  pb-2">
          <span class="inline-block bg-blue-normal rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            UX Design
          </span>
          <span class="inline-block bg-blue-normal rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            Knime Master
          </span>
          <span class="inline-block bg-blue-normal rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            Pool
          </span>
        </div>
      </div>
    </div>
  );
}
