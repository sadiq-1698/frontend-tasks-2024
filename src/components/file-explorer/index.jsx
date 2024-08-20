import { useState } from "react";
import FILE_EXPLORER_DATA from "./data";

import "./styles.css";

const Folder = ({ node, onCreateFolder }) => {
  const [inputVal, setInputVal] = useState("");
  const [showInput, setShowInput] = useState(null);
  const [showChildren, setShowChildren] = useState(false);

  const onAddFolderClick = (e, isFolder = true) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    if (!showInput) setShowInput({ isFolder });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode !== 13) return;
    onCreateFolder(node.id, inputVal, showInput.isFolder, node.isRoot);
    setInputVal("");
    setShowInput(null);
    setShowChildren(true);
  };

  return (
    <>
      <div
        className="folder"
        onClick={() => (node.isFolder ? setShowChildren((prev) => !prev) : {})}
      >
        <span>
          {node.isFolder ? "📁" : "📄"}&nbsp;{node.name}
        </span>
        {node.isFolder && (
          <div className="folder__add-btns">
            <button onClick={(e) => onAddFolderClick(e, false)}>
              Add file
            </button>
            <button onClick={(e) => onAddFolderClick(e)}>Add folder</button>
          </div>
        )}
      </div>

      {showInput && (
        <input
          value={inputVal}
          autoFocus={true}
          onKeyDown={handleKeyDown}
          onBlur={() => setShowInput(null)}
          onChange={(e) => setInputVal(e.target.value.toString().trim())}
        />
      )}

      {showChildren && (
        <div className="folder__children">
          {node.children?.length > 0 &&
            node.children
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((child, idx) => {
                return (
                  <Folder
                    node={child}
                    key={idx + "-" + child.id}
                    onCreateFolder={onCreateFolder}
                  />
                );
              })}
        </div>
      )}
    </>
  );
};

const createNode = (name, isFolder) => {
  return {
    isFolder: isFolder,
    name: name.toString().trim(),
    id: Date.now() + name.toString().trim(),
  };
};

const FileExplorer = () => {
  const [fileExplorerData, setFileExplorerData] = useState(FILE_EXPLORER_DATA);

  const handleCreateFolder = (
    folderId,
    folderName,
    isFolder = true,
    isRoot = false
  ) => {
    if (isRoot) {
      setFileExplorerData({
        ...fileExplorerData,
        children: [
          ...fileExplorerData.children,
          createNode(folderName, isFolder),
        ],
      });
      return;
    }

    const createFolder = (explorerData) => {
      return {
        ...explorerData,
        children: explorerData.children.map((node) => {
          if (node.id === folderId) {
            return {
              ...node,
              children: [
                ...(node.children || []),
                createNode(folderName, isFolder),
              ],
            };
          }

          if (node.children) {
            return createFolder(node);
          }

          return node;
        }),
      };
    };

    setFileExplorerData(createFolder(fileExplorerData));
  };

  return (
    <div className="file-explorer-wrapper">
      <Folder onCreateFolder={handleCreateFolder} node={fileExplorerData} />
    </div>
  );
};

export default FileExplorer;
