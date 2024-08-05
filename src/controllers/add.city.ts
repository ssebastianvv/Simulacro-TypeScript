// Este archivo maneja la funcionalidad de añadir o actualizar ciudades en un archivo JSON

import { ICity } from "../models/ICity"; // Importamos la interfaz ICity para tipar los datos de la ciudad
import { CitiesController } from "./cities.controller"; // Importamos el controlador CitiesController para manejar las operaciones CRUD de las ciudades

// Obtenemos referencias a los elementos del formulario
const form = document.querySelector("form") as HTMLFormElement;
const cityInput = document.querySelector("#new-city") as HTMLInputElement;
const countryInput = document.querySelector("#new-country") as HTMLInputElement;
const imageInput = document.querySelector("#new-img") as HTMLInputElement;
const cityDescriptionInput = document.querySelector("#newCity-description") as HTMLTextAreaElement;
const cityIdInput = document.querySelector("#city-id") as HTMLInputElement;

// Definimos las variables necesarias
const apiKey: string = 'f7e131a7be3ae8237187472400b7f855'; // API key para la API de OpenWeatherMap
const url: string = 'https://api.openweathermap.org/data/2.5/weather'; // URL base de la API de OpenWeatherMap
const citiesController = new CitiesController('http://localhost:3000/'); // Instanciamos el controlador de ciudades con la URL base del servidor local
const endPoint: string = 'cities/'; // Endpoint donde se envían las peticiones para agregar o actualizar ciudades

// Añadimos un listener para el evento de envío del formulario
form.addEventListener('submit', async (event: Event) => {
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    // Extraemos los valores de los campos del formulario
    const cityName = cityInput.value;
    const countryName = countryInput.value;
    const imagePlace = imageInput.value;
    const cityDesc = cityDescriptionInput.value;
    const cityId = cityIdInput.value; // Si se especifica un ID, se usará para actualizar la ciudad existente

    try {
        // Realizamos una solicitud GET a la API del clima para obtener la temperatura de la ciudad
        const response = await fetch(`${url}?q=${cityName}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`); // Manejo de errores si la respuesta no es exitosa
        }
        const data = await response.json(); // Convertimos la respuesta a JSON

        // Extraemos la temperatura de los datos obtenidos
        const temperature = data.main.temp;

        // Creamos un objeto ICity con los datos del formulario y la temperatura obtenida
        const cityData: ICity = {
            city: cityName,
            country: countryName,
            image: imagePlace,
            temperature: temperature,
            cityDescription: cityDesc
        };

        if (cityId) {
            // Si se ha proporcionado un ID, actualizamos la ciudad existente
            await citiesController.updateCities(cityId, endPoint, cityData);
            alert("Ciudad actualizada"); // Alerta de confirmación
        } else {
            // Si no hay ID, agregamos una nueva ciudad
            await citiesController.postCities(endPoint, cityData);
            alert("Ciudad agregada"); // Alerta de confirmación
        }

        // Reseteamos el formulario
        form.reset();

        // Redirigimos a la página de inicio para mostrar los cambios
        window.location.href = "home.html";
    } catch (error) {
        console.error("Error al agregar o actualizar la ciudad:", error); // Manejo de errores
    }
});
