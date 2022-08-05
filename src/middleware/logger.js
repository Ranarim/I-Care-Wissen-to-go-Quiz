const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log("The Action: ", action);
    const returnValue = next(action);
    console.groupEnd();
    return returnValue;
}

export default logger;