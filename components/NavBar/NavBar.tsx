import Link from "next/link";
import { useState } from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import getUserData from "../../functions/server/getUserData";
import { useRouter } from "next/router";
import NavMenu from "../../components/NavBar/NavMenu";


export default function NavBar(props: {login_name: string}) {
  const { signOut } = useAuthUser();
  const { login_name } = props;

  return (
    <nav className="bg-green-normal py-3">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link href="/">
                <span className="font-bold text-white text-3xl">Soar</span>
              </Link>
            </div>
          </div>
          <div className="items-center hidden space-x-8 lg:flex">
            <Link href="/projects">
              <h3 className="text-2xl font-medium text-white">Explore</h3>
            </Link>
          </div>
          <NavMenu first_name={login_name} />
        </div>
      </div>
    </nav>
  );
}

