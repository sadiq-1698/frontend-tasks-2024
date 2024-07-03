import { useState } from "react";
import handleInsertNode from "../../utils/handleInsertNode";

import "./styles.css";

const Folder = ({ node }) => {
  const [expanded, setExpanded] = useState(node.isRoot ? [node.id] : []);
  const [showInput, setShowInput] = useState(null);

  const handleExpand = (id) => {
    if (expanded.includes(id.toString())) {
      setExpanded((prev) => prev.filter((el) => el !== id));
    } else {
      setExpanded((prev) => [...prev, id.toString()]);
    }
  };

  const handleAddFileBtnClick = (e, isFolder = true) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    setShowInput({ isFolder });
  };

  const handleCreateFile = (e, currentNode) => {
    if (e.keyCode === 13) {
      const value = {
        isFolder: showInput?.isFolder,
        name: e.target.value.toString().trim(),
        id: Date.now() + e.target.value.toString().trim(),
      };

      handleInsertNode(node, currentNode, value);
      setExpanded((prev) => [...prev, currentNode.id]);
      setShowInput(null);
    }
  };

  return (
    <>
      <div className="folder" onClick={() => handleExpand(node.id)}>
        <span>
          {node.isFolder ? "📁" : "📄"}&nbsp;{node.name}
        </span>
        {node.isFolder && (
          <div className="folder__add-btns">
            <button onClick={(e) => handleAddFileBtnClick(e, false)}>
              Add file
            </button>
            <button onClick={(e) => handleAddFileBtnClick(e)}>
              Add folder
            </button>
          </div>
        )}
      </div>

      {showInput && (
        <input
          autoFocus={true}
          onBlur={() => setShowInput(false)}
          onKeyDown={(e) => handleCreateFile(e, node)}
        />
      )}

      {expanded.includes(node.id.toString()) && node.children && (
        <div className="folder__children">
          {node.children
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((child, idx) => {
              return <Folder node={child} key={child.name + "-" + idx} />;
            })}
        </div>
      )}
    </>
  );
};

const FileExplorer = ({ data = [] }) => {
  return (
    <div className="file-explorer-wrapper">
      <Folder node={data} />
    </div>
  );
};

export default FileExplorer;
