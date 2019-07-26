interface IPFSObject {
  name: string,
  hash: string,
  path: string,
  type: string,
  size: number,
  children: IPFSObject[],
  syned: boolean,
  syncing: boolean
}

export default IPFSObject;