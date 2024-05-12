/* eslint-disable @next/next/no-img-element */
import AcmeIcon from "@/assets/icons/acmeIcon";
import ExitIcon from "@/assets/icons/exitIcon";
import React, { FC } from "react";
import Image from "next/image";
import HamburgerMenuIcon from "@/assets/icons/hamburgerMenuIcon";
import { LanguagePickerDropdown } from "./LanguagePickerDropdown";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { UserModel } from "@/stores/types";
interface HeaderProps {
  user: UserModel;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Header: FC<HeaderProps> = ({ user, isMenuOpen, setIsMenuOpen }) => {
  const { t } = useTranslation();
  const { clearAccessToken } = useAuthStore();
  const router = useRouter();
  const handleLogOut = () => {
    setTimeout(() => {
      router.push("/");
    }, 300);
    clearAccessToken();
  };
  return (
    <div
      data-testid="header-container"
      className="flex w-full items-center justify-between"
    >
      <div data-testid="header-icon" className="flex items-center gap-10">
        <AcmeIcon currentColor={"#119DFF"} />
        <LanguagePickerDropdown />
      </div>
      <div
        data-testid="header-title"
        className="flex px-1 py-0 gap-8 justify-between items-center text-gray-900 xs:hidden sm:hidden md:hidden"
      >
        <p className="text-sm p-2 border-b-2 border-black rounded-[0.3125rem]">
          {t("headerJobList")}
        </p>
        <p
          data-testid="header-logout"
          onClick={handleLogOut}
          className="text-sm p-2 hover:cursor-pointer flex gap-1 items-center text-red-500"
        >
          {" "}
          <ExitIcon /> {t("headerLogOut")}
        </p>
        {user ? (
          <p
            data-testid="header-user"
            className="text-sm p-2 text-gray-900 flex gap-1 items-center"
          >
            {user?.email}
            <img
              className="w-8 h-8 rounded-full"
              src={user?.profileImage}
              alt="avatar"
              width={10}
              height={10}
            />
          </p>
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
