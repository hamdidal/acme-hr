import { toast } from "react-toastify";

const useNotify = () => {
  type NotifyProps = {
    message: string;
    type?: "success" | "warning" | "error" | "loading";
  };

  const notify = ({ message, type = "success" }: NotifyProps) => {
    if (type === "success") {
      return toast(message, {
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
    }
    if (type === "loading") {
      return toast.loading(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
    return toast(message, {
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
  };
  const removeAllToast = () => {
    toast.dismiss();
  };
  return { notify, removeAllToast };
};

export default useNotify;
