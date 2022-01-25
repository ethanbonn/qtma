// drop down menu code : https://headlessui.dev/react/menu
import Link from "next/link";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import getUserData from "../../functions/server/getUserData";
// import { ChevronDownIcon } from '@heroicons/react/solid'

export default function NavMenu(props: { first_name: string }) {
  const { signOut } = useAuthUser();
  const AuthUser = useAuthUser();
  const { first_name } = props;
  return (
    <div className="hidden md:flex items-center space-x-1">
      {first_name ? (
        <>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-xl font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {first_name}

                {/* PUT A DOWN ICON HERE
                    <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                    /> */}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <a href={`/profile/${AuthUser.id}`}>
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Profile
                        </button>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                </div>
                {/* <div className="px-1 py-1">
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >

                            Archive
                        </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                            Contact
                        </button>
                        )}
                    </Menu.Item> */}
                {/* </div> */}
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a href="/">
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          onClick={() => {
                            signOut();
                          }}
                        >
                          Sign Out
                        </button>
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </>
      ) : (
        <>
          <Link href="/login">
            <button className="font-sans font-bold px-4 py-2 text-white bg-green-normal rounded-md shadow-md">
              Get Started
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
