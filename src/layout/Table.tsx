import React, { useEffect, useState } from "react";
import {
  PaginationState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Card from "../components/Card";
import Spinner from "@/components/Spinner";
import { useTranslation } from "react-i18next";

export const MyTable = ({
  data,
  setPage,
  setPageSize,
  count,
  page,
  isPending,
  pageSize,
}: {
  data: any[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  count: number;
  page: number;
  isPending: boolean;
  pageSize: number;
}) => {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize: pageSize,
  });

  const table = useReactTable({
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: count,
    manualSorting: true,
    onSortingChange: () => {},
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    columns: [],
  });

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  return (
    <div className="p-2 w-full">
      {isPending ? (
        <div className="flex h-[61.5vh] justify-center items-center overflow-auto w-full flex-col gap-4">
          <Spinner />
        </div>
      ) : data.length > 0 ? (
        <div className="p-2 w-full">
          <div className="flex h-[60vh] overflow-auto w-full flex-col gap-4">
            {table.getRowModel().rows.map((row) => {
              return (
                <div key={row.id}>
                  <Card row={row.original} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex w-full h-[100vh] justify-center items-center">
          <p className="text-4xl font-semibold m-10 text-gray-500">
            {t("tableNoJobsFound")}
          </p>
        </div>
      )}
      <div className="h-2" />
      <div className="flex justify-center items-center gap-2 text-gray-500">
        <div> {t("tableShow")}</div>
        <select
          className="p-2 border rounded"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <button
          onClick={handlePreviousPage}
          disabled={!table.getCanPreviousPage()}
          hidden={page <= 1}
        >
          {"<"}
        </button>
        <button
          className=" hover:cursor-pointer"
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
          hidden={page >= table.getPageCount() / pageSize}
        >
          {">"}
        </button>
        <span className="flex items-center p-2 gap-1 border rounded">
          <div> {t("tablePage")}</div>
          <strong>
            {page} - {table.getPageCount() / pageSize}
          </strong>
        </span>
      </div>
    </div>
  );
};
