import { SET_TOKEN, REMOVE_TOKEN, SHOW_LOGIN } from "../actions/auth";
import { NEW_FOLLOW } from "../actions/follows";
const auth = (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        firstName: action.firstName,
        profilePic: action.profilePic,
        follows: action.follows,
      };
    }
    case REMOVE_TOKEN: {
      return {
        ...state,
        token: null,
        userId: null,
        firstName: null,
        profilePic: null,
        follows: null,
      };
    }

    case NEW_FOLLOW: {
      return {
        ...state,
        follows: "removed",
        followStatus: {
          campaignId: action.campaignId,
          followStatus: action.followStatus,
        },
      };
    }

    case SHOW_LOGIN: {
      return {
        ...state,
        showLogin: action.showLogin,
      };
    }

    default:
      return { ...state };
  }
};

export default auth;
