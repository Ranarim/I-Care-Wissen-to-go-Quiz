import { RECEIVE_USERS,ADD_USERS_QUESTION,ADD_USERS_ANSWER } from "../actions/users";


const answerFunc = (prevState = {},action) => {
    switch(action.type) {
        case ADD_USERS_ANSWER: 
        const {answer,qid} = action
        const {answers} = prevState
        console.log(action)

         return {
        ...prevState,
            answers: {
                ...answers,
                [qid] : answer
            }
        }
        default:
             return prevState
    }
}



const questionFunc = (prevState = {},action) => {
    switch(action.type) {
        case ADD_USERS_QUESTION: 
        const {id} = action;
        const {questions} = prevState;
        return {
            ...prevState,
                questions: questions.concat(id)
        }
        default: return {
            prevState
        }
    }
} 

export default function users (prevState={}, action){
    switch(action.type) {

        case RECEIVE_USERS: 
        return {
            ...prevState,
            ...action.users,
        }
        case ADD_USERS_QUESTION: 
            return {
                ...prevState,
                [action.authedUser]: questionFunc(prevState[action.authedUser],action)
        }
        case ADD_USERS_ANSWER: 
            return {
                ...prevState,
                [action.authedUser]:answerFunc(prevState[action.authedUser],action)
            }

        default: 
        return prevState
    }
}