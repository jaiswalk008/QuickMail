import {screen, render} from '@testing-library/react';
import Signup from './Signup';
import userEvent from '@testing-library/user-event';
describe('Signup', () => {
    test('renders the Signup button', () => {
    render(<Signup />);
    const signupButton = screen.getByRole('button')
    expect(signupButton).toBeInTheDocument();
  });

  test('renders name label', () =>{
    render(<Signup />);
    const nameLabel = screen.getByLabelText('Name');
    expect(nameLabel).toBeInTheDocument();
  })
  test('renders email label', () =>{
    render(<Signup />);
    const emailLabel = screen.getByLabelText('Email');
    expect(emailLabel).toBeInTheDocument();
  })
  test('renders password label', () =>{
    render(<Signup />);
    const passwordLabel = screen.getByLabelText('Password');
    expect(passwordLabel).toBeInTheDocument();
  })
  test('gets the value of input fields after user interactions', () => {
    // Render the Signup component
    render(<Signup />);

    userEvent.type(screen.getByLabelText('Name'), 'karan jaiswal');
    const nameValue = screen.getByLabelText('Name').value;
    userEvent.clear(screen.getByLabelText('Name'));    

    userEvent.type(screen.getByLabelText('Email'), 'jaiskaran008@gmail.com');
    const emailValue = screen.getByLabelText('Email').value;
    userEvent.clear(screen.getByLabelText('Email'));

    userEvent.type(screen.getByLabelText('Password'), 'password123');
    const passwordValue = screen.getByLabelText('Password').value;
    userEvent.clear(screen.getByLabelText('Password'));

    userEvent.type(screen.getByLabelText('Confirm Password'), 'password123')
    const confirmPasswordValue = screen.getByLabelText('Confirm Password').value;
    userEvent.clear(screen.getByLabelText('Confirm Password'));
    
    expect(nameValue).toBe('karan jaiswal');
    expect(emailValue).toBe('jaiskaran008@gmail.com');
    expect(passwordValue).toBe('password123');
    expect(confirmPasswordValue).toBe('password123');
    expect(passwordValue).toBe(confirmPasswordValue);
  });
})