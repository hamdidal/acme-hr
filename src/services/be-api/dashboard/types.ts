import { RequestParams } from "@/services/types";

export interface GetAllJobsDto {
  page: number;
  perPage: number;
  searchField: string | undefined;
  searchQuery: string | undefined;
}

export interface GetJobByIdDto {
  id: string | number;
}
