import {connect} from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom'
import { addUsersAnswer } from "../actions/users";
import {handleAnswerQuestion} from "../actions/questions";
import styles from "../stylesheets/viewquestion.module.css";
import gif from '../utils/404.gif'


const ViewQuestions = (props) => {

    const location = useLocation()
    const navigate = useNavigate()
    try {
        const { from } = location.state
        const {firstChoice,secondChoice,name } = from.question
        
        if (props.authedUser === 'Guest') {
           return (<h2>Als Gast können Sie diese Frage nicht sehen. Bitte melden Sie sich als Azubi an, um diese Frage zu sehen und beantworten zu können.</h2>)
        }
    
        const handleAnswerPoll = (e) => {
            const {dispatch} = props;
    
            dispatch(addUsersAnswer({
                authedUser: props.authedUser,
                qid: from.question.id,
                answer: e.target.value,
            }))
    
            dispatch(handleAnswerQuestion({
                authedUser: props.authedUser,
                qid: from.question.id,
                answer: e.target.value,
            }))
    
            setTimeout(() => navigate("/"), 1500); 
    
        }
    
        const checkIfAnswered = () => 
        props.users[props.authedUser].answers.hasOwnProperty(from.question.id);
        const getVotesPercentage = (num) => {
            const rawNum = (num/(firstChoice.votes.length + secondChoice.votes.length))*100;
            return `${rawNum.toFixed(2)} Prozent haben diese Antwort gewählt`
        }
        const voteForOption = (option) => props.users[props.authedUser].answers[from.question.id] === option;
        
        return (
            <div className = {styles.box}>
                <div>
                    <h2>Frage von {name}</h2>
                    <img src="" alt="" />
                </div>
                {checkIfAnswered() ? (
                    <div className={styles.answered}>
                        <h2>Du hast die Frage schon beantwortet.</h2>
                        <div className={voteForOption("Erste Option") ? styles.yes : styles.no}>
                            <p>Erste Option: {firstChoice.text}</p>
                            <p>{getVotesPercentage(firstChoice.votes.length)}</p>
                        </div>
                        <div className={voteForOption("Zweite Option") ? styles.yes : styles.no}>
                            <p>Zweite Option: {secondChoice.text}</p>
                            <p>{getVotesPercentage(secondChoice.votes.length)}</p>
                        </div>
                    </div>
                ) : (
                    <div onChange={handleAnswerPoll}>
                <div className={styles.notAnswered}>
                <h2>Welche Aussage stimmt ...</h2>
                  <input type="radio" value="Option Eins" />
                  {firstChoice.text}
                  <h4>Oder</h4>
                </div>
                <div>
                  <input type="radio" value="Option Zwei" />
                  {secondChoice.text}
                </div><h4>?</h4>
              </div>
                ) }
            </div>
        )
    } catch {
        return (
        <div className={styles.notFound}>
            <img src={gif} alt="Lädt..." /> 
            <h1 className={styles.sorry} >Sorry! Diese Frage existiert nicht.</h1>
        </div>
        )
    }
}

const mapStateToProps = ({authedUser,users}) => {
    return (
        {
            users,
            authedUser,
        }
    )
}

export default connect(mapStateToProps)(ViewQuestions)


