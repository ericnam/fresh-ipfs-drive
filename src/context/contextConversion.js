const ToContextModel = (ipfsObj) => {
  return {
    ...ipfsObj,
    syncing: false,
    synced: false,
    children: []
  };
}

export { ToContextModel };