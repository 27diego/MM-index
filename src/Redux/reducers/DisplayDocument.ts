import { DisplayDocumentType } from "../../types/Actions";

const DisplayDocumentDefaultState = "";

export const DisplayDocumentReducer = (
  state = DisplayDocumentDefaultState,
  action: DisplayDocumentType
): string => {
  switch (action.type) {
    case "SET_DOCUMENT":
      return action.payload;
    case "SIGN_OUT":
      return DisplayDocumentDefaultState;
    default:
      return state;
  }
};
