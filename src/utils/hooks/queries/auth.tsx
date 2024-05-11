import { getProfile, login, register } from "@/services/be-api/auth/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useLoginMutation = () => {
  const {t} = useTranslation()
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      toast.success(t("loginSuccess"), {
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
      toast.error(t("loginFailed"), {
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

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const {t} = useTranslation()
  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationFn: register,
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      toast.success(t("registerSuccess"), {
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
      toast.error(t("registerFailed"), {
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

export const useProfile = () => {
  const { isLoading, error, data, refetch, isSuccess } = useQuery({
    queryKey: ["profile"], 
    queryFn: getProfile,
    staleTime: 0,
  });

  return {
    isLoading,
    error,
    data,
    refetch,
    isSuccess
  };
};
