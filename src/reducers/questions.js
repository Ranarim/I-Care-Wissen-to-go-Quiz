import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from "../actions/questions";

const optionFunc = (prevState = {},action) => {
    switch(action.type) {
        case ANSWER_QUESTION: 

        const { votes } = prevState;

        return {
            ...prevState,
                votes: votes.concat([action.authedUser]), 
        }

        default: 
        return prevState;
    }
}

 const questionFunc = (prevState = {},action) => {
    switch(action.type) {
        case ANSWER_QUESTION: 
        return {
            ...prevState,
                [action.answer]: optionFunc(prevState[action.answer],action)
        }
        default: 
        return prevState;
    }
}


export default function questions (prevState={}, action){
    switch(action.type) {
        case RECEIVE_QUESTIONS: 
        return {
            ...prevState,
            ...action.questions,
        }
        case ANSWER_QUESTION: 
        return {
        ...prevState,
            [action.qid]: questionFunc(prevState[action.qid],action)
        }
           case ADD_QUESTION:
           return {
                ...prevState,
                [action.question.id]: action.question,
           }
           default: 
           return prevState;
        }
    }






