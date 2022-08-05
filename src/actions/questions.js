import { _saveQuestionAnswer } from "../utils/_DATA";
import { _saveQuestion } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {addUsersQuestion} from "./users"

export const ADD_QUESTION = "ADD_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION"


export function handleAnswerQuestion ({authedUser, qid, answer}) {
    
    return (dispatch) => {
        dispatch(showLoading());

        return _saveQuestionAnswer({
            qid,
            authedUser,
            answer,
        })
        .then(() => {
            dispatch(answerQuestion({ authedUser, qid, answer }));
          })
          .then(() => dispatch(hideLoading()));
    }
}

export function handleAddQuestion(question) {
   return (dispatch) => {
       dispatch(showLoading)

   return _saveQuestion(question)
   .then((data) => {
        dispatch(addQuestion(data));
        dispatch(addUsersQuestion(data));
   })
   .then(() => dispatch(hideLoading()))
   .catch(err => console.log(err,": HandleAddQuestion Action Creator failed"))
}
}

export function receiveQuestions(questions) {
    return (
        {
            type: RECEIVE_QUESTIONS,
            questions,
        }
    )
}

function answerQuestion ({qid,authedUser,answer}) {
    return ({
        type: ANSWER_QUESTION,
        qid,
        authedUser,
        answer,
    })
}

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}
