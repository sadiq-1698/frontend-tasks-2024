import ProgressBar from ".";
import useProgress from "./useProgress";

const ProgressBarComponent = () => {
  const progressBarValue = useProgress();

  return <ProgressBar value={progressBarValue} />;
};

export default ProgressBarComponent;
