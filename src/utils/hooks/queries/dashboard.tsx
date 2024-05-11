import { getAllJobs, getAllJobsWithoutFilter, getJobById, postApplyJob, postWithdrawJob } from "@/services/be-api/dashboard/endpoints";
import { GetAllJobsDto, GetJobByIdDto } from "@/services/be-api/dashboard/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useGetAllJobs  = (params: GetAllJobsDto) => {
  const { isPending, isError, error, data, isFetching, isPlaceholderData, refetch, isSuccess } =
    useQuery({
      queryKey: ["getAllJobs", params],
      queryFn: () => getAllJobs(params),

    });

    return { isPending, isError, error, data, isFetching, isPlaceholderData, refetch, isSuccess};
};

export const useGetAllJobsWithoutFilter  = () => {
  const { isPending, isError, error, data, isFetching, isPlaceholderData, refetch, isSuccess } =
    useQuery({
      queryKey: ["getAllJobsWithoutFilter"],
      queryFn: () => getAllJobsWithoutFilter(),

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

export const useJobApply = () => {
  const queryClient = useQueryClient();
  const {t} = useTranslation()
  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationFn: postApplyJob,
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ["apply"] });
      toast.success(t("applySuccess"), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style: {
          backgroundColor: "white",
          color: "black",
        },
        progressStyle: {
          backgroundColor: "black",
        },
        theme: "light",
      });
    },
    onError: () => {
      toast.error(t("applyFailed"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style: {
          backgroundColor: "white",
          color: "black",
        },
        progressStyle: { backgroundColor: "white" },
        theme: "dark",
      });
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    data,
  };
};

export const useJobWithdraw = () => {
  const queryClient = useQueryClient();
  const {t} = useTranslation()
  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationFn: postWithdrawJob,
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ["withdraw"] });
      toast.success(t("withdrawSuccess"), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style: {
          backgroundColor: "white",
          color: "black",
        },
        progressStyle: {
          backgroundColor: "black",
        },
        theme: "light",
      });
    },
    onError: () => {
      toast.error(t("withdrawFailed"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style: {
          backgroundColor: "white",
          color: "black",
        },
        progressStyle: { backgroundColor: "white" },
        theme: "dark",
      });
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    data,
  };
};