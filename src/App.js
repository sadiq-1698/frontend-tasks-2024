import "./App.css";
import TabComponent from "./components/tab/wrapper";
import ProgressBarComponent from "./components/progress-bar/wrapper";

function Divider () {
  return(
    <div className="divider"></div>
  );
}

function App() {
  return (
    <>
      <Divider />
      <ProgressBarComponent />
      <Divider />
      <TabComponent />
      <Divider />
    </>
  );
}

export default App;
