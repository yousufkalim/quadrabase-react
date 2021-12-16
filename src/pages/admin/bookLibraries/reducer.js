import actionTypes from "./actionTypes";
const {
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
  ADD_LIBRARY,
  EDIT_LIBRARY,
  DELETE_LIBRARY,
  EDIT_CATEGORY,
  ADD_CATEGORY,
  CLOSE_MODAL,
  DELETE_CATEGORY,
  ADD_WORK,
  ADD_WORK_DETAIL,
  EDIT_WORK,
  DELETE_WORK,
  EDIT_WORK_DETAIL,
  DELETE_WORK_DETAIL,
  anchorEl,
  MANAGE_FAMILIES,
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
    case anchorEl:
      return { ...state, anchorEl: action.anchorEl };

    case CLOSE_MODAL:
      return {
        ...state,
        anchorEl: null,
        managefamily: action.managefamily,
        addlibrary: action.addlibrary,
        editlibrary: action.editlibrary,
        deletelibrary: action.deletelibrary,
        // category
        addcategory: action.addcategory,
        editcategory: action.editcategory,
        deletecategory: action.deletecategory,
        // work

        addwork: action.addwork,
        editwork: action.editwork,
        deletework: action.deletework,
        // work detail

        addworkdetail: action.addworkdetail,
        editworkdetail: action.editworkdetail,
        deleteworkdetail: action.deleteworkdetail,
      };
    case MANAGE_FAMILIES:
      return { ...state, managefamily: action.managefamily };
    case ADD_LIBRARY:
      return { ...state, addlibrary: action.addlibrary };
    case DELETE_LIBRARY:
      return {
        ...state,
        deletelibrary: action.deletelibrary,
        libraryDeleteId: action.libraryDeleteId,
      };

    case EDIT_LIBRARY:
      return {
        ...state,
        editlibrary: action.editlibrary,
        editLibraryData: action.editLibraryData,
        editlibraryId: action.editlibraryId,
      };
    case ADD_CATEGORY:
      return { ...state, addcategory: action.addcategory };
    case DELETE_CATEGORY:
      return {
        ...state,
        deletecategory: action.deletecategory,
        categoryDeleteId: action.categoryDeleteId,
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        editcategory: action.editcategory,
        editCategoryData: action.editCategoryData,
        editcategoryId: action.editcategoryId,
      };
    case ADD_WORK:
      return { ...state, addwork: action.addwork };
    case EDIT_WORK:
      return {
        ...state,
        editwork: action.editwork,
        editWorkData: action.editWorkData,
        editworkId: action.editworkId,
      };
    case DELETE_WORK:
      return {
        ...state,
        deletework: action.deletework,
        workDeleteId: action.workDeleteId,
      };
    case ADD_WORK_DETAIL:
      return { ...state, addworkdetail: action.addworkdetail };
    case EDIT_WORK_DETAIL:
      return {
        ...state,
        editworkdetail: action.editworkdetail,
        editWorkDetailData: action.editWorkDetailData,
        editworkdetailId: action.editworkdetailId,
      };
    case DELETE_WORK_DETAIL:
      return {
        ...state,
        deleteworkdetail: action.deleteworkdetail,
        workDetailDeleteId: action.workDetailDeleteId,
      };
    default:
      throw new Error();
  }
}

export default LibraryReducer;
