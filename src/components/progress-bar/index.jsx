import { useEffect } from "react";
import "./styles.css";

const ProgressBar = ({
  value = 0,
  onComplete = () => {
    console.log("Completed!");
  },
}) => {
  useEffect(() => {
    if (value === 100) onComplete();
  }, [value, onComplete]);

  return (
    <div className="progress-wrapper">
      <div
        aria-valuemin={0}
        role="progressbar"
        aria-valuemax={100}
        className="bar-outer"
        aria-valuenow={value.toFixed()}
      >
        <span style={{ color: value >= 55 ? "white" : "black" }}>
          {Math.min(100, Math.max(0, value.toFixed()))}%
        </span>
        <div
          className="bar-inner"
          style={{
            transform: `translateX(${value.toFixed() - 100}%)`,
            transition: "transform 0.2s ease-in-out",
          }}
        />
      </div>
      <p>{value < 100 ? "Loading..." : "Complete!"}</p>
    </div>
  );
};

export default ProgressBar;
