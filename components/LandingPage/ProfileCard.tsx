export default function ProjectCard() {
  return (
    <div class=" max-w-auto mx-10 bg-white rounded-xl shadow-lg flex m-10 ">
      <div class="max-w-sm  rounded-xl  overflow-hidden shadow-lg">


        <img
          class="block mx-auto h-20 rounded-full sm:mx-0 sm:flex-shrink-0"
          src="https://api.time.com/wp-content/uploads/2020/06/crystalball.jpg?w=800&quality=85"
          alt="Woman's Face"
        />

        <div class="px-6 py-4">
          <div>
            <div class="font-bold text-xl ">John Doe</div>
            <p class="text-gray-500 font-semibold mb-3">Sofware Developer</p>
          </div>

          {/* <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, Nonea! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p> */}
          <p class="text-gray-500 font-semibold">Skills and Interests:</p>
        </div>
        <div class="px-6  pb-2">
          <span class="inline-block bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            UX Design
          </span>
          <span class="inline-block bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            Knime Master
          </span>
          <span class="inline-block bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            Knime
          </span>
        </div>
      </div>
    </div>
  );
}
