import actionTypes from "./actionTypes";
const { LEVEL_1, LEVEL_2, LEVEL_3, ADD_LIBRARY } = actionTypes;

function LibraryReducer(state, action) {
  let obj = action.obj;
  switch (action.type) {
    case LEVEL_1:
      return { ...state, level1: obj };
    case LEVEL_2:
      return { ...state, level2: obj };
    case LEVEL_3:
      return { ...state, level3: obj };
    case ADD_LIBRARY:
      return { ...state, addlibrary: action.addlibrary };

    default:
      throw new Error();
  }
}

export default LibraryReducer;
