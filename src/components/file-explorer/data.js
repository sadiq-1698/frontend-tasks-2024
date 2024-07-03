const FILE_EXPLORER_DATA = {
  name: "Root",
  isRoot: true,
  isFolder: true,
  id: Date.now() + "Root",
  children: [
    {
      name: "Components",
      isFolder: true,
      id: Date.now() + "Components",
      children: [
        {
          name: "ProgressBar.jsx",
          id: Date.now() + "ProgressBar.jsx",
        },
        {
          name: "Pagination.jsx",
          id: Date.now() + "Pagination.jsx",
        },
      ],
    },
    {
      name: "Hooks",
      isFolder: true,
      id: Date.now() + "Hooks",
      children: [
        {
          name: "usePagination.js",
          id: Date.now() + "usePagination.js",
        },
      ],
    },
    {
      name: "App.js",
      id: Date.now() + "App.js",
    },
    {
      name: "App.css",
      id: Date.now() + "App.css",
    },
  ],
};

export default FILE_EXPLORER_DATA;
