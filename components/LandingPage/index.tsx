import Link from "next/link";
import Card from "./Card"
export default function LandingPage() {
  return (
    <div>
      <nav class="container flex justify-around py-3 mx-auto bg-gradient-to-b from-green-300 to-green-400">
        <div class="flex items-center">
          <h3 class="text-2xl font-medium text-white">Soar</h3>
        </div>
        <div class="items-center hidden space-x-8 lg:flex">
          <h2 class="text-1xl font-medium text-white">Explore</h2>
        </div>
        <div class="flex items-center space-x-2">
          <Link href="/login">
            <button class="px-4 py-2 text-green-100 bg-green-500 rounded-md">
              Sign in
            </button>
          </Link>
        </div>
      </nav>

      <div class="container bg-green-400 py-40">
        <div class="grid justify-items-center">
          <p class="font-sans text-4xl font-large text-white px-3">
            Build the dream team to soar your ideas to the moon 🚀
          </p>

          <Card/>
        </div>

      </div>
    </div>
  );
}
