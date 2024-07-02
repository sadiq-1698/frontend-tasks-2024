import ProgressBar from ".";
import useProgress from "../../hooks/useProgress";

const ProgressBarComponent = () => {
  const progressBarValue = useProgress();

  return (
    <div value={progressBarValue}>
      <p style={{ marginBottom: '10px' }}>Progress bar</p>
      <ProgressBar value={progressBarValue} />
    </div>
  );
};

export default ProgressBarComponent;
