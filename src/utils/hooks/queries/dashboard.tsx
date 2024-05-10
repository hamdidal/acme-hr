import { getAllJobs, getJobById } from "@/services/be-api/dashboard/endpoints";
import { GetAllJobsDto, GetJobByIdDto } from "@/services/be-api/dashboard/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllJobs  = (params: GetAllJobsDto) => {
  const { isPending, isError, error, data, isFetching, isPlaceholderData, refetch, isSuccess } =
    useQuery({
      queryKey: ["getAllJobs", params],
      queryFn: () => getAllJobs(params),

    });

    return { isPending, isError, error, data, isFetching, isPlaceholderData, refetch, isSuccess};
};

export const useGetJobById  = (id: string | number) => {
  const { isPending, isError, error, data, isFetching, isPlaceholderData, refetch, isSuccess } =
    useQuery({
      queryKey: ["getJobById", id],
      queryFn: () => getJobById(id),

    });

    return { isPending, isError, error, data, isFetching, isPlaceholderData, refetch, isSuccess};
};
