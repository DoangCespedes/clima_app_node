const axios = require('axios')

class Busquedas {
    historial = ['Caracas', 'Colorado', 'Paris']

    constructor() {
        //TODO leer DB si existe
    }

    // get paramsMapbox() {
    //     return{
    //         'access_token': process.env.MAPBOX_KEY,
    //         'limit': 5, // Limitar a 5 resultados
    //         'language': 'es'
    //     }
    // }

    get paramsWeather() {
        return{
            'appid': process.env.OPENWEATHER_KEY,
            'units':'metric',
            'lang':'ES'
        }
    }


    async ciudad( lugar = ''){
    
        try {
            // peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(lugar)}.json`,
                params: {
                    'access_token': process.env.MAPBOX_KEY,
                    'limit': 5, // Limitar a 5 resultados
                    'language': 'es'
                }
            })

            const respuesta = await instance.get();

            // Verificar si hay resultados
            if (!respuesta.data.features || respuesta.data.features.length === 0) {
                console.log('No se encontraron lugares para:', lugar);
                return [];
            }

            return respuesta.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name, // Nombre completo del lugar
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

            
        } catch (error) {
            console.error('Error en la petición a Mapbox:', error.message);
            return [];
        }
    
    }

    async climaLugar(lat, lon){
        try{
            //instance axios.create()
            const instance = axios.create({
                
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon}
            })

            
            //resp.data
            const respuesta = await instance.get();
            const { weather , main } = respuesta.data;

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max:main.temp_max,
                temp: main.temp
            }
        }catch (error){
            console.log(err)
        }
    }
}

module.exports = Busquedas