import Tab from ".";

const DummyBgComponent = ({ color }) => {
  return (
    <div style={{ backgroundColor: color, width: "100%", height: "100%" }} />
  );
};

const TabComponent = () => {
  const tabContents = [
    <DummyBgComponent color="red" />,
    <DummyBgComponent color="green" />,
    <DummyBgComponent color="yellow" />,
  ];

  const buttonLabels = ["Settings", "Response", "Advanced"];

  return (
    <div className="tab-wrapper">
      <p style={{ marginBottom: "10px" }}>Tab</p>
      <Tab buttonLabels={buttonLabels} tabContents={tabContents} />
    </div>
  );
};

export default TabComponent;
