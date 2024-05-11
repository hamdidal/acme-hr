import { Request } from "@/services/_base";
import { Service } from "@/services/types";
import {
  GET_ALL_JOB_WITHOUT_FILTER,
  GET_ALL_JOBS,
  GET_JOB_BY_ID,
  POST_APPLY_JOB,
  POST_WITHDRAW_JOB,
} from "./constants";

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
export const getAllJobsWithoutFilter = () => {
  return Request.get(GET_ALL_JOB_WITHOUT_FILTER, {});
};

export const getJobById = (id: any) => {
  return Request.get(GET_JOB_BY_ID(id), {});
};

export const postApplyJob = (id: any) => {
  return Request.post(POST_APPLY_JOB(id), {}, {});
};

export const postWithdrawJob = (id: any) => {
  return Request.post(POST_WITHDRAW_JOB(id), {}, {});
};
