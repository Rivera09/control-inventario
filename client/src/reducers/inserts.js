import {
  PROVIDER_CREATED,
  PROVIDER_CREATION_FAILED,
  USER_CREATED,
  USER_CREATION_FAILED,
  CLIENT_CREATED,
  CLIENT_CREATION_FAILED,
} from "../actions/types";

const initialState = {
  insertSuccessful: null,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case PROVIDER_CREATED:
    case USER_CREATED:
    case CLIENT_CREATED:
      return {
        ...state,
        insertSuccessful: true,
      };
    case CLIENT_CREATION_FAILED:
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
