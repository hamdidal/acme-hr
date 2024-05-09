import { getProfile, login, register } from "@/services/be-api/auth/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      toast.success("Login Success", {
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
    onError: (error) => {
      toast.error("Login Failed", {
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
      console.error(error);
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

  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationFn: register,
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      toast.success("Login Success", {
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
    onError: (error) => {
      toast.error(error.message, {
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
      console.error(error);
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
