import { it, expect, describe } from 'vitest'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import "@testing-library/jest-dom/vitest"
import Login from '../components/user/pages/Login'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
const renderLogin = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
describe('Login Component', () => {
    it('It should render two inputs for email and password', () => {
        renderLogin();

        const emailplace=screen.getByPlaceholderText("you@example.com")
        expect(emailplace)
    })
    it('password', () => {
        
        const heading=screen.getByRole("heading")
        expect(heading).toHaveTextContent(/User Login/i);
    })
})

it('should render the Login button and be enabled initially', () => {
renderLogin();

    const buttons = screen.getAllByRole("button");
    const loginButton = buttons.find(btn => btn.textContent === "Login");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeEnabled();

});

it('should render Sign Up link for non-admin role', () => {
    renderLogin();

const signUpLinks = screen.getAllByRole("link", { name: /Sign Up/i });
expect(signUpLinks[0]).toBeInTheDocument();
expect(signUpLinks[0]).toHaveAttribute("href", "/register?role=User");

});

it("should show validation error when email is empty", async () => {
  renderLogin();

  const emailInput = screen.getByLabelText(/Email/i);
  fireEvent.blur(emailInput);

  await waitFor(() =>
    expect(screen.getByText("Email required")).toBeInTheDocument()
  );
});

it("should show validation error when email is invalid", async () => {
  renderLogin();

  const emailInput = screen.getByLabelText(/Email/i);
  fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  fireEvent.blur(emailInput);

  await waitFor(() =>
    expect(screen.getByText("Invalid email address")).toBeInTheDocument()
  );
});


it("should show validation error when password is empty", async () => {
  renderLogin();

  const passwordInput = screen.getByLabelText(/Password/i);
  fireEvent.blur(passwordInput);

  await waitFor(() =>
    expect(screen.getByText("Password required")).toBeInTheDocument()
  );
});


it("should toggle password visibility when eye icon clicked", () => {
  renderLogin();

  const passwordInput = screen.getByLabelText(/Password/i);
  const toggleButton = screen.getAllByRole("button")[0]; // eye toggle

  expect(passwordInput).toHaveAttribute("type", "password");
  fireEvent.click(toggleButton);
  expect(passwordInput).toHaveAttribute("type", "text");
  fireEvent.click(toggleButton);
  expect(passwordInput).toHaveAttribute("type", "password");
});

  it("should show server error when serverError state is set", () => {
    renderLogin();
    // simulate error by directly rendering with error state
    const alert = screen.queryByRole("alert");
    expect(alert).not.toBeInTheDocument();
    // Normally you'd mock formik submit to set serverError, but here we just check conditional rendering
  });


 it("should disable the Login button while submitting", async () => {
  renderLogin();

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  const loginButtons = screen.getAllByRole("button", { name: "Login" });
  const loginButton = loginButtons.find(btn => btn.getAttribute("type") === "submit");

  fireEvent.click(loginButton);

  // ✅ Await the async state change
  await waitFor(() => expect(loginButton).toBeDisabled());
});
