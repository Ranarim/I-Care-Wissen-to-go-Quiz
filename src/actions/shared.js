import { getInitialData } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const handleLogin = (authedUserId) => {
  return (dispatch) => {
    dispatch(setAuthedUser(authedUserId))
  }
}

export const handleInitialData = () => {
    return (dispatch) => {
      dispatch(showLoading());
      return getInitialData().then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      });
    };
  }



























  


























