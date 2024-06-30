import "./App.css";
import TabComponent from "./components/tab/wrapper";
import GridSelectComponent from "./components/grid-select/wrapper";
import ProgressBarComponent from "./components/progress-bar/wrapper";

const Divider = () => <div className="divider" />;

function App() {
  return (
    <>
      <Divider />
      <ProgressBarComponent />
      <Divider />
      <TabComponent />
      <Divider />
      <GridSelectComponent />
      <Divider />
    </>
  );
}

export default App;
