import actionTypes from "./actionTypes";
const {
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
  ADD_LIBRARY,
  EDIT_LIBRARY,
  DELETE_LIBRARY,
  DELETE_CATEGORY,
  ADD_CATEGORY,
} = actionTypes;

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
    case DELETE_LIBRARY:
      return {
        ...state,
        deletelibrary: action.deletelibrary,
        deletecategory: action.deletecategory,
      };

    case EDIT_LIBRARY:
      return {
        ...state,
        editlibrary: action.editlibrary,
        editLibraryData: action.editLibraryData,
      };
    case ADD_CATEGORY:
      return { ...state, addcategory: action.addcategory };
    default:
      throw new Error();
  }
}

export default LibraryReducer;
