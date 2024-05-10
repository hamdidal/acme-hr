"use client";

import AcmeIcon from "@/assets/icons/acmeIcon";
import CloseIcon from "@/assets/icons/closeIcon";
import ExitIcon from "@/assets/icons/exitIcon";
import HamburgerMenuIcon from "@/assets/icons/hamburgerMenuIcon";
import useAuthStore from "@/context/auth-store";
import { UserModel } from "@/context/type";
import useUserStore from "@/context/user-store";
import Header from "@/layout/Header";
import { useProfile } from "@/utils/hooks/queries/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import _ from "lodash";
import { MyTable } from "@/layout/Table";
import Navbar from "@/layout/Navbar";
import { useGetAllJobs } from "@/utils/hooks/queries/dashboard";
import debounce from "lodash.debounce";
import Spinner from "@/components/Spinner";

const fieldOptions = [
  { value: "", text: "Select an option" },
  { value: "name", text: "Name" },
  { value: "companyName", text: "Company Name" },
  { value: "location", text: "Location" },
];

const Dashboard = () => {
  const { setAccessToken, accessToken } = useAuthStore();
  const { setUser, user } = useUserStore();
  const accessTokenLocal = localStorage.getItem("accessToken");
  const router = useRouter();
  const { data, isLoading, isSuccess, error } = useProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("name");
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [allJobsData, setAllJobsData] = useState([]);

  const {
    isPending,
    isError,
    data: jobsData,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useGetAllJobs({
    page,
    perPage: pageSize,
    searchQuery: filterText || undefined,
    searchField: selectedField,
  });

  useEffect(() => {
    if ((jobsData as { data: any })?.data?.data) {
      setAllJobsData((jobsData as { data: any })?.data.data);
    }
  }, [jobsData?.data]);

  useEffect(() => {
    if (data?.data && isSuccess) {
      setUser(data?.data as UserModel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data, isSuccess]);

  useEffect(() => {
    if (!accessToken && !accessTokenLocal) {
      router.push("/");
    }
  }, [accessToken, accessTokenLocal, router]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterText(e.target.value);
  };

  const debouncedOnChange = debounce(onChange, 1000);

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
        <p className="flex w-full h-[5.625rem] justify-center items-center gap-[0.375rem] rounded-[0.3125rem] bg-gradient-to-r from-blue-600 to-blue-900 text-white text-center font-rubik text-4xl font-semibold leading-9">
          Job List
        </p>
        <div className="flex md:flex-col sm:flex-col xs:flex-col px-16 py-6 justify-around items-center gap-[1.4375rem] bg-[#4D9FDB]">
          <div className="flex w-full gap-4 items-center justify-center">
            <p className="flex text-black text-sm font-medium leading-6">
              Field Filter
            </p>
            <select
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
              Search
            </p>
            <input
              type="text"
              defaultValue={filterText}
              onChange={debouncedOnChange}
              className="bg-gray-50 border text-opacity-50 text-gray-900 rounded-lg border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="Type something to see job postings"
            />
          </div>
        </div>
        {isPending ? (
          <div className="flex w-full h-[100vh] justify-start items-center">
          <Spinner />
          </div>
        ) : allJobsData.length > 0 ? (
          <div className="flex w-full justify-center items-center">
            <MyTable
              data={allJobsData}
              setPage={setPage}
              setPageSize={setPageSize}
            />
          </div>
        ) : (
          <div className="flex w-full h-[100vh] justify-center items-center">
            <p className="text-4xl font-semibold m-10 text-gray-500">
              No Jobs Found
            </p>
          </div>
        )}
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
            <span className="sr-only">Close modal</span>
          </button>
          <ul className="font-medium flex flex-col p-4 gap-4">
            <li>
              <a
                className="block py-2 px-3 text-white bg-blue-700 rounded"
                aria-current="page"
              >
                <p className="text-sm underline w-full justify-start pl-4">
                  Job List
                </p>
              </a>
            </li>
            <li>
              <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">
                <p className="text-sm hover:underline w-full justify-start hover:cursor-pointer flex gap-1 items-center text-red-500 pl-4">
                  <ExitIcon /> Log Out
                </p>{" "}
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
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
