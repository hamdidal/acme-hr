import { RequestParams } from "@/services/types";

export interface GetAllJobsDto {
  page: number | undefined;
  perPage: number | undefined;
  searchField: string | undefined;
  searchQuery: string | undefined;
}

export interface GetJobByIdDto {
  id: string | number;
}
