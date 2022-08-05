export function formatQuestion (question, author) {
    const {id, optionOne, optionTwo, timestamp, } = question;
    const {name,avatarURL } = author;
    return {
        name,
        id, 
        firstChoice: optionOne,
        secondChoice: optionTwo,
        firstChoiceVotes: optionOne,
        secondChoiceVotes: optionTwo,
        timestamp,
        avatar: avatarURL,
    }
}