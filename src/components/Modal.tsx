import LocationIcon from "@/assets/icons/locationIcon";
import SalaryIcon from "@/assets/icons/salaryIcon";
import { useGetJobById } from "@/hooks/queries/dashboard";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useTranslation } from "react-i18next";

export interface ModalProps {
  onClose: () => void;
  onConfirm: (id: string) => void;
  message?: string;
  isApply: boolean;
  id: string;
  isPending?: boolean;
  isJobSuccess?: boolean;
}

export interface CompanyModel {
  companyName: string;
  keywords: string[];
  id: string;
  description: string;
  name: string;
  createdAt: string;
  location: string;
  salary: number;
}

const Modal = ({
  onClose,
  onConfirm,
  isApply,
  id,
  isJobSuccess,
  isPending: isLoading,
}: ModalProps) => {
  const { t } = useTranslation();
  const { data, isSuccess, isPending } = useGetJobById(id);

  return !isApply ? (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-96 flex flex-col items-center justify-center rounded-lg gap-14 shadow-lg p-6">
        {isLoading || isJobSuccess ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 items-center">
              <p
                data-testid="modal-content-title"
                className="text-lg text-gray-800"
              >
                {t("withdrawModalAreYouSure")}
              </p>
              <p
                data-testid="modal-content-message"
                className="text-md text-gray-800"
              >
                {t("withdrawModalWithdrawApplication")}{" "}
              </p>
            </div>
            <div
              data-testid="modal-buttons"
              className="flex w-full justify-around"
            >
              <button
                onClick={onClose}
                className="px-4 py-2 w-full bg-gray-300 text-gray-800 rounded-md mr-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              >
                {t("withdrawModalCancel")}{" "}
              </button>
              <button
                onClick={() => onConfirm(id)}
                className="px-4 py-2 w-full bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                {t("withdrawModalWithdraw")}{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="flex z-50 flex-col items-center justify-center rounded-lg shadow-custom-shadow gap-6 max-w-[64rem] py-4 px-6 bg-white text-gray-700 md:w-[80%] xs:w-[90%] sm:w-[90%] w-[50%] xs:h-[70%] sm:h-[70%] md:h-[70%] h-fit min-h-[50%]">
        {isLoading || !isSuccess || isJobSuccess ? (
          <Spinner />
        ) : (
          <>
            <p
              data-testid="modal-apply-detail-title"
              className="text-center mb-16 text-lg font-semibold leading-125 text-blue-gray-800"
            >
              {t("applyModalJobDetails")}
            </p>
            <div className="flex md:flex-col-reverse sm:flex-col-reverse xs:flex-col-reverse md:w-full sm:w-full xs:w-full items-start gap-12 justify-between w-full">
              <div className="w-1/3 md:w-full sm:w-full xs:w-full md:gap-4 sm:gap-4 xs:gap-4 flex flex-col justify-between items-start pb-6 self-stretch">
                <div className="flex flex-col md:flex-row sm:flex-row xs:flex-row md:w-full sm:w-full xs:w-full md:justify-around sm:justify-around  xs:justify-around   items-start gap-6">
                  <div className="flex flex-col gap-2 items-center justify-start">
                    <p className="flex items-center justify-center gap-2 font-barlow font-bold text-blue-500 text-base leading-150">
                      <LocationIcon /> {t("applyModalLocation")}
                    </p>
                    <p
                      data-testid="modal-apply-location"
                      className="flex font-barlow font-medium text-gray-700 text-base leading-150 items-center"
                    >
                      {data?.location}{" "}
                    </p>
                  </div>{" "}
                  <div className="flex flex-col gap-2 items-center justify-start">
                    <p className="flex items-center justify-center gap-2 font-barlow font-bold text-blue-500 text-base leading-150">
                      <SalaryIcon /> {t("applyModalSalary")}
                    </p>
                    <p
                      data-testid="modal-apply-salary"
                      className="flex font-barlow font-medium text-gray-700 text-base leading-150 items-center"
                    >
                      {data?.salary}$
                    </p>
                  </div>{" "}
                </div>
                <div
                  data-testid="modal-buttons"
                  className="flex flex-col justify-end items-start gap-3 self-stretch"
                >
                  <button
                    onClick={onClose}
                    className="flex w-full px-[1.1875rem] py-[0.6875rem] justify-center items-center gap-[0.375rem] border shadow-lg rounded-[0.3125rem] bg-gradient-to-r text-gray-500 text-center font-medium text-sm leading-[1.09375rem]"
                  >
                    {t("applyModalCancel")}
                  </button>{" "}
                  <button
                    onClick={() => onConfirm(id)}
                    className="flex w-full px-[1.1875rem] py-[0.6875rem] justify-center items-center gap-[0.375rem] rounded-[0.3125rem] bg-gradient-to-r from-blue-600 to-blue-900 text-white text-center font-medium text-sm leading-[1.09375rem]"
                  >
                    {t("applyModalApply")}
                  </button>{" "}
                </div>
              </div>
              <div className="w-2/3 md:w-full sm:w-full xs:w-full flex flex-col items-start gap-6">
                <div className="flex flex-col pb-2 items-start gap-2">
                  <p
                    data-testid="modal-apply-name"
                    className="text-2xl font-semibold leading-125 text-blue-500"
                  >
                    {data?.name}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <p className="font-barlow text-base font-medium leading-6 text-gray-300">
                      {t("applyModalBy")}
                    </p>
                    <p
                      data-testid="modal-apply-company-name"
                      className="text-base font-semibold leading-tight text-blue-gray-800"
                    >
                      {data?.companyName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <p className="text-sm font-semibold leading-tight text-blue-500">
                    {t("applyModalPositionDesc")}
                  </p>
                  <p data-testid="modal-apply-description">
                    {data?.description}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <p className="text-sm font-semibold leading-tight text-blue-500">
                    {t("applyModalKeyWords")}
                  </p>
                  <p data-testid="modal-apply-keyword" className="flex gap-2">
                    {data?.keywords?.map((keyword) => (
                      <p key={keyword}>{keyword}</p>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
