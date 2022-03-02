import actionTypes from "./actionTypes";
const {
  LEVEL_0,
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
  Chap0Level1,
  Chap0Level2,
  Chap0Level3,
  Chap0AnchorEl,
  AddChap0Level1,
  EditChap0Level1,
  DeleteChap0Level1,
  AddChap0Level2,
  EditChap0Level2,
  DeleteChap0Level2,
  AddChap0Level3,
  EditChap0Level3,
  DeleteChap0Level3,
} = actionTypes;

function LibraryReducer(state, action) {
  let obj = action.obj;
  switch (action.type) {
    case LEVEL_0:
      return { ...state, level0: obj };
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

export function Chap0Reducer(state, action) {
  let obj = action.obj;
  switch (action.type) {
    case Chap0Level1:
      return { ...state, Chap0Level1: obj };
    case Chap0Level2:
      return { ...state, Chap0Level2: obj };
    case Chap0Level3:
      return { ...state, Chap0Level3: obj };
    case Chap0AnchorEl:
      return { ...state, Chap0AnchorEl: action.Chap0AnchorEl };

    case CLOSE_MODAL:
      return {
        ...state,
        Chap0AnchorEl: null,
        AddChap0Level1: action.AddChap0Level1,
        EditChap0Level1: action.EditChap0Level1,
        DeleteChap0Level1: action.DeleteChap0Level1,
        // Level2
        AddChap0Level2: action.AddChap0Level2,
        EditChap0Level2: action.EditChap0Level2,
        DeleteChap0Level2: action.DeleteChap0Level2,
        // Level3

        AddChap0Level3: action.AddChap0Level3,
        EditChap0Level3: action.EditChap0Level3,
        DeleteChap0Level3: action.DeleteChap0Level3,
      };
    // level1
    case AddChap0Level1:
      return { ...state, AddChap0Level1: action.AddChap0Level1 };
    case DeleteChap0Level1:
      return {
        ...state,
        DeleteChap0Level1: action.DeleteChap0Level1,
        DeleteChap0Level1Id: action.DeleteChap0Level1Id,
      };

    case EditChap0Level1:
      return {
        ...state,
        EditChap0Level1: action.EditChap0Level1,
        EditChap0Level1Data: action.EditChap0Level1Data,
        EditChap0Level1Id: action.EditChap0Level1Id,
      };
    // level2
    case AddChap0Level2:
      return { ...state, AddChap0Level2: action.AddChap0Level2 };
    case DeleteChap0Level2:
      return {
        ...state,
        DeleteChap0Level2: action.DeleteChap0Level2,
        DeleteChap0Level2Id: action.DeleteChap0Level2Id,
      };
    case EditChap0Level2:
      return {
        ...state,
        EditChap0Level2: action.EditChap0Level2,
        EditChap0Level2Data: action.EditChap0Level2Data,
        EditChap0Level2Id: action.EditChap0Level2Id,
      };
    // Level3
    case AddChap0Level3:
      return { ...state, AddChap0Level3: action.AddChap0Level3 };
    case EditChap0Level3:
      return {
        ...state,
        EditChap0Level3: action.EditChap0Level3,
        EditChap0Level3Data: action.EditChap0Level3Data,
        EditChap0Level3Id: action.EditChap0Level3Id,
      };
    case DeleteChap0Level3:
      return {
        ...state,
        DeleteChap0Level3: action.DeleteChap0Level3,
        DeleteChap0Level3Id: action.DeleteChap0Level3Id,
      };
    default:
      throw new Error();
  }
}

export default LibraryReducer;
