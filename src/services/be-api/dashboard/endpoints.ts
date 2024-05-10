import { Request } from "@/services/_base";
import { Service } from "@/services/types";
import { GET_ALL_JOBS, GET_JOB_BY_ID } from "./constants";

export const getAllJobs = (params: any) => {
  return Request.get(
    GET_ALL_JOBS(
      params.page,
      params.perPage,
      params.searchField!,
      params.searchQuery!
    ),
    {}
  );
};

export const getJobById = (id: any) => {
  return Request.get(GET_JOB_BY_ID(id), {});
};
