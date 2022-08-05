import thunk from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";

//As its a default export i dont need to call the exact name
export default applyMiddleware(thunk, logger);
