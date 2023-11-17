// eslint-disable-next-line import/extensions
import getTodos from './getTodos.js';
// eslint-disable-next-line import/extensions
import view from './view.js';

const state = {
  todos: getTodos(),
  curerntFilter: 'All',
};

const main = document.querySelector('.todoapp');

window.requestAnimationFrame(() => {
  const newMain = view(main, state);
  main.replaceWith(newMain);
});
