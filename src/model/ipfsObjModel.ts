interface IIPFSObject {
  name: string,
  hash: string,
  path: string,
  type: string,
  size: number,
  children: IIPFSObject[],
  syned: boolean,
  syncing: boolean
}

export default IIPFSObject;