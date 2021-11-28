export default function Card() {
  return (
    <div class=" p-4 m-10 max-w-auto mx-auto bg-white rounded-xl shadow-lg flex  ">
      <div class="flex flex-wrap content-center">
        <div class="mx-2">
          <div class="text-xl font-medium text-black">I'm looking for </div>
          <input class="my-3 border border-black rounded-lg  px-1 " />
        </div>
        <div class="mx-2">
          <div class="text-xl font-medium text-black">that are skilled in </div>
          <input class="my-3 border border-black rounded-lg  px-1 " />
        </div>
        <div class="mx-2">
          <div class="text-xl font-medium text-black">to build </div>
          <input class="my-3 border border-black rounded-lg  px-1 " />
        </div>

        <div>
        <div class="text-xl font-medium text-black"> </div>
          <button class="px-3 py-1 mt-9 text-green-100 bg-green-500 rounded-lg">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
