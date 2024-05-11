import React, { useEffect, useState } from "react";
import Image from "next/image";
import useUserStore from "@/context/user-store";
import Col from "@/components/Col";
import { useGetAllJobsWithoutFilter } from "@/utils/hooks/queries/dashboard";
import Spinner from "@/components/Spinner";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const {t} = useTranslation()
  const [allData, setAllData] = useState<any>([]);
  const { data } = useGetAllJobsWithoutFilter();
  const { user } = useUserStore();

  useEffect(() => {
    if (data?.data.data as any) {
      setAllData(data?.data.data);
    }
  }, [data?.data]);

  const matchedJobs = allData.filter((job: any) =>
    user.appliedJobs.some((appliedJob) => appliedJob === job.id)
  );

  return allData.length > 0 ? (
    <div className="flex w-full lg:h-[100vh] md:h-[100vh] sm:h-[85vh] xs:h-[85vh] overflow-auto flex-col items-start gap-6 py-16 px-6 flex-1 self-stretch bg-white shadow-lg">
      <div className="flex flex-col justify-center items-center gap-4 self-stretch">
        <p className="text-blue-600 text-center font-semibold text-lg leading-125">
          {t("navBarAppliedJobs")}
        </p>
        {user ? (
          <div className="flex flex-col items-center p-0 px-6 gap-2">
            <div>
              <Image
                className="w-8 h-8 rounded-full"
                src={user?.profileImage}
                alt="avatar"
                width={10}
                height={10}
              />
            </div>
            <p className="text-gray-500 text-center font-medium text-base leading-125">
              {user?.email}{" "}
            </p>
          </div>
        ) : null}
      </div>
      {matchedJobs.map((row: any, index: any) => (
        <Col key={index} row={row} />
      ))}
    </div>
  ) : (
    <div className="flex w-full justify-center lg:h-[100vh] md:h-[100vh] sm:h-[85vh] xs:h-[85vh] overflow-auto flex-col items-start gap-6 py-16 px-6 flex-1 self-stretch bg-white shadow-lg">
      <Spinner />
    </div>
  );
};

export default Navbar;
