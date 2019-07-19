import { GET_DIRECTORY, ADD_FILE } from '@Utils/constants';

let defaultState = {
  ipfs: {},
  init: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_DIRECTORY: {
      return state;
    }
    case ADD_FILE: {
      return;
    }
    default:
      return state;
  }
};
