// Importaciones de los módulos necesarios
import { ICity } from "../models/ICity"; // Importa la interfaz ICity desde el modelo
import { Card } from "./card"; // Importa la función Card desde el módulo 'card'
import { CitiesController } from "./cities.controller"; // Importa la clase CitiesController desde el módulo 'cities.controller'

// Selecciona el botón de cierre de sesión y asegúrate de que es un HTMLButtonElement
const logoutButton = document.querySelector("#logout-button") as HTMLButtonElement;

// Obtén el token de la sesión almacenada en sessionStorage
const session = sessionStorage.getItem('token');

// URL base para las peticiones a la API
const url = 'http://localhost:3000/';

// Selecciona el contenedor donde se mostrarán las tarjetas de ciudades
const cardSection = document.querySelector('#card-section') as HTMLElement;

// Función autoejecutable para verificar si el usuario está autenticado
(() => {
    // Si no hay un token en la sesión, el usuario no está autenticado
    if (!session) {
        alert('Debes iniciar sesión'); // Muestra un mensaje de alerta
        // Redirecciona al usuario a la página de inicio de sesión
        window.location.replace('../../index.html');
    }
})();

// Agrega un manejador de eventos al botón de cierre de sesión
logoutButton.addEventListener('click', () => {
    // Elimina el token de la sesión para cerrar sesión
    sessionStorage.removeItem('token');
    // Redirecciona al usuario a la página principal
    window.location.replace('/');
});

// Función asincrónica para mostrar las ciudades en la página
async function showCities() {
    try {
        // Crea una instancia de CitiesController con la URL base
        const citiesController = new CitiesController(url);
        // Obtén la lista de ciudades de la API
        const cities = await citiesController.getCities('cities');
        
        // Itera sobre cada ciudad obtenida
        cities.forEach((city: ICity) => {
            // Llama a la función Card para crear un elemento de tarjeta para cada ciudad
            const card = Card(city);
            // Verifica que la función Card devuelva un HTMLElement
            if (card instanceof HTMLElement) {
                // Añade la tarjeta al contenedor de tarjetas
                cardSection?.append(card);
            } else {
                // Si Card no devuelve un HTMLElement, muestra un mensaje de error en la consola
                console.error('La función Card no devolvió un HTMLElement');
            }
        });
    } catch (error) {
        // Maneja cualquier error que ocurra al obtener las ciudades
        console.error('Error al obtener las ciudades:', error);
    }
}

// Llama a la función showCities para cargar y mostrar las ciudades al cargar la página
showCities();
