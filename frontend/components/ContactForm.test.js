import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
    screen.debug();
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    const headerText = "Contact Form";
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(headerText);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const firstName = "J";
    userEvent.type(firstNameInput, firstName);

    const errorMessages = await screen.findAllByTestId("error");
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorMessages = await screen.findAllByTestId("error");
    expect(errorMessages).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const firstName = "James";
    userEvent.type(firstNameInput, firstName);

    const lastNameInput = screen.getByLabelText(/last name*/i);
    const lastName = "Ty";
    userEvent.type(lastNameInput, lastName);

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorMessages = await screen.findAllByTestId("error");
    expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email*/i);
    const email = "e";
    userEvent.type(emailInput, email);

    const emailErrorText = (/email must be a valid email addres/i);
    const emailResult = await screen.findByText(emailErrorText);
    expect(emailResult).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const lastNameErrorText = (/lastName is a required field/i);
    const lastNameResult = await screen.findByText(lastNameErrorText);
    expect(lastNameResult).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
