/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import {
  authDetector, userEmail, dislikeCounter, likeCounter, verifyLikes, deletePost, editpost, postPromise,
  addPost, postCol, signOut, getPost, timeStamp,
} from '../lib/functions';

export function wall() {
  // Crear elementos
  const container = document.createElement('div');
  const navegator = document.createElement('nav');
  const logoRefresh = document.createElement('img');
  const logOut = document.createElement('img');
  const divposts = document.createElement('div');
  const buttonCreatePost = document.createElement('button');
  const textarea = document.createElement('textarea');
  const writeAndPost = document.createElement('div');

  // Establecer atributos y contenido
  logoRefresh.setAttribute('src', '/images/logoEasygym.png');
  logoRefresh.setAttribute('onclick', 'location.reload()');
  logOut.setAttribute('src', '/images/logout.png');
  logOut.classList.add('logOut');
  container.id = 'container';
  divposts.id = 'posts';
  buttonCreatePost.classList.add('buttonCreatePost');
  buttonCreatePost.textContent = 'Post';
  textarea.classList.add('textArea');
  textarea.placeholder = 'write your tips today?';
  // textarea.setAttribute('rows', '4');
  writeAndPost.classList.add('writeAndPost');

  // Imagen LogOut
  logOut.addEventListener('click', () => {
    signOut();
  });

  // Logo refresh
  logoRefresh.classList.add('refresh');

  // Agregar elementos a nav
  navegator.appendChild(logoRefresh);
  navegator.appendChild(logOut);
  // Agregar elementos a divposts
  writeAndPost.appendChild(textarea);
  writeAndPost.appendChild(buttonCreatePost);

  // Agregar elementos al contenedor (div) especificado
  container.appendChild(navegator);
  container.appendChild(writeAndPost);
  container.appendChild(divposts);

  // CREATE POST
  const createPost = (poster, postId) => {
    // CREAR MODAL OPCIONES
    const modalOptions = document.createElement('dialog');
    modalOptions.classList.add('modalOptions');
    const modalImgEdit = document.createElement('img');
    modalImgEdit.setAttribute('src', '/images/edit.png');
    modalImgEdit.classList.add('modalImgEdit');
    const editLabel = document.createElement('label');
    editLabel.classList.add('editLabel');
    editLabel.textContent = ('Edit');
    const modalImgDel = document.createElement('img');
    modalImgDel.setAttribute('src', '/images/delete.png');
    modalImgDel.classList.add('modalImgDel');
    const deleteLabel = document.createElement('label');
    deleteLabel.classList.add('deleteLabel');
    deleteLabel.textContent = ('Delete');
    const xModal = document.createElement('img');
    xModal.setAttribute('src', '/images/closeModal.png');
    xModal.classList.add('xModal');
    const space = document.createElement('br');

    modalOptions.appendChild(modalImgEdit);
    modalOptions.appendChild(editLabel);
    modalOptions.appendChild(modalImgDel);
    modalOptions.appendChild(deleteLabel);
    deleteLabel.appendChild(space);
    modalOptions.appendChild(xModal);
    // CREAR MODAL EDIT
    const modalEdit = document.createElement('dialog');
    modalEdit.id = 'modalEdit';
    const txtaEdit = document.createElement('textarea');
    txtaEdit.classList.add('textArea');
    const btnCancel = document.createElement('button');
    btnCancel.textContent = 'Cancel';
    btnCancel.classList.add('button');
    btnCancel.id = 'btn-modal';
    const btnSave = document.createElement('button');
    btnSave.textContent = 'Save';
    btnSave.id = 'btn-modal';
    btnSave.classList.add('button');
    document.body.appendChild(modalEdit);

    modalEdit.appendChild(txtaEdit);
    modalEdit.appendChild(btnCancel);
    modalEdit.appendChild(btnSave);

    // CREAR MODAL ELIMINAR
    const modalDelete = document.createElement('dialog');
    modalDelete.id = 'modalDelete';
    const question = document.createElement('p');
    question.textContent = 'Do you want to delete this post?';
    question.classList.add('question');
    const btnYes = document.createElement('button');
    btnYes.textContent = 'Yes';
    btnYes.classList.add('button');
    btnYes.id = 'btn-modal';
    const btnNo = document.createElement('button');
    btnNo.textContent = 'No';
    btnNo.classList.add('button');
    btnNo.id = 'btn-modal';
    document.body.appendChild(modalDelete);

    modalDelete.appendChild(question);
    modalDelete.appendChild(btnYes);
    modalDelete.appendChild(btnNo);

    // crear que va a mostrar
    const post = document.createElement('div');
    const infoUser = document.createElement('div');
    const avatar = document.createElement('img');
    const publicDate = document.createElement('time');
    const userName = document.createElement('h5');
    const imagenPost = document.createElement('img');
    const descriptionAndLikes = document.createElement('p');
    const menuLikeSection = document.createElement('section');
    const likesAndCount = document.createElement('div');
    const menuOptions = document.createElement('img');
    const likesPic = document.createElement('img');
    const likesLab = document.createElement('label');

    // Establecer las propiedades de los elementos

    post.className = 'post';
    avatar.className = 'avatar';
    userName.className = 'userName';
    publicDate.className = 'publicDate';
    avatar.src = poster.avatar;

    const currentDate = poster.fecha.toDate(); // devuelve la fecha local
    const day = currentDate.getDate();// devuelve el día solamente
    const month = currentDate.getMonth() + 1; // Los meses comienzan desde 0
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    // const dateObject = timestamp.toDate(); // Convert to Date object
    // const dateString = dateObject.toISOString(); // Convert to string in ISO format

    publicDate.textContent = formattedDate;
    publicDate.type = poster.fecha;
    userName.textContent = poster.usuario;
    imagenPost.src = 'ruta/al/imagen2';
    descriptionAndLikes.textContent = poster.descripción;
    menuLikeSection.classList.add('menuLikeSection');
    menuOptions.classList.add('menuOptions');
    menuOptions.setAttribute('src', '/images/menuOptions.png');
    likesAndCount.classList.add('likesAndCount');
    likesPic.classList.add('likesPic');
    likesPic.setAttribute('src', '/images/Like.png');
    likesLab.classList.add('likesLab');
    likesLab.textContent = (poster.likes && poster.likes.length) || 0; // si primera parte es falsa entonces se opta por la segunda, es decir 0
    // likesLab.textContent = poster.likes?.length || 0; // ? si likes no existe q no falle al cargar los posts

    // Armar la estructura del nodo
    infoUser.id = 'infoUser';
    infoUser.appendChild(avatar);
    infoUser.appendChild(userName);
    infoUser.appendChild(publicDate);
    infoUser.appendChild(descriptionAndLikes);
    post.appendChild(infoUser);
    post.appendChild(menuLikeSection);
    menuLikeSection.appendChild(menuOptions);
    menuLikeSection.appendChild(likesAndCount);
    likesAndCount.appendChild(likesPic);
    likesAndCount.appendChild(likesLab);
    divposts.insertBefore(post, divposts.firstChild); // Utilizar insertBefore para insertar al principio
    document.body.appendChild(modalOptions);

    // Mostrar menuOptions para editar y eliminar cuando los post son propios
    if (userEmail() === poster.usuario) {
      menuOptions.style.visibility = 'visible';
    } else {
      menuOptions.style.visibility = 'hidden';
    }

    // Listener para mostrar el diálogo de opciones
    menuOptions.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalOptions.isConnected && !modalOptions.hasAttribute('open')) {
        modalOptions.showModal();
      }
    });

    // Listener para el cierre del diálogo de opciones
    xModal.addEventListener('click', () => {
      modalOptions.close();
    });

    // Listener para el cambio al diálogo de edición
    modalImgEdit.addEventListener('click', (e) => {
      e.preventDefault();
      modalOptions.close();
      if (modalEdit.isConnected && !modalEdit.hasAttribute('open')) {
        modalEdit.showModal();
      }
    });

    // Listener para el cierre del diálogo de edición
    btnCancel.addEventListener('click', () => {
      modalEdit.close();
    });

    // Listener para llamar pregunta de confirmación eliminar
    modalImgDel.addEventListener('click', (e) => {
      e.preventDefault();
      modalOptions.close();
      if (modalDelete.isConnected && !modalDelete.hasAttribute('open')) {
        modalDelete.showModal();
      }
    });

    btnNo.addEventListener('click', () => {
      modalDelete.close();
    });

    btnYes.addEventListener('click', async () => {
      await deletePost(postId);
      modalDelete.close();
      post.remove();
    });

    // Editar
    modalImgEdit.addEventListener('click', () => {
      txtaEdit.innerHTML = poster.descripción;
    });
    btnSave.addEventListener('click', async (e) => {
      e.preventDefault;
      const newContent = txtaEdit.value;
      try {
        const result = await editpost(postId, newContent);
        console.log(result);
        modalEdit.close();
      } catch (error) {
        console.log('Error al actualizar la descripción:', error);
      }
    });

    // Mostrar la imagen antes de hacer like
    const likesArray = poster.likes;
    if (likesArray != null && likesArray.includes(userEmail())) {
      likesPic.setAttribute('src', '/images/Likes.png');
    }
    // Al dar like hacer cambio de imagen y numero
    likesPic.addEventListener('click', async () => {
      const { userLiked, likesCount } = await verifyLikes(postId, userEmail()); // desestructuración

      // sin desestructuracion
      // const result = await verifyLikes(postId, userEmail());
      // const userLiked = result.userLiked;
      // const likesCount = result.likesCount;

      if (userLiked) {
        await dislikeCounter(postId);
        likesPic.setAttribute('src', '/images/Like.png');
      } else {
        await likeCounter(postId);
        likesPic.setAttribute('src', '/images/Likes.png');
      }
      //  obtén el recuento actualizado de "likes" y actualiza la interfaz de usuario
      const updatedLikes = await verifyLikes(postId, userEmail());
      likesLab.textContent = `${updatedLikes.likesCount}`;
    });

    // const user = auth.currentUser.uid; /* toma el id único del usuario autenticado actualmente */
    // const likesArray = docss.data().likeCounter;

    // if (!likesArray.includes(user)) {
    //   likeCounter(docss.id);
    //   likesPic.setAttribute('src', './images/Likes.png');
    // }
  };

  // Llamar a la función getPost para obtener los datos de los posts
  getPost((queryData) => {
    console.log('Current data: ', queryData);
    divposts.innerHTML = '';
    queryData.forEach((postPost) => {
      const postData = postPost.data();
      const postId = postPost.id;
      createPost(postData, postId);
    });
  });

  // Crea el post en Firebase, guarda en postData y le asigna un Id
  // postPromise.then((postList) => {
  //   postList.forEach((postPost) => {
  //     const postData = postPost.data();
  //     const postId = postPost.id;
  //     createPost(postData, postId);
  //   });
  // });
  console.log(authDetector);

  buttonCreatePost.addEventListener('click', async () => {
    const userDetector = await authDetector();// Obtener el email del usuario

    const data = {
      avatar: '/images/Avatar.png',
      descripción: textarea.value,
      fecha: timeStamp(),
      usuario: userDetector, // Asignar el email del usuario a "usuario"
      likes: [],

    };

    const result = await addPost(postCol, data);
    console.log(result);
    // Crear el nuevo post y agregarlo al principio
    createPost(data, result.id);
    textarea.value = ' ';
  });

  // DOMContentLoaded se dispara cuando se ha cargado
  //  completamente el árbol DOM de una página web por
  // lo q no sirve en este caso ya q se cambia lo q esta en root
  // window.addEventListener('DOMContentLoaded', async () => {
  //   const querySnapshot = await getPost();0'+''''''zz
  //   querySnapshot.forEach((doc) => {
  //     const postdata = doc.data();
  //     createPost(postdata);
  //   });
  // });
  return container;
}
