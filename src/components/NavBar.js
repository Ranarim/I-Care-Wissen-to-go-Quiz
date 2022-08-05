import styles from "../stylesheets/navbar.module.css";
import {Link, useNavigate} from "react-router-dom";
import { connect } from "react-redux";
import {handleLogin} from "../actions/shared"

const NavBar = (props) => {
    const navigate = useNavigate();
    const logout = () => {
        props.dispatch(handleLogin(null));
        navigate("/");
      };
    const userName = props.users[props.authedUser].name
    const avatarURL = props.users[props.authedUser].avatarURL
    return (
        <ul className={styles.navbar}>
        <li><Link to="/">Startseite</Link></li>
        <li><Link to="/leaderboard">Tabelle</Link></li>
        <li><Link to="/add">Neu</Link></li>
        <li className={styles.navbar_left}>{userName}</li>
        <li className={styles.navbar_avatar}><img src={avatarURL} alt="" /></li>
        {props.authedUser !== 'Guest' ? (
        <li className={styles.login} onClick={logout}><Link to="/login">Abmelden</Link></li>
        ) : 
        <li className={styles.login} onClick={logout}><Link to="/login">Anmelden</Link></li>
    }
        </ul>
    )
}

const mapStateToProps = ({authedUser,users}) => {
return (
    {
        authedUser,
        users
    }
)
}

export default connect (mapStateToProps)(NavBar)


