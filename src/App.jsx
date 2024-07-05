import "./App.css";
import TabComponent from "./components/tab/wrapper";
import PaginationComponent from "./components/pagination/wrapper";
import GridSelectComponent from "./components/grid-select/wrapper";
import StickyNotesComponent from "./components/sticky-notes/wrapper";
import ProgressBarComponent from "./components/progress-bar/wrapper";
import FileExplorerComponent from "./components/file-explorer/wrapper";
import TextUnderlineComponent from "./components/text-underline/wrapper";
import GridSelectDragComponent from "./components/grid-drag-select/wrapper";

const Divider = () => <div className="divider" />;

function App() {
  return (
    <>
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
      <FileExplorerComponent />
      <Divider />
      <GridSelectDragComponent />
      <Divider />
    </>
  );
}

export default App;
