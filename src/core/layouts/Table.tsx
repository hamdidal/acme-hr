import React, { FC, useEffect, useState } from "react";
import {
  PaginationState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Card from "@/components/Card";
import { useTranslation } from "react-i18next";
import { JobDetail } from "@/services/be-api/dashboard/types";
import Spinner from "@/components/Spinner";
interface JobTableProps {
  data?: JobDetail[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  count?: number;
  page: number;
  isPending: boolean;
  pageSize: number;
  filterText: string;
}

export const JobTable: FC<JobTableProps> = ({
  data,
  setPage,
  setPageSize,
  count,
  page,
  isPending,
  pageSize,
  filterText
}) => {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize: pageSize,
  });

  const table = useReactTable({
    data: data ?? [],
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: count || 100,
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

  useEffect(() => {
    if (filterText !== "") {
      setPage(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText]);  
  

  return (
    <div className="p-2 w-full">
      {isPending ? (
        <div className="flex h-[61.5vh] justify-center items-center overflow-auto w-full flex-col gap-4">
          <Spinner />
        </div>
      ) : data && data.length > 0 ? (
        <div data-testid="table-container" className="p-2 w-full">
          <div className="flex h-[65vh] overflow-auto w-full flex-col gap-4">
            {table.getRowModel().rows.map((row) => {
              return (
                <div data-testid="table-card" key={row.id}>
                  <Card key={row.id} {...row.original} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          data-testid="no-jobs-message"
          className="flex w-full h-[100vh] justify-center items-center"
        >
          <p className="text-4xl font-semibold m-10 text-gray-500">
            {t("tableNoJobsFound")}
          </p>
        </div>
      )}
      <div className="flex justify-center items-center gap-2 text-gray-500">
        <div> {t("tableShow")}</div>
        <select
          data-testid="page-size-select"
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
          data-testid="previous-page-button"
          onClick={handlePreviousPage}
          disabled={!table.getCanPreviousPage()}
          hidden={page <= 1}
        >
          {"<"}
        </button>
        <button
          data-testid="next-page-button"
          className=" hover:cursor-pointer"
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
          hidden={page >= table.getPageCount() / pageSize}
        >
          {">"}
        </button>
        <span className="flex items-center p-2 gap-1 border rounded">
          <div className="flex"> {t("tablePage")}</div>
          <strong className="flex">
            <div data-testid="page-number">{page}</div>- {(table.getPageCount() / pageSize).toFixed(0)}
          </strong>
        </span>
      </div>
    </div>
  );
};
