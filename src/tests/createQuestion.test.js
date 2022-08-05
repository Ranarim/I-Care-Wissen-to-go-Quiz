import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen,fireEvent } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import CreateQuestion from "../components/CreateQuestion";
import { Provider } from "react-redux";
import store from "../store";



describe("createQuestion Component", () => {
    test ("check if button is disabled, when input of both options are empty", () => {
        render(
            <Router>
                 <Provider store={store}>
                    <CreateQuestion />
                </Provider>
            </Router>
           
        );

        const button = screen.getByTestId('button-element')
        //Expecting the button to be disabled when input is null
        expect(button).toHaveAttribute("disabled")
        
        fireEvent.change(screen.getByTestId(/one/i), {target: {value: 'a'}})
        fireEvent.change(screen.getByTestId(/two/i), {target: {value: 'a'}})

        //Expecting the button not to be disabled when input is true

        expect(button).not.toHaveAttribute("disabled") 
    })
})

describe("Snapshot Test CreateElement", () => {
    it("will match snapshot", () => {
        const view = render (
            <Router>
            <Provider store={store}>
               <CreateQuestion />
           </Provider>
       </Router>
        )
        expect(view).toMatchSnapshot()
    })
})



