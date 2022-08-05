import React from 'react';
import { Provider } from 'react-redux';
import Navbar from "../components/NavBar";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';

const mockStore = configureStore([])

describe("Navbar", () => {
  let mockedStore;
  beforeEach(() => {
      mockedStore = mockStore({
          users: {
              sarahedo: {
                  id: 'sarahedo',
                  password: 'password123',
                  name: 'Sarah Edo',
                  avatarURL: "https://www.vhv.rs/dpng/d/426-4264903_user-avatar-png-picture-avatar-profile-dummy-transparent.png",
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
  
  
  test("should render all links correctly", async () => {
      render(
        <MemoryRouter>
            <Provider store={mockedStore}>
            <Navbar />
            </Provider>
         </MemoryRouter>
      );
  
      const logout = screen.getByText(/logout/i);
      const home = screen.getByText(/home/i);
      const leaderboard = screen.getByText(/leaderboard/i);
  
      expect(logout).toBeInTheDocument();
      expect(home).toBeInTheDocument();
      expect(leaderboard).toBeInTheDocument();
    });
  });