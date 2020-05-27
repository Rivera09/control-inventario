import {
  PROVIDER_CREATED,
  PROVIDER_CREATION_FAILED,
  USER_CREATED,
  USER_CREATION_FAILED,
} from "../actions/types";

const initialState = {
  insertSuccessful: null,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case PROVIDER_CREATED:
    case USER_CREATED:
      return {
        ...state,
        insertSuccessful: true,
      };
    case PROVIDER_CREATION_FAILED:
    case USER_CREATION_FAILED:
      return {
        ...state,
        insertSuccessful: false,
      };
    default:
      return state;
  }
}
