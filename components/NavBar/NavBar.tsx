import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-green-normal py-3">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link href="/#">
                <span className="font-bold text-white text-3xl">Soar</span>
              </Link>
            </div>
          </div>
          <div className="items-center hidden space-x-8 lg:flex">
            <Link href="/projects">
              <h3 className="text-2xl font-medium text-white">Explore</h3>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {/* <a href="" className="py-5 px-3">
                Login
              </a> */}
            <Link href="/login">
              <button className="font-sans font-bold px-4 py-2 text-white bg-green-normal rounded-md shadow-md">
                Get Started
              </button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <Link href="/login">
              <button className=" font-sans  px-4 py-2 text-white bg-green rounded-md shadow-md">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
