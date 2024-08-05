import { PageController } from './src/controllers/page.controller.ts'

const url = 'https://reqres.in/api/';

const loginForm = document.querySelector("#loginForm") as HTMLFormElement;
const emailUser = document.querySelector("#emailUser") as HTMLInputElement;
const passwordUser = document.querySelector("#passwordUser") as HTMLInputElement;

loginForm.addEventListener("submit", async (event : Event) => {
  event.preventDefault();

  const user = {
    email : emailUser.value,
    password : passwordUser.value
  }

 try{
  const pageControoller = new PageController(url);
  const token = await pageControoller.login(user, 'login');

  console.log(token);

  sessionStorage.setItem('token', token.token);

  const getToken = sessionStorage.getItem('token');

  if (getToken === token.token) {
    window.location.href = './src/views/home.html'
    alert('se inició sesión');
  }
 }
 catch (error) {
  alert(error);
 }

})
