import Lottie from "react-lottie";
import spinner from "@/assets/spinner.json"

const Spinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spinner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={100} width={100} />;
};

export default Spinner;
