import "./App.css";
import TabComponent from "./components/tab/wrapper";
import PaginationComponent from "./components/pagination/wrapper";
import GridSelectComponent from "./components/grid-select/wrapper";
import StickyNotesComponent from "./components/sticky-notes/wrapper";
import ProgressBarComponent from "./components/progress-bar/wrapper";
import TextUnderlineComponent from "./components/text-underline/wrapper";

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
      <PaginationComponent />
      <Divider />
      <TextUnderlineComponent />
      <Divider />
      <StickyNotesComponent />
      <Divider />
    </>
  );
}

export default App;
