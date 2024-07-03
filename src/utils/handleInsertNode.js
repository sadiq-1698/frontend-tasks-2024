const handleInsertNode = (node, currentNode, value) => {
  if (node.id === currentNode.id) {
    if (!currentNode.children) {
      currentNode.children = [];
    }

    currentNode.children = [...currentNode.children, value];
    return currentNode;
  }

  for (let child in currentNode.children) {
    return handleInsertNode(node, child, value);
  }
};

export default handleInsertNode;
