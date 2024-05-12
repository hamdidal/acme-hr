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

export interface Meta {
  page: number;
  perPage: number;
  total: number;
}
export interface JobDetail {
  companyName: string
  keywords: string[]
  id: string
  description: string
  name: string
  createdAt: string
  location: string
  salary: number
}
export interface JobResponse {
  data: JobDetail[]
  meta: Meta
}