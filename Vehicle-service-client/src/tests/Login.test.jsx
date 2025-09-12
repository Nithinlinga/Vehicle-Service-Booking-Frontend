import React from "react";
import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/vitest"
import Login from '../components/user/Login'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";

describe('Login Component', () => {
    it('It should render two inputs for email and password', () => {
        // expect(1).toBeTruthy();
        render(
            <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
            </Provider>
        );

        const emailplace=screen.getByPlaceholderText("you@example.com")
        expect(emailplace)
    })
    it('password', () => {
        
        const heading=screen.getByRole("heading")
        expect(heading).toHaveTextContent(/User Login/i);
    })
})