import React, { useEffect } from "react";
import {
  PaginationState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Card from "../components/Card";

export const MyTable = ({
  data,
  setPage,
  setPageSize,
}: {
  data: any[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    columns: []
  });

  useEffect(() => {
    setPage(pagination.pageIndex + 1);
    setPageSize(pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  return (
    <div className="p-2 w-full">
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
      <div className="h-2" />
      <div className="flex justify-center items-center gap-2 text-gray-500">
        <div>Show</div>
        <select
          className="p-2 border rounded"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          hidden={table.getPageCount() === 1}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <span className="flex items-center p-2 gap-1 border rounded">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
      </div>
      <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
        {table.getRowCount().toLocaleString()} Rows
      </div>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
    </div>
  );
};
