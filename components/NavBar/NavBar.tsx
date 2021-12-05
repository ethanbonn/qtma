import Link from "next/link";

export default function NavBar() {
  return (
    <nav class="bg-green-normal">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <div>
              <a
                href="#"
                class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <span class="font-bold text-white text-3xl">Soar</span>
              </a>
            </div>
          </div>
          <div class="items-center hidden space-x-8 lg:flex">
            <Link href="/projects">
              <h3 class="text-2xl font-medium text-white">Explore</h3>
            </Link>
          </div>
          <div class="hidden md:flex items-center space-x-1">
            {/* <a href="" class="py-5 px-3">
                Login
              </a> */}
            <Link href="/login">
              <button class="font-sans font-bold px-4 py-2 text-white bg-green-normal rounded-md shadow-md">
                Sign in
              </button>
            </Link>
          </div>

          <div class="md:hidden flex items-center">
            <Link href="/login">
              <button class=" font-sans  px-4 py-2 text-white bg-green rounded-md shadow-md">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
