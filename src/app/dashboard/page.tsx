/* eslint-disable @next/next/no-img-element */
"use client";

import CloseIcon from "@/assets/icons/closeIcon";
import ExitIcon from "@/assets/icons/exitIcon";
import useAuthStore from "@/stores/auth-store";
import { UserModel } from "@/stores/types";
import useUserStore from "@/stores/user-store";
import Header from "@/core/layouts/Header";
import { useProfile } from "@/hooks/queries/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import _ from "lodash";
import Navbar from "@/core/layouts/Navbar";
import { useGetAllJobs } from "@/hooks/queries/dashboard";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import { JobTable } from "@/core/layouts/Table";

const Dashboard = () => {
  const { accessToken, clearAccessToken } = useAuthStore();
  const { setUser, user, isSuccess, setIsSuccess } = useUserStore();
  const router = useRouter();
  const {
    data,
    isLoading,
    isSuccess: profileSuccess,
    refetch: profileRefetch,
  } = useProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [allJobsData, setAllJobsData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const { t } = useTranslation();
  const {
    isPending,
    isError,
    data: jobsData,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useGetAllJobs({
    page: page,
    perPage: pageSize,
    searchQuery: selectedField ? filterText : "",
    searchField: filterText ? selectedField : "",
  });

  const fieldOptions = [
    { value: "", text: t("dashboardFieldSelectedOption") },
    { value: "name", text: t("dashboardFieldSelectName") },
    { value: "companyName", text: t("dashboardFieldSelectCompanyName") },
    { value: "location", text: t("dashboardFieldSelectLocation") },
  ];

  const handleLogOut = () => {
    setTimeout(() => {
      router.push("/");
    }, 300);
    clearAccessToken();
  };

  useEffect(() => {
    if (data?.data && profileSuccess) {
      setUser(data?.data as UserModel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data, profileSuccess, isSuccess]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterText(e.target.value);
    setSelectedField("name");
  };

  useEffect(() => {
    if (filterText === "") {
      setSelectedField("");
    }
  }, [filterText]);

  const debouncedOnChange = debounce(onChange, 1000);

  useEffect(() => {
    if (isSuccess) {
      profileRefetch();
      refetch();
      setIsSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="flex bg-white w-full h-full">
      <div className="flex flex-col w-3/4 h-full md:w-full xs:w-full  sm:w-full ">
        <div className="bg-white w-full py-2 pl-16 pr-16">
          <Header
            isMenuOpen={isMenuOpen}
            user={user}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
        <p
          data-testid="dashboard-header"
          className="flex w-full h-[5.625rem] justify-center items-center gap-[0.375rem] rounded-[0.3125rem] bg-gradient-to-r from-blue-600 to-blue-900 text-white text-center text-4xl font-semibold leading-9"
        >
          {t("dashboardJobList")}
        </p>
        <div className="flex md:flex-col sm:flex-col xs:flex-col px-16 py-6 justify-around items-center gap-[1.4375rem] bg-[#4D9FDB]">
          <div className="flex w-full gap-4 items-center justify-center">
            <p className="flex text-black text-sm font-medium leading-6">
              {t("dashboardFieldFilter")}
            </p>
            <select
              data-testid="filter-dropdown"
              value={selectedField}
              onChange={(event) => setSelectedField(event.target.value)}
              className="block appearance-none w-1/2 bg-white border rounded-lg border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline text-opacity-50 text-gray-900"
            >
              {fieldOptions.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex w-full gap-4 items-center justify-center">
            <p className="flex text-black text-sm font-medium leading-6">
              {t("dashboardSearch")}
            </p>
            <input
              type="text"
              data-testid="search-input"
              disabled={selectedField === ""}
              defaultValue={filterText}
              onChange={debouncedOnChange}
              className="bg-gray-50 border text-opacity-50 text-gray-900 rounded-lg border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder={t("dashboardSearchPlaceholder")}
            />
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <JobTable
            page={page}
            data={jobsData?.data}
            setPage={setPage}
            setPageSize={setPageSize}
            count={jobsData?.meta.total}
            isPending={isPending}
            pageSize={pageSize}
          />
        </div>
      </div>
      <div className="flex w-1/4 h-full xs:hidden sm:hidden md:hidden shadow-custom-shadow ">
        <Navbar />
      </div>
      {isMenuOpen && (
        <div className="bg-white max-w-[50%] w-full flex flex-col absolute left-1/2 h-full lg:hidden z-50">
          <button
            type="button"
            className="flex justify-center items-center right-100 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 ms-auto  "
            onClick={() => setIsMenuOpen(false)}
          >
            <CloseIcon />
            <span className="sr-only">{t("hamburgerMenuCloseModal")}</span>
          </button>
          <ul className="font-medium flex flex-col p-4 gap-4">
            <li>
              <a
                className="block py-2 px-3 text-white bg-blue-700 rounded"
                aria-current="page"
              >
                <p className="text-sm underline w-full justify-start pl-4">
                  {t("hamburgerMenuJobList")}{" "}
                </p>
              </a>
            </li>
            <li>
              <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">
                <p
                  id="logout-button"
                  onClick={handleLogOut}
                  className="text-sm hover:underline w-full justify-start hover:cursor-pointer flex gap-1 items-center text-red-500 pl-4"
                >
                  <ExitIcon /> {t("hamburgerMenuLogOut")}
                </p>{" "}
              </a>
            </li>
            <li>
              <p className="text-sm flex gap-1 items-center w-full justify-start pl-4 text-gray-900">
                {user?.email}{" "}
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.profileImage}
                  alt="avatar"
                  width={10}
                  height={10}
                />
              </p>
            </li>
          </ul>
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
