// Importa la interfaz ICity desde el modelo, la cual define cómo debe ser un objeto de ciudad
import { ICity } from "../models/ICity";

// Define la clase CitiesController que maneja las operaciones CRUD para las ciudades
export class CitiesController {
    url: string; // Propiedad para almacenar la URL base de la API

    // Constructor que inicializa la URL base para las peticiones
    constructor(url: string) {
        this.url = url;
    }

    // Método para obtener las ciudades desde la API
    async getCities(endPoint: string): Promise<ICity[]> {
        // Realiza una petición GET a la API usando el endpoint proporcionado
        const response = await fetch(`${this.url}${endPoint}`);
        // Convierte la respuesta en formato JSON
        const data = await response.json();
        // Imprime el estado de la respuesta en la consola (código de estado HTTP)
        console.log(response.status);

        // Devuelve los datos obtenidos
        return data;
    }

    // Método para crear una nueva ciudad en la API
    async postCities(endPoint: string, dataCity: ICity) {
        // Realiza una petición POST a la API con los datos de la ciudad
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especifica que el contenido de la solicitud es JSON
            },
            body: JSON.stringify(dataCity) // Convierte el objeto dataCity en una cadena JSON
        });

        // Imprime el estado de la respuesta en la consola (código de estado HTTP)
        console.log(response.status);

        // Si el código de estado no es 201 (Creado), lanza un error
        if (response.status !== 201) {
            throw new Error(`No se puede publicar`);
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();
        // Devuelve los datos obtenidos
        return data;
    }

    // Método para eliminar una ciudad en la API
    async deleteCities(endPoint: string): Promise<ICity> {
        // Define los encabezados para la solicitud
        const headers: Record<string, string> = {
            "accept": "*/*", // Acepta cualquier tipo de respuesta
        };

        // Define las opciones para la solicitud DELETE
        const reqOptions: RequestInit = {
            method: "DELETE",
            headers: headers,
        };

        // Realiza una petición DELETE a la API usando el endpoint proporcionado
        const response: Response = await fetch(`${this.url}${endPoint}`, reqOptions);

        // Si la respuesta no es correcta, lanza un error
        if (!response.ok) {
            throw new Error(`Error al eliminar la ciudad: ${response.statusText}`);
        }

        // Convierte la respuesta en formato JSON
        const responseDelete: ICity = await response.json();
        // Devuelve los datos de la ciudad eliminada
        return responseDelete;
    }

    // Método para actualizar una ciudad en la API
    async updateCities(id: string, endPoint: string, dataCity: ICity): Promise<ICity> {
        // Define los encabezados para la solicitud
        const headers: Record<string, string> = {
            "accept": "*/*", // Acepta cualquier tipo de respuesta
            "Content-Type": "application/json", // Especifica que el contenido de la solicitud es JSON
        };

        // Define las opciones para la solicitud PATCH
        const reqOptions: RequestInit = {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(dataCity) // Convierte el objeto dataCity en una cadena JSON
        };

        // Realiza una petición PATCH a la API para actualizar la ciudad con el ID proporcionado
        const response: Response = await fetch(`${this.url}${endPoint}${id}`, reqOptions);
        // Imprime la respuesta en la consola (útil para depuración)
        console.log(response);

        // Si la respuesta no es correcta, lanza un error
        if (!response.ok) {
            throw new Error(`Error al actualizar la ciudad: ${response.statusText}`);
        }

        // Convierte la respuesta en formato JSON
        const updatedCity: ICity = await response.json();
        // Devuelve los datos de la ciudad actualizada
        return updatedCity;
    }
}
