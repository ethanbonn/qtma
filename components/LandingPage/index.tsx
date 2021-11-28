export default function LandingPage() {
  return (
    <nav class="container flex justify-around py-8 mx-auto ">
      <div class="flex items-center">
        <h3 class="text-2xl font-medium text-green-500">Soar</h3>
      </div>
      <div class="items-center hidden space-x-8 lg:flex">Explore</div>
      <div class="flex items-center space-x-2">

        <button class="px-4 py-2 text-green-100 bg-green-500 rounded-md">
          Sign in
        </button>
      </div>
    </nav>
  );
}
