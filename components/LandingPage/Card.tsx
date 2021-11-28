export default function Card() {
  return (
    <div class="p-6 m-10 max-w-sm mx-auto bg-white rounded-xl shadow-md flex  space-x-4">
      <div class="grid justify-items-center">
        <div>
          <div class="text-xl font-medium text-black">I'm looking for </div>
          <input class="my-3 border border-black rounded-lg  px-1 " />
        </div>
        <div>
          <div class="text-xl font-medium text-black">that are skilled in </div>
          <input class="my-3 border border-black rounded-lg  px-1 " />
        </div>
        <div>
          <div class="text-xl font-medium text-black">to build </div>
          <input class="my-3 border border-black rounded-lg  px-1 " />
        </div>
      </div>
    </div>
  );
}
