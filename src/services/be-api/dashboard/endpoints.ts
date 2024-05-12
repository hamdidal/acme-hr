import { Request } from "@/services/_base";
import { Service } from "@/services/types";
import {
  GET_ALL_JOB_WITHOUT_FILTER,
  GET_ALL_JOBS,
  GET_JOB_BY_ID,
  POST_APPLY_JOB,
  POST_WITHDRAW_JOB,
} from "./constants";
import { JobDetail, JobResponse } from "@/services/be-api/dashboard/types";

export const getAllJobs = async (params: any) => {
  const response = await Request.get<any, JobResponse>(
    GET_ALL_JOBS(
      params.page,
      params.perPage,
      params.searchField!,
      params.searchQuery!
    ),
    {}
  );
  return response.data;
};
export const getAllJobsWithoutFilter = async () => {
  const response = await Request.get<any, JobResponse>(
    GET_ALL_JOB_WITHOUT_FILTER,
    {}
  );
  return response.data;
};

export const getJobById = async (uuid: string) => {
  const response = await Request.get<any, JobDetail>(GET_JOB_BY_ID(uuid), {});
  return response.data;
};

export const postApplyJob = async (uuid: string) => {
  const response = await Request.post(POST_APPLY_JOB(uuid), {}, {});
  return response.data;
};

export const postWithdrawJob = async (uuid: any) => {
  const response = await Request.post(POST_WITHDRAW_JOB(uuid), {}, {});
  return response.data;
};
