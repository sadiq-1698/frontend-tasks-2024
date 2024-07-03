import FileExplorer from ".";
import FILE_EXPLORER_DATA from "./data";

const FileExplorerComponent = () => {
  return (
    <>
      <p style={{ marginBottom: "10px" }}>File Explorer</p>
      <FileExplorer data={FILE_EXPLORER_DATA} />
    </>
  );
};

export default FileExplorerComponent;
