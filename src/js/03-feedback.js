import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const LOCALSTORAGE_KEY = 'feedback-form-state';

const saveFormStateToLocalStorage = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formState));
}, 500);
form.addEventListener('input', saveFormStateToLocalStorage);

const formStateFromLocalStorage = JSON.parse(
  localStorage.getItem(LOCALSTORAGE_KEY)
);
if (formStateFromLocalStorage) {
  emailInput.value = formStateFromLocalStorage.email;
  messageInput.value = formStateFromLocalStorage.message;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formState);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  event.target.reset();
});
