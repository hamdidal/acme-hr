import { UserModel } from "@/context/type";
import React from "react";

const Col = ({ row }: { row: any }) => {
  return (
    <div className="rounded-lg border border-gray-100 bg-blue-30 flex flex-col p-3 self-stretch gap-2">
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
          {row?.companyName}
        </p>
      </div>
    </div>
  );
};

export default Col;
