import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from "../components/Dashboard";
import { screen } from "@testing-library/react";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'


const mockStore = configureStore([]);

describe('My Connected Question Component', () => {
    let mockedStore;
    beforeEach(() => {
        mockedStore = mockStore({
            questions: {
                "8xf0y6ziyjabvozdd253nd": {
                    id: '8xf0y6ziyjabvozdd253nd',
                    author: 'jmaier',
                    timestamp: 1467166872634,
                    optionOne: {
                        votes: ['sarahedo'],
                        text: 'Build our new application with Javascript',
                    },
                    optionTwo: {
                        votes: [],
                        text: 'Build our new application with Typescript'
                    }
                },
            },
            users: {
                sarahedo: {
                    id: 'sarahedo',
                    password: 'password123',
                    name: 'Sarah Edo',
                    avatarURL: null,
                    answers: {
                        "8xf0y6ziyjabvozdd253nd": 'optionOne',
                        "6ni6ok3ym7mf1p33lnez": 'optionOne',
                        "am8ehyc8byjqgar0jgpub9": 'optionTwo',
                        "loxhs1bqm25b708cmbf3g": 'optionTwo'
                    },
                    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
                },
            },
            authedUser: "sarahedo",
        });
    });

    test("should render with given state from Redux store", () => {
        render(
          <Provider store={mockedStore}>
            <Dashboard />
          </Provider>
        );
        
        const answered = screen.getAllByText(/answered polls/i);
        const unanswered = screen.getAllByText(/unanswered polls/i);
        expect(answered[0]).toBeInTheDocument();
        expect(unanswered[0]).toBeInTheDocument();
  });
});