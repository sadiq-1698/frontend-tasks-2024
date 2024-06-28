import { useState } from "react";
import "./styles.css";

const Tab = ({ tabContents = [], buttonLabels = [] }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleTabClick = (index) => {
    if (index === tabIndex) return;
    setDirection(-index);
    setTabIndex(index);
  };

  return (
    <>
      <div role="tablist" className="tabs">
        {tabContents.map((_, idx) => {
          return (
            <button
              role="tab"
              key={buttonLabels[idx] + "-|-" + idx}
              onClick={() => handleTabClick(idx)}
              style={{ borderBottomWidth: "1px" }}
              className={`tab ${tabIndex === idx ? "tab-active" : ""}`}
            >
              {buttonLabels[idx]}
            </button>
          );
        })}
      </div>

      <div className="tab-content">
        <div className="tab-content-inner-wrapper">
          {tabContents.map((tabContent, idx) => {
            const translate = `translateX(${direction * 100}%)`;
            return (
              <div
                className="tab-content-inner"
                key={buttonLabels[idx] + "|-|" + idx}
                style={{
                  transform: translate,
                  transition: "all 0.4s ease-in-out",
                }}
              >
                {tabContent}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tab;
