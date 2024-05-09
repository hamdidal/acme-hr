"use client";

import AcmeIcon from "@/assets/icons/acmeIcon";
import CloseIcon from "@/assets/icons/closeIcon";
import ExitIcon from "@/assets/icons/exitIcon";
import HamburgerMenuIcon from "@/assets/icons/hamburgerMenuIcon";
import useAuthStore from "@/context/auth-store";
import { UserModel } from "@/context/type";
import useUserStore from "@/context/user-store";
import Header from "@/layout/header";
import { useProfile } from "@/utils/hooks/queries/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { setAccessToken, accessToken } = useAuthStore();
  const { setUser, user } = useUserStore();
  const accessTokenLocal = localStorage.getItem("accessToken");
  const router = useRouter();
  const { data, isLoading, isSuccess, error } = useProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log("data", data);

  useEffect(() => {
    if (data?.data && isSuccess) {
      setUser(data?.data as UserModel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data, isSuccess]);

  console.log(user);

  console.log("accessToken", accessToken);

  useEffect(() => {
    if (!accessToken && !accessTokenLocal) {
      router.push("/");
    }
  }, [accessToken, accessTokenLocal, router]);

  console.log("u", user);

  return (
    <div className="flex bg-white w-full h-[100vh]">
      <div className="flex flex-col bg-red-500 w-3/4 h-full md:w-full xs:w-full  sm:w-full ">
        <div className="bg-white w-full pt-4 pb-4 pl-16 pr-16">
          <Header
            isMenuOpen={isMenuOpen}
            user={user}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>
      <div className="flex h-full xs:hidden sm:hidden md:hidden"></div>
      {isMenuOpen && (
        <div className="w-full h-full min-w-96 lg:hidden" id="navbar-default">
          <button
            type="button"
            className="flex justify-center items-center right-100 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 ms-auto  "
            onClick={() => setIsMenuOpen(false)}
          >
            <CloseIcon />
            <span className="sr-only">Close modal</span>
          </button>
          <ul className="font-medium flex flex-col p-4 gap-4 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <a
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                aria-current="page"
              >
                <div className="text-sm underline w-full justify-start pl-4">
                  Job List
                </div>
              </a>
            </li>
            <li>
              <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                <div className="text-sm hover:underline w-full justify-start hover:cursor-pointer flex gap-1 items-center text-red-500 pl-4">
                  <ExitIcon /> Log Out //{" "}
                </div>{" "}
              </a>
            </li>
            <li>
              <div className="text-sm flex gap-1 items-center w-full justify-start pl-4 text-gray-900">
                {user?.email}{" "}
                <Image
                  className="w-8 h-8 rounded-full"
                  src={user?.profileImage}
                  alt="avatar"
                  width={10}
                  height={10}
                />
              </div>
            </li>
          </ul>
        </div>
        // <div className="min-w-96 flex flex-col gap-8 lg:hidden items-start justify-start shadow-custom-shadow">

        // </div>
      )}
    </div>
  );
};

export default Dashboard;
