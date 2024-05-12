import { JobDetail } from "@/services/be-api/dashboard/types";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
interface AppliedJobProps
  extends Pick<JobDetail, "name" | "location" | "companyName"> {}

const AppliedJob: FC<AppliedJobProps> = ({ name, location, companyName }) => {
  const { t } = useTranslation();

  return (
    <div
      className="rounded-lg border border-gray-100 bg-blue-30 flex flex-col p-3 self-stretch gap-2"
      data-testid="applied-job"
    >
      <div className="flex items-baseline gap-2">
        <p
          className="font-semibold text-blue-500 text-2xl leading-125"
          data-testid="job-name"
        >
          {name}
        </p>
        <p
          className="font-barlow font-bold text-blue-500 text-xs leading-150"
          data-testid="job-location"
        >
          {location}
        </p>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="font-barlow font-medium text-gray-500 text-base leading-150">
          {t("cardBy")}
        </p>
        <p
          className="font-semibold text-gray-700 text-lg leading-125"
          data-testid="company-name"
        >
          {companyName}
        </p>
      </div>
    </div>
  );
};
export default AppliedJob;
