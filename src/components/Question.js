import { connect } from "react-redux"
import { formatQuestion } from "../utils/helpers"
import styles from "../stylesheets/question.module.css"
import { Link } from "react-router-dom"

const Question = (props) => {
    const timestamp = props.question.timestamp
    const date = new Date(timestamp);
    const link = `/questions/${props.id}`
    const stateData =  {
        id: props.id,
        question: props.question,
    }
    
    return (
        <Link to={link} state={{ from: stateData }}>
            <div className={styles.questionBox}>
            <h4 data-testid="header-element" className={styles.header}>{props.question.name}</h4>
            <p data-testid="date-element" className={styles.date}>{"Erstellt: " + date.getDate() +
                "/" + (date.getMonth() + 1) +
                "/" + date.getFullYear()
            }</p>
            </div>
            
        </Link>
    )
}

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
    const question = questions[id];

    return (
        {
            authedUser,
            question: question ?
                formatQuestion(question, users[question.author]) : null,
            // What is the peace of state in the store, this component cares about? --> tweets
            // What will show up as a property on this container
        }
    )
}

export default connect(mapStateToProps)(Question)


