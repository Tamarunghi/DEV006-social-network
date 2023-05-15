/* eslint-disable no-alert */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase.js';

export function createAccount(navigateTo) {
  // Crear elementos
  const container = document.createElement('div');
  const header = document.createElement('header');
  const logo = document.createElement('img');
  const form = document.createElement('form');
  const nameLabel = document.createElement('label');
  const nameInput = document.createElement('input');
  const emailLabel = document.createElement('label');
  const emailInput = document.createElement('input');
  const passwordLabel = document.createElement('label');
  const passwordInput = document.createElement('input');
  const questionAccount = document.createElement('p');
  const linkSignIn = document.createElement('a');
  const createButton = document.createElement('button');
  const continueWithGoogleButton = document.createElement('button');

  // Establecer atributos y contenido
  container.classList.add('container');
  logo.setAttribute('src', './images/logoNameEasygym.png');
  nameLabel.textContent = 'Name';
  nameInput.classList.add('insertInfo');
  nameInput.setAttribute('placeholder', 'My name');
  emailLabel.textContent = 'Email';
  emailInput.classList.add('insertInfo');
  emailInput.setAttribute('placeholder', 'example@gmail.com');
  passwordLabel.textContent = 'Password';
  passwordInput.classList.add('insertInfo');
  emailInput.setAttribute('type', 'email');
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('placeholder', 'Mypassword');
  questionAccount.textContent = 'Already have an account?';
  linkSignIn.setAttribute('href', '#');
  linkSignIn.textContent = 'Sign In';
  createButton.classList.add('button');
  createButton.textContent = 'Create account';
  continueWithGoogleButton.classList.add('button');
  continueWithGoogleButton.textContent = 'Continue with Google';

  // Agregar elementos al header
  header.appendChild(logo);

  // Agregar elementos al formulario
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(emailLabel);
  form.appendChild(emailInput);
  form.appendChild(passwordLabel);
  form.appendChild(passwordInput);
  form.appendChild(createButton);
  form.appendChild(continueWithGoogleButton);
  form.appendChild(questionAccount);
  form.appendChild(linkSignIn);

  // Agregar elementos al contenedor (div) especificado
  container.appendChild(header);
  container.appendChild(form);

  // Add event listeners
  linkSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/signIn');
  });

  linkSignIn.addEventListener('click', () => {
    navigateTo('/signIn');
  });

  createButton.addEventListener('click', async (e) => {
    e.preventDefault();
    // const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    console.log(email, password);
    // promesa de la funcion, bloque try.. catch debe ir acompañado de async(funcion asyncrona)
    // await espera que la funcion cumpla con los parametros para ver un resultado o error
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredentials);
    } catch (error) {
      console.log(error.message);
      console.log(error.code);

      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use');
      } else if (error.code === 'auth/missing-email') {
        alert('Introduce your email');
      } else if (error.code === 'auth/weak-password') {
        alert('Your password must have a minimum of 6 characters ');
      } else if (error.code === 'auth/missing-password') {
        alert('Introduce your password');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email');
      } else if (error.code) {
        alert('Something went wrong');
      }
    }
  });
  continueWithGoogleButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  });
  return container;
}