const fs = require('fs')
const axios = require('axios')

class Busquedas {
    historial = []
    dbPath = './db/database.json'

    constructor() {
        //TODO leer DB si existe
        this.leerDB()
    }

    // get paramsMapbox() {
    //     return{
    //         'access_token': process.env.MAPBOX_KEY,
    //         'limit': 5, // Limitar a 5 resultados
    //         'language': 'es'
    //     }
    // }

    get historialCapitalizado(){
        return this.historial.map( lugar => {
            let palabras = lugar.split('')
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) )
            
            
            return palabras.join('')
        })
          

    }

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

    agregarHistorial( lugar = ""){
        if (this.historial.includes(lugar.toLocaleLowerCase() )) {
            return
        }

        this.historial = this.historial.splice(0,5)
        
        this.historial.unshift(lugar.toLocaleLowerCase())

        //guardar DB
        this.guardarDB()
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){

        if( !fs.existsSync(this.dbPath) ) return null;
        
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info );

        this.historial = data.historial
    
        return data;
    }
}

module.exports = Busquedas