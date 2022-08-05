import { connect } from "react-redux";
import {handleAddQuestion} from "../actions/questions"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import styles from '../stylesheets/createquestion.module.css';



const CreateQuestion = (props) => {
    
    const navigate = useNavigate();
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [disabled,setDisabled] = useState(true)

    useEffect(() => {
        optionA.length > 0 && optionB.length > 0 ? setDisabled(false) : setDisabled(true)
    },[optionA,optionB])

    const handleCreatePoll = () => {
        const {dispatch} = props;
        dispatch(handleAddQuestion({
            optionOneText: optionA,
            optionTwoText:  optionB,
            author: props.authedUser
        }))
        navigate("/");

    }

    return (
        <div className={styles.createQuestion}>
        <h2>Erstelle neue Fragen aus der I Care Buchreihe von Thieme</h2>
        <p>... zu den Themenbereichen Anatomie/Physiologie, Krankheitslehre und Pflege</p>
        <form>
            <p>Erste Antwortmöglichkeit</p>
			<textarea data-testid="input-field-one" type="OptionOne" placeholder="Erste Option" onChange={(e) => setOptionA(e.target.value)}></textarea>
			<br></br>
            <p>Zweite Antwortmöglichkeit</p>
			<textarea data-testid="input-field-two" type="OptionTwo" placeholder="Zweite Option" onChange={(e) => setOptionB(e.target.value)} ></textarea>
			</form>
            <br />
            <button  data-testid="button-element" onClick={handleCreatePoll} disabled={disabled}>Erstelle eine neue Frage</button>
        </div>
    )
}

const mapStateToProps = ({authedUser,users, questions}) => {
    return ({
        authedUser,
        users,
        questions,
    })
}
export default connect(mapStateToProps)(CreateQuestion)


