import { GET_DIRECTORY, ADD_FILE } from '@Utils/constants'

export const addFile = (entry) => ({
  type: ADD_FILE,
  payload: entry
});

export const getDirectory = () => ({
  type: GET_DIRECTORY
})