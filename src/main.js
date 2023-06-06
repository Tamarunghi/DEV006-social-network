/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
// Importar las vistas
import { onAuthStateChanged } from 'firebase/auth';
import { home } from './pages/home.js';
import { createAccount } from './pages/createAccount.js';
import { signIn } from './pages/signIn.js';
import { wall } from './pages/wall.js';
import { auth } from './lib/firebase.js';

const root = document.getElementById('root');

const routes = {
  '/': home,
  '/createAccount': createAccount,
  '/signIn': signIn,
  '/wall': wall,
};

function navigateTo(pathname) {
  /* objeto que proporciona acceso y control sobre el historial de navegación del navegador */
  /* pushState (state, title, url) es un método del objeto history que permite modificar la URL del navegador sin recargar la página */
  window.history.pushState({}, pathname, window.location.origin + pathname); // Guarda el historial
  root.innerHTML = '';
  const view = routes[pathname];
  root.appendChild(view(navigateTo));
}

onAuthStateChanged(auth, (user) => {
  if (user) { // si hay usuario puede permanecer activo (permanece en wall)
    navigateTo('/wall');
  } else { // si no, lo mantiene o lleva a la página home (no se puede ir a wall)
    navigateTo('/');
  }
});

/* window.onpopstate se utiliza para manejar el evento de cambio en el historial de navegación del navegador */
window.onpopstate = () => {
  root.innerHTML = '';
  const path = window.location.pathname;
  const view = routes[path];
  root.appendChild(view(navigateTo));
};

// function reloadPage() {
//   const currentPath = window.location.pathname;
//   localStorage.setItem('currentPage', currentPath);
//   window.location.reload();
// }

// Obtener la página actual almacenada en localStorage
const currentPage = window.location.pathname;
console.log(currentPage);
if (currentPage && routes[currentPage]) {
  navigateTo(currentPage);
} else {
  navigateTo('/');
}
