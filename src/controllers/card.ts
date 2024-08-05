// Importa la interfaz ICity desde el modelo, que define cómo debe ser un objeto de ciudad
import { ICity } from '../models/ICity';
// Importa la clase CitiesController para manejar operaciones CRUD sobre las ciudades
import { CitiesController } from './cities.controller';

// Define una función que crea un elemento de tarjeta (card) para mostrar información de una ciudad
export const Card = (props: ICity): HTMLElement => {
    // Desestructura las propiedades del objeto `props` que representa una ciudad
    let { id, city, country, image, cityDescription, temperature } = props;
    
    // Crea un contenedor principal para la tarjeta
    const cardContainer = document.createElement("article") as HTMLElement;
    cardContainer.className = "card-container"; // Asigna una clase CSS al contenedor

    // Crea un elemento de imagen para mostrar la foto de la ciudad
    const img = document.createElement("img") as HTMLImageElement;
    img.className = "img-card"; // Asigna una clase CSS a la imagen

    // Crea un contenedor para la información de la tarjeta
    const infoContainer = document.createElement("div") as HTMLElement;
    infoContainer.className = "cardInfo-container"; // Asigna una clase CSS al contenedor de información

    // Crea y configura elementos de texto para la tarjeta
    const cardTitle = document.createElement("h3") as HTMLHeadElement;
    cardTitle.className = "card-title"; // Asigna una clase CSS al título de la tarjeta
    const cardCountry = document.createElement("p") as HTMLParagraphElement;
    const cardDescription = document.createElement("p") as HTMLParagraphElement;
    const cardTemperature = document.createElement("p") as HTMLParagraphElement;

    // Asigna los valores de las propiedades a los elementos correspondientes
    img.src = image; // Establece la fuente de la imagen
    cardTitle.innerText = city; // Asigna el nombre de la ciudad al título
    cardCountry.innerText = country; // Asigna el país al párrafo
    cardDescription.innerText = cityDescription; // Asigna la descripción de la ciudad al párrafo
    cardTemperature.innerText = `${temperature} k`; // Asigna la temperatura al párrafo

    // Crea un contenedor para el botón de eliminar (con un ícono de cruz)
    const crossContainer = document.createElement("span");
    crossContainer.className = "cross-container"; // Asigna una clase CSS al contenedor de la cruz
    crossContainer.innerHTML = `<i product-id="${id}" class="bi bi-x-circle-fill"></i>`; // Asigna un ícono de cruz usando Bootstrap Icons

    // Crea un botón para actualizar la información de la ciudad
    const updateButton = document.createElement("button");
    updateButton.innerText = "Actualizar"; // Establece el texto del botón
    updateButton.className = "update-button"; // Asigna una clase CSS al botón de actualización

    // Añade un evento de clic al botón de actualización
    updateButton.addEventListener("click", () => {
        // Actualiza los valores del formulario con la información de la ciudad
        (document.querySelector("#new-city") as HTMLInputElement).value = city;
        (document.querySelector("#new-country") as HTMLInputElement).value = country;
        (document.querySelector("#new-img") as HTMLInputElement).value = image;
        (document.querySelector("#newCity-description") as HTMLTextAreaElement).value = cityDescription;
        
        // Almacena el ID de la ciudad en un campo oculto para futuras actualizaciones
        const cityIdInput = document.querySelector("#city-id") as HTMLInputElement;
        if (cityIdInput) {
            cityIdInput.value = String(id); // Convierte el id a string
        }
    });

    // Añade un evento de clic al contenedor de la cruz para eliminar la ciudad
    crossContainer.addEventListener("click", async () => {
        // Solicita confirmación al usuario antes de eliminar
        const eliminar = confirm('¿Deseas eliminar?');
        if (eliminar) {
            try {
                // Crea una instancia de CitiesController con la URL base de la API
                const citiesController = new CitiesController('http://localhost:3000/');
                // Llama al método deleteCities para eliminar la ciudad usando su ID
                await citiesController.deleteCities(`cities/${id}`);
                // Elimina el contenedor de la tarjeta del DOM si la eliminación es exitosa
                cardContainer.remove();
            } catch (error) {
                // Maneja cualquier error que ocurra durante la eliminación
                console.error("Error al eliminar la ciudad:", error);
            }
        }
    });

    // Añade los elementos creados al contenedor de información
    infoContainer.append(cardTitle, cardCountry, cardDescription, cardTemperature, updateButton);
    // Añade la imagen, el contenedor de información y el contenedor de la cruz al contenedor principal de la tarjeta
    cardContainer.append(img, infoContainer, crossContainer);

    // Devuelve el contenedor principal de la tarjeta para que pueda ser añadido al DOM
    return cardContainer;
};
