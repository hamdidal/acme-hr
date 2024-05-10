import AcmeIcon from "@/assets/icons/acmeIcon";
import ExitIcon from "@/assets/icons/exitIcon";
import React from "react";
import Image from "next/image";
import HamburgerMenuIcon from "@/assets/icons/hamburgerMenuIcon";

const Header = ({ user, isMenuOpen, setIsMenuOpen }: any) => {
  return (
    <div className="flex w-full items-center justify-between">
      <AcmeIcon currentColor={"#119DFF"} />
      <div className="flex px-1 py-0 gap-8 justify-between items-center text-gray-900 xs:hidden sm:hidden md:hidden">
        <div className="text-sm p-2 border-b-2 border-black rounded-[0.3125rem]">
          Job List
        </div>
        <div className="text-sm p-2 hover:cursor-pointer flex gap-1 items-center text-red-500">
          {" "}
          <ExitIcon /> Log Out
        </div>
        {user ? (
          <div className="text-sm p-2 text-gray-900 flex gap-1 items-center">
            {user?.email}{" "}
            <Image
              className="w-8 h-8 rounded-full"
              src={user?.profileImage}
              alt="avatar"
              width={10}
              height={10}
            />
          </div>
        ) : null}
      </div>{" "}
      {!isMenuOpen && (
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="lg:hidden text-gray-700"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <HamburgerMenuIcon />
        </button>
      )}
    </div>
  );
};

export default Header;
