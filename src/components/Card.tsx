/* eslint-disable @next/next/no-img-element */
import SalaryIcon from "@/assets/icons/salaryIcon";
import React, { useState } from "react";
import Image from "next/image";
import Amazon from "../assets/images/amazon.png";
import useUserStore from "@/context/user-store";
import Modal from "./Modal";
import KeywordsIcon from "@/assets/icons/keywordIcon";

export const Card = ({ row }: { row: any }) => {
  const { user } = useUserStore();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShowModal = (id: any) => {
    setSelectedId(id);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowWithdrawModal(false);
    setShowDetailModal(false);
  };

  const handleWithdrawModal = (id: any) => {
    setSelectedId(id);
    setShowWithdrawModal(true);
  };

  const handleApply = ({ id }: any) => {};
  const handleWithdraw = ({ id }: any) => {};

  return (
    <div className="flex xs:flex-col justify-between w-full border rounded-lg bg-white shadow-md">
      <div className="flex flex-col justify-center gap-4 w-96 p-5">
        <div className="flex items-baseline gap-2">
          <p className="font-rubik font-semibold text-blue-500 text-2xl leading-125">
            {row?.name}
          </p>
          <p className="font-barlow font-bold text-blue-500 text-xs leading-150">
            ({row.location})
          </p>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="font-barlow font-medium text-gray-500 text-base leading-150">
            by
          </p>
          <p className="font-rubik font-semibold text-gray-700 text-lg leading-125">
            {row.companyName}
          </p>
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col gap-2 items-center justify-start">
            <p className="flex items-center justify-center gap-2 font-barlow font-bold text-blue-500 text-base leading-150">
              <SalaryIcon /> Salary
            </p>
            <p className="flex font-barlow font-medium text-gray-700 text-base leading-150 items-center">
              {row.salary}$
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-center gap-2 font-barlow font-bold text-blue-500 text-base leading-150">
              <KeywordsIcon /> Keywords
            </p>
            <p className="flex flex-col font-barlow font-medium text-gray-700 text-base leading-150 items-center">
              {row.keywords.slice(0 - 2).map((keyword: string) => (
                <p key={keyword}>{keyword}</p>
              ))}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={()=> handleShowModal(row.id)}
            className="flex p-2 w-1/2 justify-center items-start rounded-md border border-gray-200 shadow-md text-gray-400 text-center font-rubik text-base font-medium"
          >
            show details
          </button>
          {/* {user.appliedJobs.find((job: any) => job.id === row.id) ? ( */}
          <button
            onClick={() => handleWithdrawModal(row.id)}
            className="rounded-lg border border-gray-300 bg-red-500 shadow-md flex py-2 px-6 justify-center items-start"
          >
            withdraw
          </button>
          {/* ) : null} */}
        </div>
      </div>
      <div
        className={`flex xs:hidden items-center w-1/3 justify-center rounded-lg bg-[url("../assets/images/amazonBG.png")] bg-cover bg-center`}
      >
        <div className=" flex items-center justify-center w-16 h-16 blur-none rounded-full bg-gray-300 text-white text-2xl font-bold">
          <Image src={Amazon} alt="company-logo"></Image>
        </div>
      </div>
      {showDetailModal && (
        <Modal
          onClose={handleCloseModal}
          onConfirm={(id) => handleApply(id)}
          message="apply"
          isApply={true}
          id={selectedId}
        />
      )}
      {showWithdrawModal && (
        <Modal
          onClose={handleCloseModal}
          onConfirm={(id) => handleWithdraw(id)}
          message="Are you sure?"
          isApply={false}
          id={selectedId}
        />
      )}
    </div>
  );
};

export default Card;
