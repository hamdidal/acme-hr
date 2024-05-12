/* eslint-disable @next/next/no-img-element */
import SalaryIcon from "@/assets/icons/salaryIcon";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import Amazon from "@/assets/images/amazon.png";
import useUserStore from "@/stores/user-store";
import Modal from "./Modal";
import KeywordsIcon from "@/assets/icons/keywordIcon";
import { useJobApply, useJobWithdraw } from "@/hooks/queries/dashboard";
import { useTranslation } from "react-i18next";
import { JobDetail } from "@/services/be-api/dashboard/types";

interface CardProps extends JobDetail {}

export const Card: FC<CardProps> = ({
  name,
  location,
  companyName,
  salary,
  id,
  keywords,
}) => {
  const { t } = useTranslation();
  const { user, setIsSuccess } = useUserStore();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const isJobApplied = user.appliedJobs.some((job: any) => job === id);
  const {
    mutate: applyMutate,
    isSuccess: applySuccess,
    isPending: applyPending,
  } = useJobApply();
  const {
    mutate: withdrawMutate,
    isSuccess: withdrawSuccess,
    isPending: withdrawPending,
  } = useJobWithdraw();

  const handleShowModal = (id: string) => {
    setSelectedId(id);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowWithdrawModal(false);
    setShowDetailModal(false);
  };

  const handleWithdrawModal = (id: string) => {
    console.log(typeof id, id);

    setSelectedId(id);
    setShowWithdrawModal(true);
  };

  const handleApply = () => {
    applyMutate(id);
  };

  const handleWithdraw = () => {
    withdrawMutate(id);
  };

  useEffect(() => {
    if (applySuccess) {
      handleCloseModal();
      setIsSuccess(applySuccess);
    }
    if (withdrawSuccess) {
      handleCloseModal();
      setIsSuccess(withdrawSuccess);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applySuccess, withdrawSuccess]);

  return (
    <>
      <div
        data-testid="card-container"
        className="flex xs:flex-col justify-between min-w-full w-full border rounded-lg bg-white shadow-md"
      >
        <div className="flex flex-col justify-center gap-4 w-96 p-5">
          <div className="flex items-baseline gap-2">
            <p
              data-testid="card-name"
              className="font-semibold text-blue-500 text-2xl leading-125"
            >
              {name}
            </p>
            <p
              data-testid="card-location"
              className="font-barlow font-bold text-blue-500 text-xs leading-150"
            >
              {location}
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-barlow font-medium text-gray-500 text-base leading-150">
              {t("cardBy")}
            </p>
            <p
              data-testid="card-company-name"
              className="font-semibold text-gray-700 text-lg leading-125"
            >
              {companyName}
            </p>
          </div>
          <div className="flex justify-around">
            <div className="flex flex-col gap-2 items-center justify-start">
              <p className="flex items-center justify-center gap-2 font-barlow font-bold text-blue-500 text-base leading-150">
                <SalaryIcon /> {t("cardSalary")}
              </p>
              <p
                data-testid="card-salary"
                className="flex font-barlow font-medium text-gray-700 text-base leading-150 items-center"
              >
                {salary}$
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex items-center justify-center gap-2 font-barlow font-bold text-blue-500 text-base leading-150">
                <KeywordsIcon /> {t("cardKeywords")}
              </p>
              <div
                data-testid="card-keywords"
                className="flex flex-col font-barlow font-medium text-gray-700 text-base leading-150 items-center"
              >
                {keywords.slice(0 - 2).map((keyword: string) => (
                  <p key={keyword}>{keyword}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {isJobApplied ? null : (
              <div data-testid="card-apply-modal">
                <button
                  onClick={() => handleShowModal(id)}
                  className="flex py-2 px-6 justify-center items-start rounded-md border border-gray-200 shadow-md text-gray-400 text-center text-base font-medium"
                >
                  {t("cardShowDetails")}
                </button>
              </div>
            )}
            {isJobApplied ? (
              <div data-testid="card-withdraw-modal">
                <button
                  onClick={() => handleWithdrawModal(id)}
                  className="rounded-lg border border-gray-300 bg-red-500 shadow-md flex py-2 px-6 justify-center items-start"
                >
                  {t("cardWithdraw")}
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={`flex xs:hidden items-center w-1/3 justify-center rounded-lg bg-[url("../assets/images/amazonBG.png")] bg-cover bg-center`}
        >
          <div className=" flex items-center justify-center w-16 h-16 blur-none rounded-full bg-gray-300 text-white text-2xl font-bold">
            <Image src={Amazon} alt="company-logo" />
          </div>
        </div>
      </div>
      {showDetailModal && (
          <div className="z-50 w-1/2 h-full" data-testid="card-modal">
            <Modal
              onClose={handleCloseModal}
              onConfirm={handleApply}
              isApply={true}
              isPending={applyPending}
              id={selectedId}
            />
          </div>
        )}
        {showWithdrawModal && (
          <div className="z-50 w-1/2 h-full" data-testid="card-modal">
            <Modal
              onClose={handleCloseModal}
              onConfirm={handleWithdraw}
              isApply={false}
              isPending={withdrawPending}
              id={selectedId}
            />
          </div>
        )}
    </>
  );
};

export default Card;
